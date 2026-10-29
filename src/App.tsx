import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  TABS,
  DEALS,
  TOPPINGS,
  INFO,
  HERO_IMG,
  type MenuItem,
  type SizePrice,
  type Deal,
  type Group,
} from "./data/menu";

/* ============================================================
   ICONS — hand-drawn style line icons
   ============================================================ */
type IconProps = { className?: string };
const sw = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const SliceIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...sw}>
    <path d="M12 21 3 5.5C3 3.6 5 2 7.4 2h9.2C19 2 21 3.6 21 5.5L12 21Z" />
    <path d="M5.5 7.5c4.4 2 8.6 2 13 0" />
    <circle cx="10" cy="12" r="1" fill="currentColor" stroke="none" />
    <circle cx="13.5" cy="15" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const BurgerIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...sw}>
    <path d="M4 10c0-4 3.6-6.5 8-6.5S20 6 20 10H4Z" />
    <path d="M4 14h16" />
    <path d="M5 17.5h14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2Z" />
    <circle cx="9" cy="7" r="0.6" fill="currentColor" stroke="none" />
    <circle cx="12.5" cy="6" r="0.6" fill="currentColor" stroke="none" />
    <circle cx="15.5" cy="7.5" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);

const TruckIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...sw}>
    <path d="M2 6h12v10H2zM14 9h4l3 3v4h-7" />
    <circle cx="6" cy="18" r="1.8" />
    <circle cx="17" cy="18" r="1.8" />
  </svg>
);

const PhoneIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...sw}>
    <path d="M5 4h4l1.5 4.5-2.2 1.6a12 12 0 0 0 5.6 5.6l1.6-2.2L20 15v4a1.8 1.8 0 0 1-2 1.8A16.8 16.8 0 0 1 3.2 6 1.8 1.8 0 0 1 5 4Z" />
  </svg>
);

const WaIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.7.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.6-1.2.1-.2 0-.4 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.9.9-1 2.1-.1 3.7a10.4 10.4 0 0 0 4.3 3.8c1.7.8 2.4.8 3.2.7.5 0 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2 0-.1-.2-.2-.4-.3Z" />
  </svg>
);

const PlusIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...sw}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const XIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...sw}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

const CheckIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...sw}>
    <path d="m4.5 12.5 5 5 10-11" />
  </svg>
);

const SearchIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...sw}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="m15.5 15.5 5 5" />
  </svg>
);

const PinIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...sw}>
    <path d="M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11Z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
);

const ClockIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...sw}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

const ArrowIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...sw}>
    <path d="M3 12h16M14 6l6 6-6 6" strokeDasharray="3 3" />
  </svg>
);

/* ============================================================
   LOGO
   ============================================================ */
function LogoMark({ className = "h-11 w-11" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <rect x="1.5" y="1.5" width="45" height="45" rx="12" fill="#1E5B3C" />
      <path d="M10 21c0-6.2 6.4-9.5 14-9.5S38 14.8 38 21c0 2.2-1.8 3.4-3.4 3.4H13.4C11.8 24.4 10 23.2 10 21Z" fill="#F6C445" />
      <circle cx="19" cy="17" r="1" fill="#FFFDF4" />
      <circle cx="24" cy="15.5" r="1" fill="#FFFDF4" />
      <circle cx="29" cy="17.5" r="1" fill="#FFFDF4" />
      <path d="M11 26.5c2.4 0 2.4 1.6 4.8 1.6s2.4-1.6 4.8-1.6 2.4 1.6 4.8 1.6 2.4-1.6 4.8-1.6 2.4 1.6 4.8 1.6V29H11v-2.5Z" fill="#FFFDF4" />
      <rect x="10.5" y="31" width="27" height="4.4" rx="2.2" fill="#E23B2E" />
      <rect x="10" y="37" width="28" height="4.5" rx="2.25" fill="#F6C445" />
    </svg>
  );
}

/* ============================================================
   AMBIENT PIECES
   ============================================================ */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }
    const ob = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          ob.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Watermark({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 select-none overflow-hidden ${className}`}>
      {Array.from({ length: 7 }).map((_, r) => (
        <div
          key={r}
          className="flex gap-12 whitespace-nowrap font-display text-4xl opacity-[0.05] md:text-6xl"
          style={{ transform: `translateY(${(r * 100) / 6 - 2}%)` }}
        >
          {Array.from({ length: 6 }).map((_, c) => (
            <span key={c}>{text}</span>
          ))}
        </div>
      ))}
    </div>
  );
}

const TICKER_ITEMS = [
  "FREE DELIVERY UP TO 5 KM",
  "ORDER · 0309-3745555",
  "ORDER · 0309-3765555",
  "CITY BUS TERMINAL CHOWK · YATEEM KHANA · BAND ROAD LAHORE",
  "12 AMAZING DEALS FROM 690RS",
  "NEW ARRIVAL — INJECTED BROAST FROM 600RS",
];

function Ticker() {
  const Row = ({ k }: { k: string }) => (
    <div key={k} className="flex shrink-0 items-center">
      {TICKER_ITEMS.map((t, i) => (
        <span key={i} className="flex items-center gap-3 px-5 font-display text-xs tracking-[0.2em] md:text-sm">
          <SliceIcon className="h-4 w-4 shrink-0 text-mustard" />
          {t}
        </span>
      ))}
    </div>
  );
  return (
    <div className="overflow-hidden border-y-2 border-leaf-ink/40 bg-leaf-dark py-2.5 text-cream-100">
      <div className="ticker-track flex w-max">
        <Row k="a" />
        <Row k="b" />
      </div>
    </div>
  );
}

/* ============================================================
   ITEM + DEAL CARDS
   ============================================================ */
const TILTS = ["rotate-[-0.6deg]", "rotate-[0.5deg]", "rotate-[-0.35deg]", "rotate-[0.55deg]"];

function ItemCard({
  item,
  index,
  onAdd,
}: {
  item: MenuItem;
  index: number;
  onAdd: (it: MenuItem, sz: SizePrice) => void;
}) {
  const [sel, setSel] = useState(0);
  return (
    <Reveal delay={(index % 3) * 90} className="h-full">
      <article
        className={`group relative flex h-full flex-col rounded-xl border-2 border-ink/15 bg-cream-50 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:rotate-0 hover:shadow-card-lg ${TILTS[index % TILTS.length]}`}
      >
        {item.badge && (
          <span className="absolute -top-3 left-3 z-10 -rotate-3 rounded-md bg-tomato px-2.5 py-1 font-display text-[11px] tracking-widest text-white shadow-sm">
            {item.badge}
          </span>
        )}
        <div className="h-44 overflow-hidden rounded-t-[9px] border-b-2 border-ink/10 bg-transparent flex items-center justify-center p-1">
          <img
            src={item.img}
            alt={item.name}
            loading="lazy"
            className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col p-4">
          <h3 className="font-display text-xl leading-tight text-leaf-dark">{item.name}</h3>
          {item.blurb && <p className="-mt-0.5 mt-1 text-xs font-bold text-ink/50">{item.blurb}</p>}
          <div className="mt-2.5 flex flex-1 flex-col gap-0.5">
            {item.sizes.map((s, i) => (
              <button
                key={s.label}
                onClick={() => setSel(i)}
                className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left transition-colors ${
                  i === sel ? "bg-mustard/30" : "hover:bg-mustard/15"
                }`}
              >
                <span className="text-[11px] font-extrabold tracking-[0.14em] text-ink/60">{s.label}</span>
                <span className="leader mx-1 flex-1" />
                <span className={`font-display text-sm ${i === sel ? "text-tomato" : "text-ink/80"}`}>{s.price}rs</span>
              </button>
            ))}
          </div>
          <button
            onClick={() => onAdd(item, item.sizes[sel])}
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-tomato px-4 py-2.5 font-display tracking-wider text-white shadow-card-red transition-all hover:bg-tomato-dark active:translate-y-0.5"
          >
            <PlusIcon className="h-4 w-4" /> ADD TO ORDER
          </button>
        </div>
      </article>
    </Reveal>
  );
}

function DealCard({ deal, index, onAdd }: { deal: Deal; index: number; onAdd: (d: Deal) => void }) {
  return (
    <Reveal delay={(index % 2) * 90} className="h-full">
      <article className="group flex h-full flex-col rounded-xl border-2 border-dashed border-leaf/45 bg-white p-4 text-leaf-dark shadow-card-green transition-all duration-300 hover:-translate-y-1 hover:border-leaf">
        <div className="flex items-center justify-between gap-2">
          <span className="font-display tracking-[0.2em] text-tomato">DEAL {deal.no}</span>
          <span className="rounded-md bg-tomato px-2.5 py-1 font-display text-sm tracking-wide text-white shadow-sm">
            {deal.price}rs
          </span>
        </div>
        <ul className="mt-3 space-y-1.5 text-sm font-extrabold">
          {deal.items.map((it) => (
            <li key={it} className="flex items-start gap-2">
              <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-leaf" />
              {it}
            </li>
          ))}
        </ul>
        
        {/* Image fully visible with object-contain and mix-blend */}
        <div className="mt-4 h-36 w-full overflow-hidden rounded-lg border border-ink/10 flex items-center justify-center bg-white">
          <img
            src={deal.img}
            alt={`Deal ${deal.no}`}
            loading="lazy"
            className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <button
          onClick={() => onAdd(deal)}
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-mustard px-4 py-2.5 font-display tracking-wider text-leaf-ink transition-all hover:bg-mustard-soft active:translate-y-0.5"
        >
          <PlusIcon className="h-4 w-4" /> ADD THIS DEAL
        </button>
      </article>
    </Reveal>
  );
}

/* ============================================================
   BANNERS + STRIPS
   ============================================================ */
function Banner({ group }: { group: Group }) {
  const bg = group.color === "red" ? "bg-tomato" : "bg-leaf";
  return (
    <div>
      <span className={`inline-flex items-center gap-2.5 rounded-md px-4 py-1.5 font-display text-sm tracking-[0.18em] text-white shadow-card ${bg}`}>
        <span className="h-2 w-2 rounded-full bg-white/70" />
        {group.title.toUpperCase()}
        <span className="font-body text-xs font-extrabold tracking-normal text-white/65">· {group.items.length} items</span>
      </span>
    </div>
  );
}

const STEPS = [
  {
    n: "1",
    t: "PICK YOUR SIZE",
    d: "Tap SMALL, MEDIUM, LARGE or FULL on any dish — prices follow the printed card exactly.",
  },
  {
    n: "2",
    t: "TAP ADD TO ORDER",
    d: "Everything lands in the order tray at the bottom, with a running total in real time.",
  },
  {
    n: "3",
    t: "SEND ON WHATSAPP",
    d: "One tap sends your whole order to 0309-3745555. We confirm, pack and deliver.",
  },
];

function StepsStrip() {
  return (
    <section className="border-y-2 border-ink/10 bg-cream-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3 md:gap-6">
        {STEPS.map((s, i) => (
          <Reveal key={s.n} delay={i * 120}>
            <div className="relative pl-14">
              <span className="absolute left-0 top-0 grid h-11 w-11 -rotate-6 place-items-center rounded-lg border-2 border-ink/15 bg-mustard font-display text-xl text-leaf-ink shadow-card">
                {s.n}
              </span>
              <h3 className="font-display text-lg tracking-wide text-leaf-dark">{s.t}</h3>
              <p className="mt-1.5 text-sm font-bold text-ink/60">{s.d}</p>
              {i < 2 && <ArrowIcon className="absolute -right-4 top-2 hidden h-8 w-16 text-ink/25 md:block" />}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ToppingsStrip() {
  return (
    <Reveal>
      <div className="mt-2 grid gap-6 rounded-xl bg-leaf p-6 text-cream-100 shadow-card-green md:grid-cols-2">
        {TOPPINGS.map((t) => (
          <div key={t.title}>
            <h4 className="font-display tracking-[0.18em] text-mustard">{t.title.toUpperCase()}</h4>
            <ul className="mt-3 space-y-1.5">
              {t.rows.map(([label, price]) => (
                <li key={label} className="flex items-center gap-2 text-sm font-extrabold">
                  <span>{label} Pizza</span>
                  <span className="leader mx-1 flex-1 border-cream-100/40" />
                  <span className="font-display text-mustard">{price}rs</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

/* ============================================================
   HEADER (sticky: logo bar + tab bar + search)
   ============================================================ */
interface TabDef {
  id: string;
  label: string;
  count: number;
}

function TopBar({
  tab,
  setTab,
  query,
  setQuery,
  count,
  waHref,
}: {
  tab: string;
  setTab: (t: string) => void;
  query: string;
  setQuery: (q: string) => void;
  count: number;
  waHref: string;
}) {
  const tabs: TabDef[] = [
    ...TABS.map((t) => ({
      id: t.id,
      label: t.label,
      count: t.groups.reduce((a, g) => a + g.items.length, 0),
    })),
    { id: "deals", label: "Deals", count: DEALS.length },
  ];

  const searchBox = (
    <label className="flex shrink-0 items-center gap-2 rounded-lg border-2 border-ink/15 bg-cream-50 px-3 py-2 transition focus-within:border-leaf">
      <SearchIcon className="h-4 w-4 text-ink/40" />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search the menu…"
        className="w-full bg-transparent text-sm font-bold outline-none placeholder:font-semibold placeholder:text-ink/35 sm:w-44"
      />
      {query && (
        <button onClick={() => setQuery("")} className="text-ink/40 hover:text-ink" aria-label="Clear search">
          <XIcon className="h-4 w-4" />
        </button>
      )}
    </label>
  );

  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink/10 bg-cream-100/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 pt-3">
        <a href="#top" className="flex items-center gap-2.5">
          <LogoMark />
          <span className="font-display text-2xl leading-none tracking-wide text-ink">
            Burger <span className="text-tomato">Saucy</span>
          </span>
        </a>
        <div className="hidden items-center gap-2 text-xs font-extrabold tracking-wider text-leaf lg:flex">
          <TruckIcon className="h-5 w-5" /> {INFO.delivery.toUpperCase()}
        </div>
        <div className="flex items-center gap-2">
          <a
            href="tel:03093745555"
            className="hidden items-center gap-2 rounded-lg border-2 border-leaf/25 px-3 py-2 text-sm font-extrabold text-leaf transition hover:bg-leaf hover:text-cream-100 sm:inline-flex"
          >
            <PhoneIcon className="h-4 w-4" /> {INFO.phones[0]}
          </a>
          <a
            href={waHref}
            target="_blank"
            rel="noreferrer"
            className="relative inline-flex items-center gap-2 rounded-lg bg-leaf px-3.5 py-2 font-display text-sm tracking-wide text-cream-100 shadow-card-green transition hover:-translate-y-0.5"
          >
            <WaIcon className="h-4 w-4 text-mustard" /> WHATSAPP
            {count > 0 && (
              <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-tomato font-display text-xs text-white">
                {count}
              </span>
            )}
          </a>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 pb-3 pt-2.5 md:flex-row md:items-center">
        <nav className="flex items-center gap-2 overflow-x-auto pb-0.5 md:flex-1 md:justify-center">
          {tabs.map((t) => {
            const active = tab === t.id && !query;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex shrink-0 items-center gap-2 rounded-lg border-2 px-3.5 py-2 font-display text-sm tracking-wide transition-all ${
                  active
                    ? "border-leaf bg-leaf text-cream-100 shadow-card-green"
                    : "border-ink/15 bg-cream-50 text-ink/65 hover:-translate-y-0.5 hover:text-ink"
                }`}
              >
                {t.label}
                <span
                  className={`rounded-md px-1.5 py-0.5 font-body text-[10px] font-black ${
                    active ? "bg-mustard text-leaf-ink" : "bg-ink/10 text-ink/60"
                  }`}
                >
                  {t.count}
                </span>
              </button>
            );
          })}
        </nav>
        <div className="hidden md:block">{searchBox}</div>
      </div>
      <div className="mx-auto max-w-6xl px-4 pb-3 md:hidden">{searchBox}</div>
    </header>
  );
}

/* ============================================================
   HERO
   ============================================================ */
const STATS = [
  { n: "16", l: "PIZZA'S" },
  { n: "9", l: "BURGERS" },
  { n: "20", l: "SNACKS & WRAPS" },
  { n: "12", l: "DEALS" },
];

function Hero({ go }: { go: (t: string) => void }) {
  return (
    <section id="top" className="relative overflow-hidden bg-leaf text-cream-100">
      <Watermark text="PIZZA PIZZA" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 md:grid-cols-[1.05fr_0.95fr] md:py-20">
        <div>
          <p className="flex items-center gap-3 font-display text-xs tracking-[0.3em] text-mustard md:text-sm">
            <span className="inline-block h-0.5 w-10 bg-mustard" />
            BAND ROAD · LAHORE · FREE DELIVERY
          </p>
          <h1 className="mt-4 font-display leading-[0.95]">
            <span className="block text-3xl tracking-wide text-mustard md:text-4xl">DELICIOUS.</span>
            <span className="block text-6xl md:text-[5.5rem]">OUR MENU</span>
            <span className="text-outline block text-3xl tracking-wide md:text-5xl">BURGER SAUCY</span>
          </h1>
          <p className="mt-6 max-w-md text-base font-bold leading-relaxed text-cream-100/80">
            Same names, same dishes, same prices — straight off the printed menu card. Every item carries its own
            photo. Pick your size, build your order and send it to our kitchen on WhatsApp.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button
              onClick={() => go("deals")}
              className="rounded-lg bg-mustard px-6 py-3 font-display tracking-wider text-leaf-ink shadow-card-green transition-all hover:-translate-y-0.5 hover:bg-mustard-soft"
            >
              GRAB THE 12 DEALS
            </button>
            <button
              onClick={() => go("pizza")}
              className="rounded-lg border-2 border-cream-100/60 px-6 py-3 font-display tracking-wider text-cream-100 transition-all hover:-translate-y-0.5 hover:bg-cream-100/10"
            >
              BROWSE PIZZA'S
            </button>
          </div>
          <div className="mt-9 grid max-w-md grid-cols-4 divide-x divide-cream-100/20 rounded-xl border-2 border-dashed border-cream-100/30 bg-leaf-dark/50">
            {STATS.map((s) => (
              <div key={s.l} className="px-1 py-3 text-center">
                <p className="font-display text-2xl text-mustard md:text-3xl">{s.n}</p>
                <p className="mt-0.5 text-[9px] font-black tracking-widest text-cream-100/70 md:text-[10px]">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* HERO IMAGE SECTION */}
        <div className="relative mx-auto w-fit mt-8 md:mt-0">
          <div className="anim-float relative flex items-center justify-center">
            
            <div className="anim-spin-slow rounded-full border-[6px] border-dashed border-mustard w-64 h-64 md:w-[22rem] md:h-[22rem] relative overflow-hidden flex items-center justify-center">
              
              <img
                src={HERO_IMG}
                alt="Crown Crust pizza"
                className="w-full h-full object-cover mix-blend-multiply scale-[1.65]"
              />
              
            </div>
            
            <span className="anim-wiggle absolute -right-2 top-2 md:-right-6 md:top-6 z-20 rotate-6 rounded-lg bg-mustard px-3 py-1.5 font-display text-xs text-leaf-ink shadow-card md:text-sm">
              CROWN CRUST · 1650rs
            </span>
            <span className="absolute -left-2 bottom-4 md:-left-6 md:bottom-10 z-20 -rotate-6 rounded-lg bg-tomato px-3 py-1.5 font-display text-xs text-white shadow-card md:text-sm">
              DELIVERY · 5 KM FREE
            </span>
            
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   ORDER TRAY
   ============================================================ */
interface CartLine {
  id: string;
  name: string;
  sizeLabel: string;
  price: number;
  qty: number;
}

function OrderTray({
  lines,
  total,
  count,
  bump,
  waHref,
  onRemove,
  onClear,
}: {
  lines: CartLine[];
  total: number;
  count: number;
  bump: number;
  waHref: string;
  onRemove: (id: string) => void;
  onClear: () => void;
}) {
  const [open, setOpen] = useState(false);
  if (count === 0) return null;
  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[min(94vw,720px)] -translate-x-1/2">
      {open && (
        <div className="mb-2 max-h-56 overflow-auto rounded-xl border-2 border-cream-100/25 bg-leaf-ink p-4 text-cream-100 shadow-card-lg">
          <ul className="space-y-2">
            {lines.map((l) => (
              <li key={l.id} className="flex items-center gap-3 text-sm font-bold">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-mustard font-display text-xs text-leaf-ink">
                  {l.qty}×
                </span>
                <span className="min-w-0 flex-1 truncate">
                  {l.name}
                  {l.sizeLabel && <span className="text-cream-100/60"> — {l.sizeLabel}</span>}
                </span>
                <span className="font-display text-mustard">{(l.price * l.qty).toLocaleString()}rs</span>
                <button
                  onClick={() => onRemove(l.id)}
                  className="rounded-md p-1 text-cream-100/50 transition hover:bg-cream-100/10 hover:text-tomato"
                  aria-label={`Remove ${l.name}`}
                >
                  <XIcon className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex items-center gap-3 rounded-xl border-2 border-cream-100/25 bg-leaf-ink px-4 py-3 text-cream-100 shadow-card-lg">
        <button
          onClick={() => setOpen((o) => !o)}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-mustard font-display text-leaf-ink transition hover:scale-105"
          aria-label="Toggle order details"
        >
          <span key={bump} className="animate-pop grid place-items-center">
            {count}
          </span>
        </button>
        <div className="min-w-0 flex-1">
          <p className="font-display tracking-wider">
            YOUR ORDER <span className="text-cream-100/50">· {lines.length} line{lines.length > 1 ? "s" : ""}</span>
          </p>
          <p className="truncate text-xs font-bold text-cream-100/60">
            {lines
              .map((l) => `${l.qty}× ${l.name}${l.sizeLabel ? ` (${l.sizeLabel})` : ""}`)
              .join("  ·  ")}
          </p>
        </div>
        <span className="hidden font-display text-lg text-mustard sm:block">{total.toLocaleString()}rs</span>
        <a
          href={waHref}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-whatsapp px-4 py-2.5 font-display tracking-wide text-white shadow-sm transition hover:-translate-y-0.5 hover:brightness-110"
        >
          <WaIcon className="h-4 w-4" /> ORDER NOW
        </a>
        <button
          onClick={onClear}
          className="rounded-lg border border-cream-100/25 p-2 text-cream-100/60 transition hover:border-tomato hover:text-tomato"
          aria-label="Clear order"
        >
          <XIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer({ waHref }: { waHref: string }) {
  return (
    <footer id="contact" className="bg-leaf-ink text-cream-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <LogoMark className="h-12 w-12" />
            <span className="font-display text-2xl tracking-wide">
              Burger <span className="text-mustard">Saucy</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm font-bold leading-relaxed text-cream-100/70">
            Pizza's, burgers, wings, wraps and deals — the whole printed menu card, now one tap away. Prices as
            printed on the card.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-lg border border-dashed border-cream-100/30 px-3 py-2 text-xs font-extrabold tracking-wider text-mustard">
            <TruckIcon className="h-4 w-4" /> {INFO.delivery.toUpperCase()}
          </p>
        </div>
        <div>
          <h4 className="font-display tracking-[0.2em] text-mustard">FIND US</h4>
          <ul className="mt-4 space-y-3 text-sm font-bold text-cream-100/80">
            <li className="flex items-start gap-2.5">
              <PinIcon className="mt-0.5 h-4.5 w-4.5 shrink-0 text-mustard" />
              {INFO.address}
            </li>
            <li className="flex items-start gap-2.5">
              <ClockIcon className="mt-0.5 h-4.5 w-4.5 shrink-0 text-mustard" />
              {INFO.hours}
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-display tracking-[0.2em] text-mustard">ORDER NOW</h4>
          <div className="mt-4 flex flex-col gap-2.5">
            {INFO.phones.map((ph) => (
              <a
                key={ph}
                href={`tel:${ph.replace(/-/g, "")}`}
                className="inline-flex items-center gap-2.5 rounded-lg border-2 border-cream-100/25 px-4 py-2.5 font-display tracking-wide transition hover:-translate-y-0.5 hover:border-mustard hover:text-mustard"
              >
                <PhoneIcon className="h-4 w-4" /> {ph}
              </a>
            ))}
            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 rounded-lg bg-whatsapp px-4 py-2.5 font-display tracking-wide text-white transition hover:-translate-y-0.5 hover:brightness-110"
            >
              <WaIcon className="h-4 w-4" /> CHAT ON WHATSAPP
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-cream-100/15 py-5 text-center text-xs font-bold text-cream-100/50">
        © 2026 Burger Saucy · City Bus Terminal Chowk, Band Road, Lahore · Item photos via Pexels
      </div>
    </footer>
  );
}

/* ============================================================
   APP
   ============================================================ */
const fmtTotal = (n: number) => n.toLocaleString();

export default function App() {
  const [tab, setTabState] = useState("pizza");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<Record<string, CartLine>>({});
  const [bump, setBump] = useState(0);

  const lines = Object.values(cart);
  const count = lines.reduce((a, l) => a + l.qty, 0);
  const total = lines.reduce((a, l) => a + l.qty * l.price, 0);

  const addLine = useCallback((id: string, name: string, sizeLabel: string, price: number) => {
    const key = `${id}::${sizeLabel}`;
    setCart((c) => {
      const ex = c[key];
      return {
        ...c,
        [key]: ex ? { ...ex, qty: ex.qty + 1 } : { id: key, name, sizeLabel, price, qty: 1 },
      };
    });
    setBump((b) => b + 1);
  }, []);

  const onAdd = useCallback(
    (item: MenuItem, sz: SizePrice) => addLine(item.id, item.name, sz.label, sz.price),
    [addLine]
  );
  const onAddDeal = useCallback(
    (d: Deal) => addLine(d.id, `Deal ${d.no} — ${d.items.join(" + ")}`, "", d.price),
    [addLine]
  );

  const removeLine = useCallback((id: string) => {
    setCart((c) => {
      const n = { ...c };
      delete n[id];
      return n;
    });
  }, []);
  const clearCart = useCallback(() => setCart({}), []);

  const waHref = useMemo(() => {
    if (lines.length === 0) return `https://wa.me/${INFO.waNumber}`;
    const msg = [
      "Assalam o Alaikum, Burger Saucy! I would like to order:",
      "",
      ...lines.map((l, i) => `${i + 1}) ${l.name}${l.sizeLabel ? ` — ${l.sizeLabel}` : ""} x${l.qty} = ${fmtTotal(l.price * l.qty)}rs`),
      "",
      `Total: ${fmtTotal(total)}rs`,
      "",
      "Name: ",
      "Address: ",
    ].join("\n");
    return `https://wa.me/${INFO.waNumber}?text=${encodeURIComponent(msg)}`;
  }, [lines, total]);

  const go = useCallback((t: string) => {
    setTabState(t);
    setQuery("");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    requestAnimationFrame(() => {
      document.getElementById("menu")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    });
  }, []);

  const setTab = useCallback(
    (t: string) => {
      setTabState(t);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      requestAnimationFrame(() => {
        document.getElementById("menu")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      });
    },
    []
  );

  /* ------- what to render in the board ------- */
  const q = query.trim().toLowerCase();
  const activeTab = TABS.find((t) => t.id === tab) ?? TABS[0];

  const searchResults: MenuItem[] = useMemo(() => {
    if (!q) return [];
    const all = TABS.flatMap((t) => t.groups.flatMap((g) => g.items));
    return all.filter((it) => it.name.toLowerCase().includes(q));
  }, [q]);

  const headings: Record<string, { title: string; sub: string }> = {
    pizza: { title: "Pizza's", sub: "16 hand-tossed pies — signature, special & regular, exactly as printed." },
    burger: { title: "Special MENU Burger", sub: "9 saucy burgers, from the King Zinger to the Molten Lava." },
    sides: { title: "Sides, Snacks & Wraps", sub: "Wings, injected broast, loaded fries, parahtah pizzas, wraps & more." },
    deals: { title: "Save Some Dough", sub: "12 amazing deals — green boards and all, straight off the card." },
  };

  return (
    <div className="min-h-screen">
      <div className="noise" aria-hidden />

      <TopBar tab={tab} setTab={setTab} query={query} setQuery={setQuery} count={count} waHref={waHref} />
      <Hero go={go} />
      <Ticker />

      <main id="menu" className="mx-auto max-w-6xl scroll-mt-44 px-4 py-12 md:scroll-mt-36">
        {/* board heading */}
        <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
          <Reveal>
            <h2 className="font-display text-3xl text-leaf-dark md:text-4xl">
              {q ? "Search Results" : headings[tab].title}
            </h2>
            <p className="mt-1.5 max-w-xl text-sm font-bold text-ink/55">
              {q ? `“${query.trim()}” · ${searchResults.length} match${searchResults.length === 1 ? "" : "es"} across the menu` : headings[tab].sub}
            </p>
          </Reveal>
          {!q && (
            <span className="rounded-md border-2 border-dashed border-ink/20 px-3 py-1.5 font-display text-xs tracking-[0.2em] text-ink/50">
              PRICES AS PRINTED ON THE CARD
            </span>
          )}
        </div>

        {q ? (
          /* -------- search results -------- */
          searchResults.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {searchResults.map((it, i) => (
                <ItemCard key={it.id} item={it} index={i} onAdd={onAdd} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-ink/20 bg-cream-50 p-10 text-center">
              <BurgerIcon className="mx-auto h-10 w-10 text-ink/25" />
              <p className="mt-3 font-display text-xl text-ink/60">NOTHING ON THE CARD FOR THAT</p>
              <p className="mt-1 text-sm font-bold text-ink/45">Try “tikka”, “zinger”, “wrap” or “wing”.</p>
            </div>
          )
        ) : tab === "deals" ? (
          /* -------- deals board (yellow, like the card) -------- */
          <div className="relative overflow-hidden rounded-2xl border-2 border-ink/10 bg-mustard p-5 shadow-card md:p-9">
            <Watermark text="DEALS DEALS" className="text-leaf-ink" />
            <div className="relative">
              <Reveal>
                <h3 className="font-display text-3xl text-leaf-ink md:text-4xl">
                  SAVE SOME DOUGH WITH OUR <span className="text-tomato">AMAZING DEALS</span>
                </h3>
                <p className="mt-2 max-w-xl text-sm font-extrabold text-leaf-ink/70">
                  Combo boards straight from the menu card — tap any deal to drop the whole combo into your order.
                </p>
              </Reveal>
              <div className="mt-7 grid gap-5 md:grid-cols-2">
                {DEALS.map((d, i) => (
                  <DealCard key={d.id} deal={d} index={i} onAdd={onAddDeal} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* -------- grouped menu board -------- */
          <div key={activeTab.id} className="space-y-11">
            {activeTab.groups.map((group) => (
              <section key={group.title}>
                <Reveal>
                  <Banner group={group} />
                </Reveal>
                <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((it, i) => (
                    <ItemCard key={it.id} item={it} index={i} onAdd={onAdd} />
                  ))}
                </div>
              </section>
            ))}
            {tab === "sides" && <ToppingsStrip />}
          </div>
        )}
      </main>

      <StepsStrip />
      <Footer waHref={waHref} />

      <OrderTray
        lines={lines}
        total={total}
        count={count}
        bump={bump}
        waHref={waHref}
        onRemove={removeLine}
        onClear={clearCart}
      />
    </div>
  );
}