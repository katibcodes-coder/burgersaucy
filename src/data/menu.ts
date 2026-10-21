/* Burger Saucy — menu data.
   Item names & prices transcribed straight from the printed menu card.
   Each item carries its own photo (pexels id, cropped/served per item). */

const px = (id: number, w = 800, h = 560, ext: "jpeg" | "png" = "jpeg") =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.${ext}?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

export interface SizePrice {
  label: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  img: string;
  sizes: SizePrice[];
  badge?: string;
  blurb?: string;
}

export interface Group {
  title: string;
  color: "red" | "green";
  items: MenuItem[];
}

export interface Tab {
  id: string;
  label: string;
  groups: Group[];
}

export interface Deal {
  id: string;
  no: number;
  items: string[];
  price: number;
  img: string;
}

const p = (label: string, price: number): SizePrice => ({ label, price });

const SMLM = (s: number, m: number, l: number, f: number) => [
  p("SMALL", s),
  p("MEDIUM", m),
  p("LARGE", l),
  p("FULL", f),
];

export const TABS: Tab[] = [
  {
    id: "pizza",
    label: "Pizza's",
    groups: [
      {
        title: "Signature",
        color: "red",
        items: [
          {
            id: "estreme-double-layer",
            name: "Estreme Double Layer",
            img: px(6151203),
            sizes: [p("MEDIUM", 1650), p("LARGE", 2400), p("FULL", 3200)],
            badge: "BESTSELLER",
            blurb: "Two layers of dough, twice the cheese load.",
          },
          {
            id: "turkish-pizza",
            name: "Turkish Pizza",
            img: px(20115308),
            sizes: [p("MEDIUM", 1550), p("LARGE", 2100), p("FULL", 2700)],
            blurb: "Crisp base, loaded Turkish-style toppings.",
          },
          {
            id: "kabab-crust",
            name: "Kabab Crust",
            img: px(3761663),
            sizes: [p("MEDIUM", 1550), p("LARGE", 2100), p("FULL", 2700)],
            blurb: "Every bite starts with grilled kabab crust.",
          },
          {
            id: "crown-crust",
            name: "Crown Crust",
            img: px(27927338),
            sizes: [p("MEDIUM", 1650), p("LARGE", 2400), p("FULL", 3200)],
            badge: "CHEESY",
            blurb: "Stuffed crown crust — cheese around the whole edge.",
          },
          {
            id: "kabab-pizza",
            name: "Kabab Pizza",
            img: px(18832949),
            sizes: SMLM(800, 1500, 2000, 2600),
          },
          {
            id: "cheese-stuffer",
            name: "Cheese Stuffer",
            img: px(8444550),
            sizes: [p("MEDIUM", 1550), p("LARGE", 2100), p("FULL", 2700)],
            blurb: "Molten cheese stuffed deep inside the crust.",
          },
        ],
      },
      {
        title: "Special",
        color: "green",
        items: [
          {
            id: "malai-boti",
            name: "Malai Boti Pizza",
            img: px(7813578),
            sizes: SMLM(750, 1350, 1900, 2500),
            badge: "LAHORI",
            blurb: "Creamy malai boti chunks, Lahore's favourite.",
          },
          {
            id: "saucy-special",
            name: "Saucy Special",
            img: px(40135554),
            sizes: SMLM(750, 1350, 1900, 2500),
            badge: "NEW",
            blurb: "Drowned in our house saucy drizzle.",
          },
          {
            id: "lazania-pizza",
            name: "Lazania Pizza",
            img: px(1460873),
            sizes: [p("MEDIUM", 1650), p("LARGE", 2400), p("FULL", 3200)],
            blurb: "Baked lazania layers on a pizza base.",
          },
          {
            id: "chicken-tikka-creamy",
            name: "Chicken Tikka Creamy",
            img: px(12261064),
            sizes: SMLM(750, 1300, 1800, 2400),
            blurb: "Smoky tikka pieces in a creamy cheese pull.",
          },
          {
            id: "chicken-chilli-pizza",
            name: "Chicken Chilli Pizza",
            img: px(8444547),
            sizes: SMLM(750, 1350, 1900, 2500),
            badge: "SPICY",
            blurb: "Fire-tossed chillies with juicy chicken.",
          },
        ],
      },
      {
        title: "Regular",
        color: "red",
        items: [
          {
            id: "chicken-tikka",
            name: "Chicken Tikka Pizza",
            img: px(20115306),
            sizes: SMLM(690, 1200, 1700, 2350),
          },
          {
            id: "chicken-fajita",
            name: "Chicken Fajita",
            img: px(40135551),
            sizes: SMLM(690, 1200, 1700, 2350),
            blurb: "Fajita peppers, onions and charred chicken.",
          },
          {
            id: "chicken-supreme",
            name: "Chicken Supreme",
            img: px(6493572),
            sizes: SMLM(690, 1200, 1700, 2350),
          },
          {
            id: "mughlai-pizza",
            name: "Mughlai Pizza",
            img: px(31262975),
            sizes: SMLM(750, 1350, 1850, 2450),
            blurb: "Fragrant Mughlai masala, olives & egg.",
          },
          {
            id: "desi-chaska",
            name: "Desi Chaska",
            img: px(15387928),
            sizes: SMLM(690, 1200, 1700, 2350),
            blurb: "The full desi chaska, straight off the tawa.",
          },
        ],
      },
    ],
  },
  {
    id: "burger",
    label: "Burgers",
    groups: [
      {
        title: "Signature Burgers",
        color: "red",
        items: [
          {
            id: "wehshi-burger",
            name: "Wehshi Burger",
            img: px(11354487),
            sizes: [p("PRICE", 590)],
            badge: "BESTSELLER",
            blurb: "Crisp fried fillet, cold mayo, fresh lettuce.",
          },
          {
            id: "molten-lava",
            name: "Molten Lava",
            img: px(27049616),
            sizes: [p("PRICE", 700)],
            badge: "NEW",
            blurb: "Molten cheese core that runs when you cut.",
          },
          {
            id: "injacted-fish-burger",
            name: "Injacted Fish Burger",
            img: px(17300434),
            sizes: [p("PRICE", 750)],
            blurb: "Double fish fillets, injected with flavour.",
          },
          {
            id: "king-zinger",
            name: "King Zinger",
            img: px(38036571),
            sizes: [p("PRICE", 399)],
            blurb: "The classic zinger, crowned with sesame.",
          },
          {
            id: "grill-burger",
            name: "Grill Burger",
            img: px(5122952),
            sizes: [p("PRICE", 590)],
            blurb: "Char-grilled fillet with smoky sauce.",
          },
          {
            id: "tower-zinger",
            name: "Tower Zinger",
            img: px(5948790),
            sizes: [p("PRICE", 690)],
            badge: "TALL",
            blurb: "A tower of crispy fillet and melted cheese.",
          },
          {
            id: "pizza-burger",
            name: "Pizza Burger",
            img: px(12419179),
            sizes: [p("PRICE", 590)],
            blurb: "Pizza toppings, burger format. Yes, really.",
          },
          {
            id: "max-patty",
            name: "Max Patty",
            img: px(12325274),
            sizes: [p("PRICE", 390)],
            blurb: "Double patty, double cheese, zero compromise.",
          },
          {
            id: "hot-spicy",
            name: "Hot Spicy",
            img: px(2874990),
            sizes: [p("PRICE", 390)],
            badge: "SPICY",
            blurb: "Fiery sauce, extra crunch — handle with care.",
          },
        ],
      },
    ],
  },
  {
    id: "sides",
    label: "Sides & Snacks",
    groups: [
      {
        title: "Crunchy Wings & Broast",
        color: "green",
        items: [
          {
            id: "salsa-wing",
            name: "Salsa Wing",
            img: px(4061475),
            sizes: [p("10 PCS", 690)],
            blurb: "10 crispy wings tossed in smoky salsa.",
          },
          {
            id: "oven-baked-wing",
            name: "Oven Baked Wing",
            img: px(5191835),
            sizes: [p("10 PCS", 690)],
          },
          {
            id: "crispy-wing",
            name: "Crispy Wing",
            img: px(4061488),
            sizes: [p("10 PCS", 690)],
            badge: "CRUNCHY",
          },
          {
            id: "injacted-broast",
            name: "Injected Broast",
            img: px(36879217),
            sizes: [p("2 PIECE", 600), p("4 PIECE", 1200), p("8 PIECE", 2400)],
            badge: "NEW ARRIVAL",
            blurb: "Box comes with bun, fries + dip.",
          },
        ],
      },
      {
        title: "Fries & Loaded",
        color: "red",
        items: [
          {
            id: "loaded-fries",
            name: "Loaded Fries",
            img: px(20535802),
            sizes: [p("PRICE", 650)],
            blurb: "Crispy fillet + grill fries, loaded with sauce.",
          },
          {
            id: "fries",
            name: "Fries",
            img: px(13796735),
            sizes: [p("MEDIUM", 200), p("LARGE", 320)],
          },
          {
            id: "macroni-crispy-pasta",
            name: "Macroni Crispy Pasta",
            img: px(5724557),
            sizes: [p("PRICE", 550)],
            blurb: "Baked tray of crispy cheesy macroni.",
          },
          {
            id: "chicken-fries",
            name: "Chicken Fries",
            img: px(29150162),
            sizes: [p("PRICE", 590)],
          },
          {
            id: "chicken-cheese-sticks",
            name: "Chicken Cheese Sticks",
            img: px(37279725),
            sizes: [p("PRICE", 550)],
          },
        ],
      },
      {
        title: "Sandwiches & Wraps",
        color: "green",
        items: [
          {
            id: "saucy-sandwich",
            name: "Saucy Sandwich",
            img: px(8478395),
            sizes: [p("PRICE", 600)],
          },
          {
            id: "grill-sandwich",
            name: "Grill Sandwich",
            img: px(37417625),
            sizes: [p("PRICE", 590)],
          },
          {
            id: "special-pizza-parahtah",
            name: "Special Pizza Parahtah",
            img: px(35760004),
            sizes: [p("PRICE", 590)],
            blurb: "Pizza loaded inside a flaky parahtah.",
          },
          {
            id: "tikka-parahtah-pizza",
            name: "Tikka Parahtah Pizza",
            img: px(14067665),
            sizes: [p("PRICE", 590)],
          },
          {
            id: "malai-boti-wrap",
            name: "Malai Boti Wrap",
            img: px(37324429),
            sizes: [p("PRICE", 600)],
          },
          {
            id: "tortilla-wrap",
            name: "Tortilla Wrap",
            img: px(37324431),
            sizes: [p("PRICE", 590)],
          },
          {
            id: "grill-wrap",
            name: "Grill Wrap",
            img: px(15913640),
            sizes: [p("PRICE", 590)],
            blurb: "Grilled fillings rolled tight with house sauce.",
          },
        ],
      },
      {
        title: "Snacks & Salads",
        color: "red",
        items: [
          {
            id: "chicken-strips",
            name: "Chicken Strips",
            img: px(33068077),
            sizes: [p("PRICE", 590)],
            blurb: "Chicken strips + medium fries + dip sauce.",
          },
          {
            id: "hot-shot",
            name: "Hot Shot",
            img: px(37025062),
            sizes: [p("PRICE", 600)],
            badge: "SPICY",
          },
          {
            id: "nuggets",
            name: "Nuggets",
            img: px(39853099),
            sizes: [p("10 PCS", 550)],
          },
          {
            id: "chicken-donuts",
            name: "Chicken Donuts",
            img: px(420308),
            sizes: [p("PRICE", 590)],
            badge: "NEW ARRIVAL",
          },
          {
            id: "russain-salad",
            name: "Russain Salad",
            img: px(6107789),
            sizes: [p("MEDIUM", 330), p("LARGE", 430)],
          },
        ],
      },
    ],
  },
];

export const DEALS: Deal[] = [
  {
    id: "deal-1",
    no: 1,
    items: ["2 Small Pizza", "1 Half Ltr Drink"],
    price: 1350,
    img: px(4109116, 700, 420),
  },
  {
    id: "deal-2",
    no: 2,
    items: ["2 Medium Pizza", "1 Ltr Drink"],
    price: 2150,
    img: px(32524109, 700, 420),
  },
  {
    id: "deal-3",
    no: 3,
    items: ["2 Large Pizza", "1.5 Ltr Drink"],
    price: 3000,
    img: px(19685655, 700, 420, "png"),
  },
  {
    id: "deal-4",
    no: 4,
    items: ["1 Large Pizza", "2 Zinger Burger", "10 Nuggets", "1.5 Ltr Drink"],
    price: 2600,
    img: px(4109136, 700, 420),
  },
  {
    id: "deal-5",
    no: 5,
    items: ["1 Zinger Burger", "1 Reg Fries", "1 Reg Drink"],
    price: 690,
    img: px(983297, 700, 420),
  },
  {
    id: "deal-6",
    no: 6,
    items: ["3 Zinger Burger", "1 Ltr Drink"],
    price: 1220,
    img: px(11690683, 700, 420),
  },
  {
    id: "deal-7",
    no: 7,
    items: ["5 Zinger Burger", "1.5 Drink"],
    price: 1950,
    img: px(11690674, 700, 420),
  },
  {
    id: "deal-8",
    no: 8,
    items: ["2 Zinger Burger", "1 Half Ltr Drink"],
    price: 800,
    img: px(38896826, 700, 420),
  },
  {
    id: "deal-9",
    no: 9,
    items: ["8 Zinger Burger", "1.5 Drink"],
    price: 3000,
    img: px(14773000, 700, 420),
  },
  {
    id: "deal-10",
    no: 10,
    items: ["1 Behari Roll", "1 Reg Fries", "Dip Sauce"],
    price: 850,
    img: px(18007684, 700, 420),
  },
  {
    id: "deal-11",
    no: 11,
    items: ["1 Grill + Club Sandwich", "1 Reg Drink", "Dip Sauce"],
    price: 750,
    img: px(16845663, 700, 420),
  },
  {
    id: "deal-12",
    no: 12,
    items: ["2 Zingratha", "1 Reg Fries", "1 Reg Drink"],
    price: 800,
    img: px(5848092, 700, 420),
  },
];

export const TOPPINGS: { title: string; rows: [string, number][] }[] = [
  {
    title: "Extra Chicken Topping",
    rows: [
      ["Small Pizza", 150],
      ["Medium Pizza", 180],
      ["Large Pizza", 250],
      ["Family Pizza", 300],
    ],
  },
  {
    title: "Extra Cheese Topping",
    rows: [
      ["Small Pizza", 150],
      ["Medium Pizza", 180],
      ["Large Pizza", 250],
      ["Family Pizza", 300],
    ],
  },
];

/* ---------- business info (from the menu card) ---------- */
export const INFO = {
  name: "Burger Saucy",
  phones: ["0309-3745555", "0309-3765555"],
  waNumber: "923093745555",
  address: "City Bus Terminal Chowk, Yateem Khana, Band Road, Lahore",
  hours: "Open daily · 11:00 am – 1:00 am",
  delivery: "Free delivery up to 5 km",
};

/* hero + featured imagery */
export const HERO_IMG = px(27927338, 720, 720);
export const HERO_IMG_2 = px(11354487, 640, 460);
