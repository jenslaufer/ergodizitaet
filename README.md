# Das Kopenhagen-Experiment — Ergodizität

Eine interaktive Seite zu der Frage, warum der Erwartungswert nicht das ist,
was ein einzelner Mensch erlebt.

Grundlage ist das Kopenhagen-Experiment von 2019: 18 Teilnehmer spielten an
zwei Tagen um echtes Geld, einmal unter additiver und einmal unter
multiplikativer Vermögensdynamik. Dieselbe Wette, anderes Verhalten.

> Meder, Rabe, Morville, Madsen, Koudahl, Dolan, Siebner, Hulme:
> „Ergodicity-breaking reveals time optimal decision making in humans",
> PLOS Computational Biology 17(9), 2021.
> <https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1009217>

## Aufbau

Eine einzige Datei, `index.html`. Vue 3 und Tailwind kommen über CDN, es gibt
keinen Build-Schritt. Alle Simulationen laufen im Browser; nichts wird
gesendet, nichts gespeichert.

Lokal ansehen: `python3 -m http.server` im Repo-Verzeichnis, dann
<http://localhost:8000>.

## Live

<https://jenslaufer.github.io/ergodizitaet/>
