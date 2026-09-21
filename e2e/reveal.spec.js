import { test, expect } from '@playwright/test';

// Words that would tell a player what is being measured. If any of these appear
// before the results screen, the page biases its own experiment - which is the
// defect this page was rebuilt to remove (Jens, 2026-09-21 07:49).
//
// Compared case-insensitively, and that is not cosmetic: the kicker above the
// headline is rendered uppercase by Tailwind, and innerText returns it uppercase.
// A case-sensitive check reads ERGODICITY as clean - measured 2026-09-21 by
// injecting exactly that word into the kicker and watching all six tests stay
// green. The old page had KOPENHAGEN 2017 in that very line.
const REVEALING = [
  'ergodic', 'copenhagen', 'drcmr', 'hulme', 'meder', 'plos',
  'additive', 'multiplicative', 'eta', 'risk aversion', 'utility',
];

function assertClean(text, where) {
  const haystack = String(text).toLowerCase();
  for (const word of REVEALING) {
    expect(haystack, `"${word}" ${where}`).not.toContain(word);
  }
}

async function playOneDay(page) {
  await page.getByRole('button', { name: 'Run through the rest' }).click();
  for (;;) {
    const gambles = page.getByRole('button', { name: /^Gamble / });
    if (await gambles.count() === 0) break;
    await gambles.first().click();
  }
}

const visibleText = page => page.locator('body').innerText();

test.describe('nothing is revealed before the results', () => {
  test('the entry screen names neither the experiment nor the theory', async ({ page }) => {
    await page.goto('/');
    assertClean(await visibleText(page), 'on the entry screen');
  });

  test('title and meta description stay neutral', async ({ page }) => {
    await page.goto('/');
    assertClean(await page.title(), 'in the title');
    assertClean(await page.locator('meta[name="description"]').getAttribute('content'),
      'in the meta description');
  });

  test('the screen between the two days does not name the dynamic', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Start day 1' }).click();
    await playOneDay(page);
    await expect(page.getByRole('button', { name: 'Start day 2' })).toBeVisible();
    assertClean(await page.locator('section').innerText(), 'on the day-end screen');
  });

  test('the source appears only in the footer of the results', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('footer')).not.toContainText('Meder');
    await page.getByRole('button', { name: 'Start day 1' }).click();
    await playOneDay(page);
    await page.getByRole('button', { name: 'Start day 2' }).click();
    await playOneDay(page);
    await page.getByRole('button', { name: 'See the results' }).click();
    await expect(page.locator('footer')).toContainText('PLoS Comput Biol 17(9): e1009217');
    await expect(page.locator('footer')).toContainText('Ergodicity-breaking');
  });
});

test.describe('the run itself', () => {
  test('two days end in a full results screen, no errors, no NaN', async ({ page }) => {
    const errors = [];
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', e => errors.push(String(e)));

    await page.goto('/');
    await page.getByRole('button', { name: 'Start day 1' }).click();
    await playOneDay(page);
    await page.getByRole('button', { name: 'Start day 2' }).click();
    await playOneDay(page);
    await page.getByRole('button', { name: 'See the results' }).click();

    const text = await visibleText(page);
    expect(text).toContain('The reveal');
    expect(text).toContain('Your risk aversion');
    expect(text, 'a NaN on the results screen').not.toContain('NaN');
    expect(errors, 'console errors').toEqual([]);
  });

  test('the page is English throughout, including the numbers', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Start day 1' }).click();
    await playOneDay(page);
    const text = await page.locator('section').innerText();
    expect(text, 'German characters in the rendered text').not.toMatch(/[äöüßÄÖÜ]/);
    // en-US grouping: 1,000.00 - not the German 1.000,00, which an English
    // reader parses as one thousandth of the amount.
    expect(text).toMatch(/1,000(\.\d\d)? kr/);
  });
});
