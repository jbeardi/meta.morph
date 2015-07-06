# Framework

Hurra. Wir haben ein Framework :) .

Um das Framework zu benutzen, müssen die Dateien aus
dem files\_dev.properties in den Build-Prozess eingebunden werden.
Dabei aber berücksichtigen, das vorher noch entweder Ender oder
jQuery geladen sein muss bevor die Framework Klassen inkludiert
werden.

Was liefert das Framework mit?

* Device-Detection
* Key-Listener für die unterschiedlichen Devices
* ...und natürlich Video-Player
* Eine Utils-Klasse für Krams
* Logger
* Werbe-Komponente mit Vast-Parser und Tracking

# Benutzung

Um das Framework benutzen zu können, muss es per Bower als Abhängigkeit
im bower.json angelegt werden. Dann im Build-Script müssen noch 
die Files aus files.properties hinzugefügt werden und dann sollte
alles funktionieren. Am besten mal das Bild-Projekt ansehen und dort
abschauen :).

# Build Prozess

Um das Framwork nach einer Änderung neu zu erstellen, wird für den 
"build"-Prozess [grunt](http://gruntjs.com/getting-started) verwendet.

Ist nodejs/npm und grunt installiert, lässt sich das Framework mit dem
Befehl "grunt" auf der Kommandozeile einfach erstellen. Damit die verwendeten
npm Pakete lokal verfügbar sind, muss zunächst noch npm install im Verzeichnis
des Frameweorks aufgerufen werden. Will man Grunt direkt aus Eclipse/Aptana 
heraus starten, kann dafür eine externe Tool-Konfiguration angelegt werden. [hier](http://paultavares.wordpress.com/2014/01/06/setup-an-eclipse-run-external-tool-configuration-for-grunt/)

Im Hauptverzeichnis befinden sich hierfür die Grunt typischen package.json
und Gruntfile.js Dateien. Um die Dateireihenfolge beim "concat" vorzugeben,
ist eine zusätzliche Datei concat.json vorhanden. Nach erfolgreichem
Durchlauf des "build"-Prozesses finden sich im Hauptverzeichnis die fertigen
framework.js und framework.min.js Dateien.

# Entwickeln

Damit man auch lokal entwickeln kann, sollte man `bower link` benutzen. Damit
linkt man gegen eine lokal ausgecheckte Version und nicht gegen die Version
im Git-Repo. [Hier](https://oncletom.io/2013/live-development-bower-component/) nachlesen.

# Logging

Es gibt die möglichkeit, die Logausgabe auf einen anderen Rechner umzuleiten. Hierzu
muss das Remote Logging aktiviert werden mit :

   Logger.setupRemote("http://123.256.123.256:8080", "get", "debug");

Ab diesem Zeitpunkt wird jede Logausgabe die mindestens den angegebenen
Loglevel hat, an die URL weitergeleitet. Ein kleiner Server um diese
Daten zu verarbeiten findet sich [hier](https://metamorph.codebasehq.com/projects/metamorph/repositories/logserver).

# Testing

Dieses Framework nutzt Buster.js um einige Komponenten zu testen. Eine 
Einleitung in Buster.js findest du [hier](http://docs.busterjs.org/en/latest/overview/).

in short:

    # start buster server (-g installs buster globally)
    npm install -g buster
    # start buster server and open the provided URL from the console output in a browser
    buster-server


    # open another console and run the tests
    buster-test

Um beim Entwickeln immer automatisch die Tests laufen zu lassen:

    # Gems installieren
    bundle install
    # Guard laufen lassen. 
    bundle exec guard
