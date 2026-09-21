import { test, expect } from '@playwright/test';

// Jens, 2026-09-21 08:11: "die bilder nicht fest zugeordnet". Three defects made
// that true at once, and all three are invisible to the leak suite. These tests
// drive the page a player drives and read only what a player can see.

const zahl = t => Number(String(t).replace(/[^\d.-]/g, ''));

const vermoegen = async page => {
  const n = page.locator('section .num.text-3xl');
  return await n.count() ? zahl(await n.innerText()) : null;
};

// The frame of every picture is stroked #d6d3d1 - the colour that identifies a
// picture is the one on its shapes.
const farbe = svg => (svg.match(/stroke="(#[0-9a-f]{6})"/gi) || [])
  .map(m => m.slice(8, 15).toLowerCase())
  .find(c => c !== '#d6d3d1');

async function passivDurchgehen(page) {
  const schritte = [];
  for (let i = 0; i < 400; i++) {
    const next = page.getByRole('button', { name: 'Next image' });
    if (await next.count() === 0) break;
    const vorher = await vermoegen(page);
    await next.click();
    const nachher = await vermoegen(page);
    const bild = page.locator('section div.h-32');
    schritte.push({
      vorher, nachher,
      svg: await bild.count() ? (await bild.innerHTML()).replace(/\s+/g, ' ') : null,
    });
  }
  return schritte.filter(s => s.svg && s.nachher !== null);
}

const proBild = schritte => {
  const m = new Map();
  for (const s of schritte) {
    const k = farbe(s.svg);
    if (!m.has(k)) m.set(k, []);
    m.get(k).push({ faktor: s.nachher / s.vorher, betrag: s.nachher - s.vorher });
  }
  return m;
};

test.describe('one picture, one meaning', () => {
  test('every image keeps one effect over all its sightings', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Start day 1' }).click();
    const gruppen = proBild(await passivDurchgehen(page));

    expect(gruppen.size, 'distinct images in the passive phase').toBe(9);
    for (const [bild, sichtungen] of gruppen) {
      // The wealth on screen is rounded to the cent, so a reconstructed factor
      // carries that rounding - compared with tolerance, the amount exactly.
      const f = sichtungen.map(s => s.faktor);
      const faktorKonstant = Math.max(...f) - Math.min(...f) < 1e-3;
      const betraege = new Set(sichtungen.map(s => s.betrag.toFixed(2)));
      const faktoren = new Set(faktorKonstant ? ['one'] : f.map(x => x.toFixed(4)));
      // Exactly one of the two is the invariant - which one is the experiment.
      expect(faktoren.size === 1 || betraege.size === 1,
        `${bild} moved the wealth by ${[...betraege].join('/')} kr and by factor ${[...faktoren].join('/')}`).toBe(true);
    }
  });

  test('both numbers are on screen, so the invariant is findable', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Start day 1' }).click();
    await page.getByRole('button', { name: 'Next image' }).click();
    const zeile = await page.locator('section .num.text-sm').first().innerText();
    expect(zeile, 'the krone change').toMatch(/-?[\d,]+\.\d\d kr/);
    expect(zeile, 'the percent change').toMatch(/-?[\d,]+\.\d ?%/);
  });
});

test.describe('the promised protocol is the protocol that runs', () => {
  test('the passive phase is as long as the intro says', async ({ page }) => {
    await page.goto('/');
    const intro = await page.locator('section').innerText();
    const m = intro.match(/Every image is shown (\d+) times, ([\d,]+) trials in total/);
    expect(m, 'the intro states the protocol').not.toBeNull();
    const [, proBild_, gesamt] = m;

    await page.getByRole('button', { name: 'Start day 1' }).click();
    const kopf = await page.locator('section p.uppercase').innerText();
    expect(kopf, 'the counter in the passive phase').toContain(`/${zahl(gesamt)}`);

    const gruppen = proBild(await passivDurchgehen(page));
    for (const [bild, sichtungen] of gruppen) {
      expect(sichtungen.length, `${bild} sightings`).toBe(Number(proBild_));
    }
  });
});

test.describe('day 2 brings new images', () => {
  test('no colour of day 1 comes back on day 2', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Start day 1' }).click();
    const tag1 = [...proBild(await passivDurchgehen(page)).keys()];

    const weiter = page.getByRole('button', { name: 'Start choosing' });
    if (await weiter.count()) await weiter.click();
    for (;;) {
      const g = page.getByRole('button', { name: /^Gamble / });
      if (await g.count() === 0) break;
      await g.first().click();
    }
    await page.getByRole('button', { name: 'Start day 2' }).click();
    const tag2 = [...proBild(await passivDurchgehen(page)).keys()];

    expect(tag1.length).toBe(9);
    expect(tag2.length).toBe(9);
    expect(tag2.filter(c => tag1.includes(c)),
      'a colour learned on day 1 stands for something else on day 2').toEqual([]);
  });
});
