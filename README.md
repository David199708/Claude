# Kosmetik im Gutshaus – Webseite

Webseite für das Kosmetikstudio „Kosmetik im Gutshaus“ in Linsengericht-Altenhaßlau.
Gebaut mit [Astro](https://astro.build), ohne Cookies, Tracking oder externe Schriften.

## Inhalte ändern

Fast alle Texte stehen in **`src/data/site.ts`**: Name, Adresse, Telefon, Behandlungen und Preise.
Alles mit `PLATZHALTER` muss noch ersetzt werden:

- `src/data/site.ts`: Name der Inhaberin, E-Mail, Behandlungen und Preise
- `src/pages/index.astro`: Text im Abschnitt „Über mich“, Foto
- `src/pages/impressum.astro` und `src/pages/datenschutz.astro`: Rechtstexte prüfen

## Lokal starten

```sh
npm install
npm run dev      # Vorschau unter http://localhost:4321
npm run build    # fertige Seite im Ordner dist/
```

## Veröffentlichen

Repo bei Netlify oder Vercel verbinden: Build-Befehl `npm run build`, Ausgabeordner `dist`.
