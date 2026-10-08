// Alle Inhalte der Webseite an einem Ort.
// Alles mit „PLATZHALTER“ muss noch durch echte Angaben ersetzt werden.

export const studio = {
  name: 'Kosmetik im Gutshaus',
  owner: 'PLATZHALTER Vorname Nachname',
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

export type Treatment = { name: string; description: string; duration?: string; price: string };
export type Category = { title: string; intro: string; items: Treatment[] };

// PLATZHALTER: Behandlungen und Preise sind Beispiele und müssen angepasst werden.
export const categories: Category[] = [
  {
    title: 'Gesicht',
    intro: 'Pflege, die sich nach Ihrer Haut richtet – nicht nach einem Schema.',
    items: [
      {
        name: 'Klassische Gesichtsbehandlung',
        description: 'Reinigung, Peeling, Ausreinigung, Maske und Massage.',
        duration: '75 Min.',
        price: 'ab 00 €',
      },
      {
        name: 'Feuchtigkeitsbehandlung',
        description: 'Intensive Pflege für trockene und müde Haut.',
        duration: '60 Min.',
        price: 'ab 00 €',
      },
      {
        name: 'Augenbrauen & Wimpern färben',
        description: 'Formen und Färben für einen klaren, natürlichen Blick.',
        duration: '30 Min.',
        price: 'ab 00 €',
      },
    ],
  },
  {
    title: 'Hände & Füße',
    intro: 'Gepflegte Hände und Füße – mit Ruhe und Sorgfalt.',
    items: [
      {
        name: 'Maniküre',
        description: 'Nagelform, Nagelhautpflege und Handmassage.',
        duration: '45 Min.',
        price: 'ab 00 €',
      },
      {
        name: 'Kosmetische Fußpflege',
        description: 'Fußbad, Nagelpflege, Hornhautentfernung und Pflege.',
        duration: '60 Min.',
        price: 'ab 00 €',
      },
    ],
  },
  {
    title: 'Körper & Wohlbefinden',
    intro: 'Zeit für sich – in der Stille des Gutshauses.',
    items: [
      {
        name: 'Entspannungsmassage',
        description: 'Rücken, Nacken und Schultern.',
        duration: '30 Min.',
        price: 'ab 00 €',
      },
      {
        name: 'Haarentfernung mit Warmwachs',
        description: 'Schonend und langanhaltend.',
        price: 'ab 00 €',
      },
    ],
  },
];
