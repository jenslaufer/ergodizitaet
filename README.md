# Neun Bilder, zwei Tage, 1.000 Kronen

Ein spielbarer Nachbau eines Entscheidungsexperiments aus der Forschung.
Du startest mit 1.000 Kronen, lernst in einer passiven Phase, was neun Bilder
mit deinem Vermögen machen, und wählst danach zwischen Wetten, deren Ausgang
verborgen bleibt. Am Ende steht deine eigene Auswertung.

**Spoiler-Warnung: der Rest dieser Datei verrät, worum es geht.** Wer die Seite
selbst spielen will, spielt zuerst und liest danach.

## Live

<https://jenslaufer.com/neun-bilder/>

## Warum die Seite nichts verrät

Titel, Adresse und Einstieg nennen weder das Experiment noch die Theorie
dahinter. Wer das Papier kennt, entscheidet sonst nach dem, was er gelesen hat,
statt nach dem, was er im Spiel erlebt — und misst damit nichts mehr. Die
Auflösung samt Quellenangabe erscheint erst in der Auswertung, nach dem
zweiten Tag.

Das ist auch näher am Original: die 18 Teilnehmer erfuhren nie, dass sich die
beiden Tage unterscheiden.

## Das Experiment

Grundlage ist das Kopenhagen-Experiment von 2017 am DRCMR: 18 Teilnehmer
spielten an zwei Tagen um echtes Geld, einmal unter additiver und einmal unter
multiplikativer Vermögensdynamik. Dieselbe Wette, anderes Verhalten.

> Meder, Rabe, Morville, Madsen, Koudahl, Dolan, Siebner, Hulme:
> „Ergodicity-breaking reveals time optimal decision making in humans",
> PLOS Computational Biology 17(9), 2021.
> <https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1009217>

Die neun Wachstumsraten stehen nicht im Fließtext des Papiers, sondern in
seinen Rohdaten. Wie sie gelesen wurden, steht in `protokoll.md`.

## Aufbau

Eine einzige Datei, `index.html`. Vue 3 und Tailwind kommen über CDN, es gibt
keinen Build-Schritt. Alle Simulationen laufen im Browser; nichts wird
gesendet, nichts gespeichert.

Lokal ansehen: `python3 -m http.server` im Repo-Verzeichnis, dann
<http://localhost:8000>.
