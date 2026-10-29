/* Burger Saucy — menu data. */

// Images load karne ka function (jfif bhi add hai)
const images = import.meta.glob('../imgs/**/*.{png,jpg,jpeg,jfif,webp,avif}', { eager: true, import: 'default' }) as Record<string, string>;

// Folder aur File ka naam de kar image dhoondhne ka function
const getImg = (folderName: string, fileName: string) => {
  const found = Object.keys(images).find(key => key.includes(`/${folderName}/${fileName}.`));
  return found ? images[found] : ""; 
};

// Pexels function (Ab kisi kaam ka nahi hai, par rehne dein taake error na aaye)
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
            img: getImg("pizzas", "1"),
            sizes: [p("MEDIUM", 1650), p("LARGE", 2400), p("FULL", 3200)],
            badge: "BESTSELLER",
            blurb: "Two layers of dough, twice the cheese load.",
          },
          {
            id: "turkish-pizza",
            name: "Turkish Pizza",
            img: getImg("pizzas", "2"),
            sizes: [p("MEDIUM", 1550), p("LARGE", 2100), p("FULL", 2700)],
            blurb: "Crisp base, loaded Turkish-style toppings.",
          },
          {
            id: "kabab-crust",
            name: "Kabab Crust",
            img: getImg("pizzas", "3"),
            sizes: [p("MEDIUM", 1550), p("LARGE", 2100), p("FULL", 2700)],
            blurb: "Every bite starts with grilled kabab crust.",
          },
          {
            id: "crown-crust",
            name: "Crown Crust",
            img: getImg("pizzas", "4"),
            sizes: [p("MEDIUM", 1650), p("LARGE", 2400), p("FULL", 3200)],
            badge: "CHEESY",
            blurb: "Stuffed crown crust — cheese around the whole edge.",
          },
          {
            id: "kabab-pizza",
            name: "Kabab Pizza",
            img: getImg("pizzas", "5"),
            sizes: SMLM(800, 1500, 2000, 2600),
          },
          {
            id: "cheese-stuffer",
            name: "Cheese Stuffer",
            img: getImg("pizzas", "6"),
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
            img: getImg("pizzas", "7"),
            sizes: SMLM(750, 1350, 1900, 2500),
            badge: "LAHORI",
            blurb: "Creamy malai boti chunks, Lahore's favourite.",
          },
          {
            id: "saucy-special",
            name: "Saucy Special",
            img: getImg("pizzas", "8"),
            sizes: SMLM(750, 1350, 1900, 2500),
            badge: "NEW",
            blurb: "Drowned in our house saucy drizzle.",
          },
          {
            id: "lazania-pizza",
            name: "Lazania Pizza",
            img: getImg("pizzas", "9"),
            sizes: [p("MEDIUM", 1650), p("LARGE", 2400), p("FULL", 3200)],
            blurb: "Baked lazania layers on a pizza base.",
          },
          {
            id: "chicken-tikka-creamy",
            name: "Chicken Tikka Creamy",
            img: getImg("pizzas", "10"),
            sizes: SMLM(750, 1300, 1800, 2400),
            blurb: "Smoky tikka pieces in a creamy cheese pull.",
          },
          {
            id: "chicken-chilli-pizza",
            name: "Chicken Chilli Pizza",
            img: getImg("pizzas", "11"),
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
            img: getImg("pizzas", "12"),
            sizes: SMLM(690, 1200, 1700, 2350),
          },
          {
            id: "chicken-fajita",
            name: "Chicken Fajita",
            img: getImg("pizzas", "13"),
            sizes: SMLM(690, 1200, 1700, 2350),
            blurb: "Fajita peppers, onions and charred chicken.",
          },
          {
            id: "chicken-supreme",
            name: "Chicken Supreme",
            img: getImg("pizzas", "14"),
            sizes: SMLM(690, 1200, 1700, 2350),
          },
          {
            id: "mughlai-pizza",
            name: "Mughlai Pizza",
            img: getImg("pizzas", "15"),
            sizes: SMLM(750, 1350, 1850, 2450),
            blurb: "Fragrant Mughlai masala, olives & egg.",
          },
          {
            id: "desi-chaska",
            name: "Desi Chaska",
            img: getImg("pizzas", "16"),
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
            img: getImg("ourmenupage", "wehshi burger"),
            sizes: [p("PRICE", 590)],
            badge: "BESTSELLER",
            blurb: "Crisp fried fillet, cold mayo, fresh lettuce.",
          },
          {
            id: "molten-lava",
            name: "Molten Lava",
            img: getImg("ourmenupage", "molten lawa"),
            sizes: [p("PRICE", 700)],
            badge: "NEW",
            blurb: "Molten cheese core that runs when you cut.",
          },
          {
            id: "injacted-fish-burger",
            name: "Injacted Fish Burger",
            img: getImg("ourmenupage", "fish burger"),
            sizes: [p("PRICE", 750)],
            blurb: "Double fish fillets, injected with flavour.",
          },
          {
            id: "king-zinger",
            name: "King Zinger",
            img: getImg("ourmenupage", "king burger"),
            sizes: [p("PRICE", 399)],
            blurb: "The classic zinger, crowned with sesame.",
          },
          {
            id: "grill-burger",
            name: "Grill Burger",
            img: getImg("ourmenupage", "grill burger"),
            sizes: [p("PRICE", 590)],
            blurb: "Char-grilled fillet with smoky sauce.",
          },
          {
            id: "tower-zinger",
            name: "Tower Zinger",
            img: getImg("ourmenupage", "tower zinger"),
            sizes: [p("PRICE", 690)],
            badge: "TALL",
            blurb: "A tower of crispy fillet and melted cheese.",
          },
          {
            id: "pizza-burger",
            name: "Pizza Burger",
            img: getImg("ourmenupage", "pizza burger"),
            sizes: [p("PRICE", 590)],
            blurb: "Pizza toppings, burger format. Yes, really.",
          },
          {
            id: "max-patty",
            name: "Max Patty",
            img: getImg("ourmenupage", "max patty"),
            sizes: [p("PRICE", 390)],
            blurb: "Double patty, double cheese, zero compromise.",
          },
          {
            id: "hot-spicy",
            name: "Hot Spicy",
            img: getImg("ourmenupage", "hot soicy"),
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
            img: getImg("ourmenupage", "salsa wing"), 
            sizes: [p("10 PCS", 690)], 
            blurb: "10 crispy wings tossed in smoky salsa." 
          },
          { 
            id: "oven-baked-wing", 
            name: "Oven Baked Wing", 
            img: getImg("ourmenupage", "oven baked wing"), 
            sizes: [p("10 PCS", 690)] 
          },
          { 
            id: "crispy-wing", 
            name: "Crispy Wing", 
            img: getImg("ourmenupage", "crispy wing"), 
            sizes: [p("10 PCS", 690)], 
            badge: "CRUNCHY" 
          },
          { 
            id: "injacted-broast", 
            name: "Injected Broast", 
            img: px(36879217), 
            sizes: [p("2 PIECE", 600), p("4 PIECE", 1200), p("8 PIECE", 2400)], 
            badge: "NEW ARRIVAL", 
            blurb: "Box comes with bun, fries + dip." 
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
            img: getImg("ourmenupage", "loaded fries"), 
            sizes: [p("PRICE", 650)], 
            blurb: "Crispy fillet + grill fries, loaded with sauce." 
          },
          { 
            id: "fries", 
            name: "Fries", 
            img: getImg("ourmenupage", "fries"), 
            sizes: [p("MEDIUM", 200), p("LARGE", 320)] 
          },
          { 
            id: "macroni-crispy-pasta", 
            name: "Macroni Crispy Pasta", 
            img: getImg("ourmenupage", "macroni crispy pasta"), 
            sizes: [p("PRICE", 550)], 
            blurb: "Baked tray of crispy cheesy macroni." 
          },
          { 
            id: "chicken-fries", 
            name: "Chicken Fries", 
            img: getImg("ourmenupage", "chicken fries"), 
            sizes: [p("PRICE", 590)] 
          },
          { 
            id: "chicken-cheese-sticks", 
            name: "Chicken Cheese Sticks", 
            img: getImg("ourmenupage", "chicken cheese sticks"), 
            sizes: [p("PRICE", 550)] 
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
            img: getImg("ourmenupage", "saucy sandwich"), 
            sizes: [p("PRICE", 600)] 
          },
          { 
            id: "grill-sandwich", 
            name: "Grill Sandwich", 
            img: getImg("ourmenupage", "grill sandwich"), 
            sizes: [p("PRICE", 590)] 
          },
          { 
            id: "special-pizza-parahtah", 
            name: "Special Pizza Parahtah", 
            img: getImg("ourmenupage", "special pizza parahtah"), 
            sizes: [p("PRICE", 590)], 
            blurb: "Pizza loaded inside a flaky parahtah." 
          },
          { 
            id: "tikka-parahtah-pizza", 
            name: "Tikka Parahtah Pizza", 
            img: getImg("ourmenupage", "tikka parahtah pizza"), 
            sizes: [p("PRICE", 590)] 
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
            img: getImg("ourmenupage", "chicken strips"), 
            sizes: [p("PRICE", 590)], 
            blurb: "Chicken strips + medium fries + dip sauce." 
          },
          { 
            id: "hot-shot", 
            name: "Hot Shot", 
            img: getImg("ourmenupage", "hot shot"), 
            sizes: [p("PRICE", 600)], 
            badge: "SPICY" 
          },
          { 
            id: "nuggets", 
            name: "Nuggets", 
            img: getImg("ourmenupage", "nuggets"), 
            sizes: [p("10 PCS", 550)] 
          },
          { 
            id: "chicken-donuts", 
            name: "Chicken Donuts", 
            img: getImg("ourmenupage", "chicken donuts"), 
            sizes: [p("PRICE", 590)], 
            badge: "NEW ARRIVAL" 
          },
          { 
            id: "russain-salad", 
            name: "Russain Salad", 
            img: getImg("ourmenupage", "russain salad"), 
            sizes: [p("MEDIUM", 330), p("LARGE", 430)] 
          },
        ],
      },
    ],
  },
];

// YAHAN DEALS UPDATE KIYE GAYE HAIN
export const DEALS: Deal[] = [
  { id: "deal-1", no: 1, items: ["2 Small Pizza", "1 Half Ltr Drink"], price: 1350, img: getImg("deals", "deal 1") },
  { id: "deal-2", no: 2, items: ["2 Medium Pizza", "1 Ltr Drink"], price: 2150, img: getImg("deals", "deal 2") },
  { id: "deal-3", no: 3, items: ["2 Large Pizza", "1.5 Ltr Drink"], price: 3000, img: getImg("deals", "deal 3") },
  { id: "deal-4", no: 4, items: ["1 Large Pizza", "2 Zinger Burger", "10 Nuggets", "1.5 Ltr Drink"], price: 2600, img: getImg("deals", "deal 4") },
  { id: "deal-5", no: 5, items: ["1 Zinger Burger", "1 Reg Fries", "1 Reg Drink"], price: 690, img: getImg("deals", "deal 5") },
  { id: "deal-6", no: 6, items: ["3 Zinger Burger", "1 Ltr Drink"], price: 1220, img: getImg("deals", "deal 6") },
  { id: "deal-7", no: 7, items: ["5 Zinger Burger", "1.5 Drink"], price: 1950, img: getImg("deals", "deal 7") },
  { id: "deal-8", no: 8, items: ["2 Zinger Burger", "1 Half Ltr Drink"], price: 800, img: getImg("deals", "deal 8") },
  { id: "deal-9", no: 9, items: ["8 Zinger Burger", "1.5 Drink"], price: 3000, img: getImg("deals", "deal 9") },
  { id: "deal-10", no: 10, items: ["1 Behari Roll", "1 Reg Fries", "Dip Sauce"], price: 850, img: getImg("deals", "deal 10") },
  { id: "deal-11", no: 11, items: ["1 Grill + Club Sandwich", "1 Reg Drink", "Dip Sauce"], price: 750, img: getImg("deals", "deal 11") },
  { id: "deal-12", no: 12, items: ["2 Zingratha", "1 Reg Fries", "1 Reg Drink"], price: 800, img: getImg("deals", "deal 12") },
];

export const TOPPINGS: { title: string; rows: [string, number][] }[] = [
  { title: "Extra Chicken Topping", rows: [["Small Pizza", 150], ["Medium Pizza", 180], ["Large Pizza", 250], ["Family Pizza", 300]] },
  { title: "Extra Cheese Topping", rows: [["Small Pizza", 150], ["Medium Pizza", 180], ["Large Pizza", 250], ["Family Pizza", 300]] },
];

export const INFO = {
  name: "Burger Saucy",
  phones: ["0309-3745555", "0309-3765555"],
  waNumber: "923093745555",
  address: "City Bus Terminal Chowk, Yateem Khana, Band Road, Lahore",
  hours: "Open daily · 11:00 am – 1:00 am",
  delivery: "Free delivery up to 5 km",
};

// --- NAYI HERO IMAGE SET KI GAYI HAI ---
const heroImgKey = Object.keys(images).find(key => key.includes('hero img.'));
export const HERO_IMG = heroImgKey ? images[heroImgKey] : ""; 
export const HERO_IMG_2 = getImg("pizzas", "1"); 