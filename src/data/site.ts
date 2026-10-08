// Alle Inhalte der Webseite an einem Ort.
// Alles mit „PLATZHALTER“ muss noch durch echte Angaben ersetzt werden.

export const studio = {
  name: 'Kosmetik im Gutshaus',
  owner: 'Barbara Schäfer',
  slogan: 'Wohlfühlstunden für Körper und Sinne',
  brand: 'BABOR',
  street: 'Hofstraße 2',
  zip: '63589',
  city: 'Linsengericht-Altenhaßlau',
  phone: '06051 617555',
  phoneHref: 'tel:+496051617555',
  email: '', // z. B. 'info@kosmetik-im-gutshaus.de' – leer lassen, wenn es keine gibt
  hours: 'Termine nach Vereinbarung',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Kosmetik+im+Gutshaus+Hofstra%C3%9Fe+2+63589+Linsengericht',
};

export type Treatment = { name: string; description?: string; duration?: string; price?: string };
export type Category = { title: string; accent: string; intro: string; items: Treatment[] };

// Behandlungen laut Angebots-Flyer. Preise, Dauer und Beschreibungen können pro Behandlung
// ergänzt werden, z. B. { name: 'Maniküre', duration: '45 Min.', price: '35 €' }.
const list = (...names: string[]): Treatment[] => names.map((name) => ({ name }));

export const categories: Category[] = [
  {
    title: 'Gesichtsbehandlungen',
    accent: 'Genießen',
    intro: 'Pflege, die sich nach Ihrer Haut richtet.',
    items: list(
      'Basisbehandlung',
      'Reinigungsbehandlung',
      'Wohlfühlbehandlung',
      'Exklusivbehandlung',
      'Anti-Age-Behandlung',
      'Herrenbehandlung',
      'Hot-Stone-Gesichtsbehandlung',
      'Ultraschall',
    ),
  },
  {
    title: 'Augen & Hände',
    accent: 'Verwöhnen',
    intro: 'Die kleinen Details, die viel ausmachen.',
    items: list(
      'Augenbrauenkorrektur',
      'Brauenfärben',
      'Wimpernfärben',
      'Maniküre',
      'Handpackung',
      'Handmassage',
    ),
  },
  {
    title: 'Pflege & Packungen',
    accent: 'Wellness',
    intro: 'Intensive Pflege für Haut und Körper.',
    items: list('Algenmodellage', 'Vliesmasken', 'Dekolleté-Pflege', 'Enthaarungen'),
  },
  {
    title: 'Massagen',
    accent: 'Relaxen',
    intro: 'Energie tanken – in der Ruhe des Gutshauses.',
    items: list(
      'Entspannungsmassage',
      'Ayurvedische Rückenmassage',
      'Ayurvedische Hot-Stone-Rückenmassage',
    ),
  },
];

export const extraNote = 'Außerdem: wechselnde Trendbehandlungen – fragen Sie gerne nach.';
