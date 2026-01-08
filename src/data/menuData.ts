export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  tag?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  icon: string;
  items: MenuItem[];
}

export const menuData: MenuCategory[] = [
  {
    id: 'pizze',
    name: 'Pizze',
    icon: '🍕',
    items: [
      {
        id: 'margherita',
        name: 'Margherita',
        description: 'Pomodoro, mozzarella, basilico fresco',
        price: 7.00,
      },
      {
        id: 'diavola',
        name: 'Diavola',
        description: 'Pomodoro, mozzarella, salame piccante',
        price: 9.00,
        tag: '🔥 Piccante'
      },
      {
        id: 'quattro-formaggi',
        name: 'Quattro Formaggi',
        description: 'Mozzarella, gorgonzola, fontina, parmigiano',
        price: 10.00,
      },
      {
        id: 'capricciosa',
        name: 'Capricciosa',
        description: 'Pomodoro, mozzarella, prosciutto cotto, funghi, olive, carciofi',
        price: 11.00,
      },
      {
        id: 'bufala',
        name: 'Bufala & Pomodorini',
        description: 'Mozzarella di bufala DOP, pomodorini freschi, basilico',
        price: 12.00,
        tag: '⭐ Top'
      },
      {
        id: 'slam-dunk',
        name: 'Slam Dunk',
        description: 'Nduja, burrata, cipolla caramellata - la nostra speciale!',
        price: 13.00,
        tag: '🏀 Speciale'
      },
    ],
  },
  {
    id: 'cocktails',
    name: 'Cocktails',
    icon: '🍹',
    items: [
      {
        id: 'spritz',
        name: 'Aperol Spritz',
        description: 'Aperol, prosecco, soda, arancia',
        price: 6.00,
      },
      {
        id: 'negroni',
        name: 'Negroni',
        description: 'Gin, Campari, vermouth rosso',
        price: 8.00,
      },
      {
        id: 'moscow-mule',
        name: 'Moscow Mule',
        description: 'Vodka, ginger beer, lime fresco',
        price: 8.00,
      },
      {
        id: 'three-pointer',
        name: 'Three Pointer',
        description: 'Rum, passion fruit, lime, zucchero di canna - il nostro signature!',
        price: 9.00,
        tag: '🏀 Signature'
      },
      {
        id: 'mojito',
        name: 'Mojito',
        description: 'Rum bianco, lime, menta fresca, zucchero',
        price: 8.00,
      },
    ],
  },
  {
    id: 'aperitivo',
    name: 'Aperitivo',
    icon: '🥂',
    items: [
      {
        id: 'tagliere-misto',
        name: 'Tagliere Misto',
        description: 'Selezione di salumi e formaggi con miele e mostarda',
        price: 14.00,
      },
      {
        id: 'bruschette',
        name: 'Bruschette Mix (4pz)',
        description: 'Pomodoro, nduja, lardo, funghi',
        price: 8.00,
      },
      {
        id: 'olive-chips',
        name: 'Olive & Chips',
        description: 'Olive taggiasche e patatine croccanti',
        price: 5.00,
      },
      {
        id: 'fritto-misto',
        name: 'Fritto Playground',
        description: 'Olive ascolane, supplì, crocchette',
        price: 10.00,
        tag: '⭐ Best Seller'
      },
    ],
  },
  {
    id: 'bevande',
    name: 'Bevande',
    icon: '🥤',
    items: [
      {
        id: 'birra-media',
        name: 'Birra alla Spina (0.4L)',
        description: 'Lager classica',
        price: 5.00,
      },
      {
        id: 'birra-artigianale',
        name: 'Birra Artigianale',
        description: 'Selezione rotante - chiedi al banco',
        price: 6.00,
      },
      {
        id: 'vino-calice',
        name: 'Vino al Calice',
        description: 'Rosso o bianco della casa',
        price: 4.00,
      },
      {
        id: 'soft-drink',
        name: 'Soft Drinks',
        description: 'Coca-Cola, Fanta, Sprite, Acqua Tonica',
        price: 3.00,
      },
      {
        id: 'acqua',
        name: 'Acqua (0.5L)',
        description: 'Naturale o frizzante',
        price: 2.00,
      },
    ],
  },
];
