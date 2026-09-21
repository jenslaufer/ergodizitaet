# Protokoll des Originals

Meder D, Rabe F, Morville T, Madsen KH, Koudahl MT, Dolan RJ, Siebner HR, Hulme OJ (2021),
*Ergodicity-breaking reveals time optimal decision making in humans*, PLoS Comput Biol 17(9): e1009217.
Daten und Code: https://github.com/ollie-hulme/ergodicity-breaking-choice-experiment

## Aufbau

- 18 ausgewertete Teilnehmer (20 erhoben, 1 eingeschlafen, 1 hat die Aufgabe nicht verstanden).
- Zwei Testtage, Reihenfolge der Dynamiken über die Gruppe ausbalanciert. Je ~3 Stunden im MRT (DRCMR, Siemens Prisma).
- Startvermögen **1.000 DKK** an jedem Tag. Auszahlung je Tag auf 0–2.000 DKK begrenzt, Gesamtspanne 0–4.000 DKK.
- Die Teilnehmer erfuhren nicht, dass sich die Tage unterscheiden. Anleitung, Ablauf und Aufbau waren identisch.

## Passive Phase (je Tag)

- 9 von 18 Fraktalbildern werden dem Tag zufällig zugelost, je Person neu.
- Jedes Bild hat eine feste Wirkung auf das Vermögen. Jedes Bild wird **37-mal** gezeigt → **333 Durchgänge**.
- Die Reihenfolge wird verworfen, wenn das Vermögen den Korridor (0 kr, 5.000 kr) verlässt.
- Weil jedes Bild gleich oft vorkommt, steht das Vermögen nach 333 Durchgängen wieder exakt bei 1.000 kr.
  Danach folgt **ein weiterer Reiz**, damit alle mit einem zufälligen Stand in die aktive Phase gehen.
- Taste binnen 1 s drücken (Zeitmarke für den Scanner), sonst „press button earlier".

## Die neun Reize — aus den Rohdaten gelesen

| k | additiv (kr) | multiplikativ (Faktor) |
|---|---|---|
| −4 | −428 | 0,4467 |
| −3 | −321 | 0,5464 |
| −2 | −214 | 0,6683 |
| −1 | −107 | 0,8175 |
| 0 | 0 | 1,0000 |
| +1 | +107 | 1,2232 |
| +2 | +214 | 1,4962 |
| +3 | +321 | 1,8302 |
| +4 | +428 | 2,2387 |

Additiv linear mit Schritt 107, multiplikativ geometrisch mit Verhältnis **1,2232** (= gleiche Abstände auf der Log-Skala).
Nachgerechnet aus `data/TxtFiles_additive/1_2.txt` und `data/TxtFiles_multiplicative/1_2.txt`:
die multiplikative Datei speichert den Faktor mal 100 (44,67 … 223,87), die additive den Betrag direkt.

## Aktive Phase (je Tag)

- **312 Entscheidungen**: 288 gemischte Durchgänge (144 eindeutige Wahlen, jede zweimal) + **24 No-Brainer**.
- Jede Wette besteht aus zwei Bildern, je 50 %. Entschieden wird zwischen zwei Wetten (nie Wette gegen Nichts —
  das schaltet eine Vorliebe fürs Wetten als Störgröße aus).
- Einschränkung des Wettraums: **beide Wetten gemischt** (ein Gewinn, ein Verlust), **alle vier Bilder verschieden**.
  16 gemischte Wetten × 9 passende Gegenwetten = 144.
- No-Brainer: beide Wetten teilen ein Bild, das zweite unterscheidet sich. Wer hier unter 50 % liegt, hat die
  Bilder nicht gelernt (Teilnehmer 5, ausgeschlossen).
- **Die Ausgänge bleiben verborgen** — kein Konditionieren, kein mentales Mitrechnen.
- Am Tagesende werden **10 der gewählten Wetten** ausgelost und der Reihe nach angewendet.

## Ergebnis

- Isoelastischer Nutzen, ein Parameter η. Zeitoptimal: **η = 0 additiv, η = 1 multiplikativ**.
- Gemessen (MAP, über die Gruppe): **η = 0,1506 additiv**, **η = 1,1534 multiplikativ**.
- Verschiebung MΔ = **1,001** (SD 0,345, SE 0,081, BCI95 % [0,829, 1,172]), BF10 = 2,9 × 10⁷.
- Jeder einzelne der 18 lag näher am zeitoptimalen Punkt (0|1) als an der dynamik-invarianten Diagonale.
