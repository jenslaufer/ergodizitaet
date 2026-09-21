// The nine image stimuli of a day, and the growth rates behind them.
//
// Read out of the raw data of the original repository, not estimated from the
// prose of the paper: multiplicative is geometric with ratio 1.2232 around 1,
// additive is linear with step 107 around 0. Nine levels each, ordered from
// worst to best - index 0..3 lose, 4 is neutral, 5..8 gain.
export const R = 1.2232;
export const FAKTOREN = [-4, -3, -2, -1, 0, 1, 2, 3, 4].map(k => Math.pow(R, k));
export const INKREMENTE = [-4, -3, -2, -1, 0, 1, 2, 3, 4].map(k => k * 107);

// Eighteen colours, nine per day and none shared: the original used eighteen
// fixed fractals for the same reason. A colour learned on day 1 must never come
// back on day 2 standing for something else.
export const FARBEN = [
  '#0f766e', '#b45309', '#7c3aed', '#be123c', '#1d4ed8',
  '#4d7c0f', '#a21caf', '#0369a1', '#78350f',
  '#065f46', '#ea580c', '#4338ca', '#9d174d', '#0891b2',
  '#65a30d', '#7e22ce', '#b91c1c', '#334155',
];

export function mische(a) {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Deterministic from the index: same index, same picture, always.
export function muster(i, farbe) {
  const s = 100, c = farbe;
  const teile = [];
  // Shape family and element count together are a bijection onto 0..17, so no
  // two of the eighteen pictures share both - colour alone does not have to
  // carry the whole identity.
  const art = i % 3;
  const n = 2 + Math.floor(i / 3);
  const breite = 2 + (i % 2);
  for (let k = 0; k < n; k++) {
    const r = 12 + k * (34 / n) + art * 4;
    if (art === 0) teile.push(`<circle cx="50" cy="50" r="${r}" fill="none" stroke="${c}" stroke-width="${breite}"/>`);
    else if (art === 1) teile.push(`<rect x="${50 - r}" y="${50 - r}" width="${2 * r}" height="${2 * r}" fill="none" stroke="${c}" stroke-width="${breite}" transform="rotate(${i * 11 + k * 15} 50 50)"/>`);
    else teile.push(`<polygon points="${50},${50 - r} ${50 + r},${50 + r} ${50 - r},${50 + r}" fill="none" stroke="${c}" stroke-width="${breite}" transform="rotate(${i * 23 + k * 30} 50 50)"/>`);
  }
  return `<svg viewBox="0 0 ${s} ${s}" class="h-full w-full"><rect width="${s}" height="${s}" rx="6" fill="#fafaf9" stroke="#d6d3d1"/>${teile.join('')}</svg>`;
}

// The nine stimuli of one day: value i keeps its rank, only the picture is drawn.
export function tagStimuli(tag, dynamik, idx = mische([0, 1, 2, 3, 4, 5, 6, 7, 8])) {
  const werte = dynamik === 'mult' ? FAKTOREN : INKREMENTE;
  return werte.map((w, i) => ({
    wert: w,
    bild: muster(idx[i] + tag * 9, FARBEN[idx[i] + tag * 9]),
  }));
}

// What a player can tell two pictures apart by: colour, shape family, count.
export function signatur(svg) {
  const formen = svg.match(/<(circle|rect x|polygon)/g) || [];
  return {
    farbe: svg.match(/stroke="(#[0-9a-f]{6})" stroke-width/i)?.[1]
        ?? svg.match(/stroke="(#[0-9a-f]{6})"/gi)?.slice(-1)[0].slice(8, 15),
    art: svg.includes('<circle') ? 'circle' : svg.includes('<rect x') ? 'rect' : 'polygon',
    anzahl: formen.length,
    strichbreite: svg.match(/stroke-width="([\d.]+)"/)?.[1],
  };
}
