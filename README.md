# Nine Images, Two Days, 1,000 Kroner

A playable rebuild of a decision experiment from the research literature. You start with
1,000 kroner, learn in a passive phase what nine images do to your wealth, and then
choose between gambles whose outcomes stay hidden. At the end you get your own estimate.

**Spoiler warning: the rest of this file gives away what it is about.** If you want to
play the page yourself, play first and read afterwards.

## Live

<https://jenslaufer.com/nine-images/>

## Why the page gives nothing away

The title, the address and the opening name neither the experiment nor the theory behind
it. Someone who knows the paper decides by what they have read instead of what they
experience in the game — and then the page measures nothing. The reveal, together with
the citation, appears only in the results, after the second day.

This is also closer to the original: the 18 participants were never told that the two
days differ.

## The experiment

The basis is the Copenhagen experiment of 2017 at the DRCMR: 18 participants played for
real money on two days, once under additive and once under multiplicative wealth
dynamics. Same gamble, different behaviour.

> Meder, Rabe, Morville, Madsen, Koudahl, Dolan, Siebner, Hulme:
> "Ergodicity-breaking reveals time optimal decision making in humans",
> PLOS Computational Biology 17(9), 2021.
> <https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1009217>

The nine growth rates are not in the prose of the paper, only in its raw data. How they
were read is documented in `protokoll.md`.

## Build

A single file, `index.html`. Vue 3 and Tailwind come from a CDN, there is no build step.
All simulation runs in the browser; nothing is sent anywhere, nothing is stored.

Run locally: `python3 -m http.server` in the repo directory, then
<http://localhost:8000>.

## Tests

```
npm test        # unit: the stimulus generator in src/stimuli.js
npm run test:e2e  # end to end: the page as it is shipped
```
