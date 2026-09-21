import { test } from 'node:test';
import assert from 'node:assert/strict';
import { tagStimuli, signatur, FAKTOREN, INKREMENTE, muster, FARBEN } from '../src/stimuli.js';

// The identity a player has to learn is the picture. Two pictures that share
// colour and shape family are one picture as far as learning is concerned -
// and if they stand for different values, what was learned is now wrong.
const fingerabdruck = s => {
  const g = signatur(s.bild);
  return `${g.farbe}|${g.art}|${g.anzahl}`;
};
const familie = s => {
  const g = signatur(s.bild);
  return `${g.farbe}|${g.art}|${g.strichbreite}`;
};

const inOrdnung = [0, 1, 2, 3, 4, 5, 6, 7, 8];

test('the nine pictures of one day are pairwise distinguishable', () => {
  for (const tag of [0, 1]) {
    const s = tagStimuli(tag, 'mult', inOrdnung);
    assert.equal(new Set(s.map(fingerabdruck)).size, 9, `day ${tag + 1}`);
  }
});

test('no picture of day 2 wears a colour from day 1', () => {
  const d1 = tagStimuli(0, 'mult', inOrdnung).map(s => signatur(s.bild).farbe);
  const d2 = tagStimuli(1, 'add', inOrdnung).map(s => signatur(s.bild).farbe);
  const geteilt = d2.filter(c => d1.includes(c));
  assert.deepEqual(geteilt, [],
    'a colour learned on day 1 comes back on day 2 standing for something else');
});

test('no picture of day 2 repeats a day-1 colour and shape family', () => {
  const d1 = tagStimuli(0, 'mult', inOrdnung).map(familie);
  const d2 = tagStimuli(1, 'add', inOrdnung).map(familie);
  const geteilt = d2.filter(f => d1.includes(f));
  assert.deepEqual(geteilt, [], 'day 2 recycles the look of day 1');
});

test('all 18 pictures across both days are distinct', () => {
  const alle = [...tagStimuli(0, 'mult', inOrdnung), ...tagStimuli(1, 'add', inOrdnung)];
  assert.equal(new Set(alle.map(fingerabdruck)).size, 18);
});

test('a picture is a pure function of its index', () => {
  assert.equal(muster(5, FARBEN[0]), muster(5, FARBEN[0]));
});

test('the values keep their rank: 0..3 lose, 4 is neutral, 5..8 gain', () => {
  for (const [dyn, werte, neutral] of [['mult', FAKTOREN, 1], ['add', INKREMENTE, 0]]) {
    const s = tagStimuli(0, dyn, inOrdnung);
    assert.deepEqual(s.map(x => x.wert), werte, dyn);
    assert.equal(s[4].wert, neutral, dyn);
    for (let i = 1; i < 9; i++) assert.ok(s[i].wert > s[i - 1].wert, `${dyn} rank ${i}`);
  }
});
