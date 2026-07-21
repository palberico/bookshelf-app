import React, { useState, useMemo } from "react";

/* ------------------------------------------------------------------
   SHELF LAYOUT — all seven bays measured off the straight-on photos.

   bay.width      relative width of the bay
   cell.height    relative height within its bay (each bay normalizes
                  independently, so bays can hold different row counts)
   cell.books     { count, palette, spread, align, flat }
   cell.decor     one object or an array; side: left | mid | right | full
------------------------------------------------------------------- */

const LAYOUT = [
  {
    id: "A",
    width: 750,
    cells: [
      {
        height: 358,
        content: [
          {
            width: 0.33,
            books: {
              align: "left",
              spines: [
                { w: 9, h: 86, color: "#7a2f2c", band: true, bandColor: "#c9a33c" },
                { w: 8, h: 88, color: "#2b3348" },
                { w: 8, h: 84, color: "#8a5a3c", band: true, bandColor: "#c9a33c" },
                { w: 9, h: 90, color: "#d8d4cc", band: true, bandColor: "#c2455a" },
                { w: 8, h: 86, color: "#d98a72" },
                { w: 9, h: 88, color: "#4a3a5a", band: true, bandColor: "#c9a33c" },
                { w: 14, h: 92, color: "#7a7a3c", band: true, bandColor: "#c9a33c" },
              ],
            },
          },
          { width: 0.05 },
          { width: 0.6, decor: { label: "antler", art: "antler" } },
        ],
      },
      {
        height: 337,
        content: [
          {
            width: 0.52,
            books: {
              align: "left",
              spines: [
                { w: 11, h: 88, color: "#1e2740", band: true, bandColor: "#8f2f34" },
                { w: 11, h: 88, color: "#1e2740", band: true, bandColor: "#8f2f34" },
                { w: 12, h: 90, color: "#1a2036", band: true, bandColor: "#c9a33c" },
                { w: 9, h: 86, color: "#c4b58c" },
                { w: 10, h: 90, color: "#4a8a80", band: true, bandColor: "#c9a33c" },
                { w: 10, h: 90, color: "#4a8a80", band: true, bandColor: "#c9a33c" },
                { w: 11, h: 92, color: "#5c2428", band: true, bandColor: "#c9a33c" },
                { w: 13, h: 90, color: "#e8e0cc" },
              ],
            },
          },
          { width: 0.11, decor: { label: "brass apple", art: "goldApple" } },
          { width: 0.1 },
          {
            width: 0.27,
            books: {
              align: "left",
              spines: [
                { w: 12, h: 88, color: "#9aa89c" },
                { w: 8, h: 86, color: "#c2ccbe", band: true, bandColor: "#c9a33c" },
                { w: 12, h: 88, color: "#ece4d2" },
                { w: 8, h: 84, color: "#5c2428" },
              ],
            },
          },
        ],
      },
      {
        height: 305,
        content: [
          { width: 0.52, decor: { label: "pinecones", art: "pinecones" } },
          { width: 0.06 },
          {
            width: 0.42,
            books: {
              align: "left",
              spines: [
                { w: 13, h: 88, color: "#cbbf9e", band: true, bandColor: "#6d2f30" },
                { w: 10, h: 90, color: "#4a8a94", band: true, bandColor: "#e8e0cc" },
                { w: 9, h: 88, color: "#1e3040", band: true, bandColor: "#c9a33c" },
                { w: 10, h: 90, color: "#7a5a3c", band: true, bandColor: "#c9a33c" },
                { w: 8, h: 86, color: "#2f4a3a", band: true, bandColor: "#c9a33c" },
              ],
            },
          },
        ],
      },
      {
        height: 370,
        content: [
          { width: 0.03 },
          {
            width: 0.4,
            books: {
              align: "left",
              spines: [
                { w: 11, h: 88, color: "#3a3a3c", band: true, bandColor: "#c9a33c" },
                { w: 9, h: 86, color: "#6a6a70" },
                { w: 11, h: 92, color: "#2f7a5a" },
                { w: 8, h: 84, color: "#b02a2a" },
                { w: 9, h: 88, color: "#1e2438" },
                { w: 10, h: 86, color: "#7a4a2c", band: true, bandColor: "#c9a33c" },
                { w: 9, h: 88, color: "#141414", band: true, bandColor: "#c9a33c" },
                { w: 8, h: 90, color: "#1a1a1a" },
                { w: 14, h: 94, color: "#1e4a44", band: true, bandColor: "#c9a33c" },
              ],
            },
          },
          { width: 0.02 },
          { width: 0.13, decor: { label: "green ceramic bowl", art: "greenBowl" } },
          { width: 0.1, decor: { label: "jade elephant bookend", art: "elephantBookend" } },
          {
            width: 0.32,
            books: {
              align: "left",
              spines: [
                { w: 12, h: 90, color: "#d9866e", band: true, bandColor: "#1a1a1a" },
                { w: 12, h: 90, color: "#d9866e", band: true, bandColor: "#1a1a1a" },
                { w: 12, h: 90, color: "#d9866e", band: true, bandColor: "#1a1a1a" },
                { w: 8, h: 84, color: "#a8a89a", band: true, bandColor: "#1a1a1a" },
                { w: 7, h: 82, color: "#d98a72", band: true, bandColor: "#1a1a1a" },
                { w: 8, h: 84, color: "#3f7a7a", band: true, bandColor: "#1a1a1a" },
                { w: 8, h: 82, color: "#b8b0a0", band: true, bandColor: "#1a1a1a" },
                { w: 8, h: 84, color: "#9a9a94", band: true, bandColor: "#6a3f8a" },
                { w: 8, h: 86, color: "#4a4a4c" },
              ],
            },
          },
        ],
      },
      {
        height: 330,
        content: [
          { width: 0.066 },
          { width: 0.425, decor: { label: "digital clock frame", art: "digitalClockFrame" } },
          { width: 0.051 },
          { width: 0.141, decor: { label: "carved bowl", art: "carvedBowl" } },
          { width: 0.103 },
          {
            width: 0.214,
            books: {
              count: 6,
              palette: "collectorsNavy",
              align: "fill",
              wMin: 7,
              wRange: 3,
              hMin: 82,
              hRange: 8,
              bandColor: "#c9a33c",
            },
          },
        ],
      },
    ],
  },
  {
    id: "B",
    width: 360,
    cells: [
      { height: 358, books: { count: 8, palette: "zaneGrey", spread: 0.82, align: "left" } },
      {
        height: 337,
        content: [
          {
            width: 0.45,
            books: {
              align: "left",
              spines: [
                { w: 13, h: 92, color: "#5f8290" },
                { w: 9.5, h: 88, color: "#1e4436", band: true, bandColor: "#c9a33c" },
                { w: 10.5, h: 90, color: "#1e4436", band: true, bandColor: "#c9a33c" },
              ],
            },
          },
          { width: 0.365, decor: { label: "green vase", art: "greenVase" } },
        ],
      },
      { height: 305, decor: { side: "full", label: "marble clock", art: "marbleClock" } },
      {
        height: 370,
        content: [
          {
            width: 0.56,
            books: {
              count: 7,
              palette: "b4antique",
              align: "fill",
              wMin: 7,
              wRange: 6,
              hMin: 80,
              hRange: 16,
            },
          },
          { width: 0.21, decor: { label: "jade elephant bookend", art: "elephantBookend" } },
        ],
      },
      { height: 330, books: { count: 14, palette: "classics", spread: 1, align: "fill" } },
    ],
  },
  {
    id: "C",
    width: 400,
    cells: [
      { height: 845, decor: { side: "full", label: "branches in vase", art: "branchVase" } },
      { height: 155, books: { count: 0, palette: "picture", spread: 0.8, align: "left", flat: 0 } },
      {
        height: 370,
        content: [
          {
            width: 0.647,
            books: {
              align: "left",
              spines: [
                { w: 10, h: 88, color: "#1e4436", band: true, bandColor: "#c9a33c" },
                { w: 12, h: 94, color: "#4a4f52" },
                { w: 9, h: 90, color: "#b02a26", band: true, bandColor: "#c9a33c" },
                { w: 7, h: 88, color: "#2a2e32" },
                { w: 9, h: 92, color: "#7a2f44" },
                { w: 10, h: 90, color: "#1e2438", band: true, bandColor: "#c9a33c" },
              ],
            },
          },
          { width: 0.02 },
          { width: 0.26, decor: { label: "stone curios", art: "stoneCurios" } },
        ],
      },
      { height: 330, books: { count: 16, palette: "paperback", spread: 1, align: "fill" } },
    ],
  },
  {
    id: "D",
    width: 370,
    cells: [
      {
        height: 358,
        decor: { side: "full", label: "painting, candlesticks", art: "paintingCandlesticks" },
      },
      {
        height: 337,
        books: {
          count: 3,
          palette: "blackLeather",
          spread: 0.28,
          align: "fill",
          wMin: 9,
          wRange: 2.5,
          hMin: 86,
          hRange: 5,
        },
        decor: [
          { side: "left", width: 0.3, label: "agate slice", art: "agateSlice" },
          { side: "right", width: 0.3, label: "agate slice", art: "agateSlice" },
        ],
      },
      { height: 305, decor: { side: "full", label: "framed print", art: "framedPrint" } },
      { height: 370, books: { count: 16, palette: "leather", spread: 1, align: "fill" } },
      { height: 330, books: { count: 14, palette: "ya", spread: 1, align: "fill" } },
    ],
  },
  {
    id: "E",
    width: 390,
    cells: [
      {
        height: 845,
        decor: { side: "full", label: "willow branches, marble vase", art: "willowVase" },
      },
      {
        height: 155,
        books: { count: 0, palette: "picture", spread: 0.8, align: "left", flat: 4 },
      },
      { height: 370, books: { count: 14, palette: "modern", spread: 1, align: "fill" } },
      {
        height: 330,
        content: [
          { width: 0.15 },
          { width: 0.37, decor: { label: "paper box", art: "paperBox" } },
          { width: 0.03 },
          {
            width: 0.42,
            books: {
              count: 7,
              palette: "e4mix",
              align: "fill",
              wMin: 6,
              wRange: 5,
              hMin: 82,
              hRange: 10,
            },
          },
        ],
      },
    ],
  },
  {
    id: "F",
    width: 370,
    cells: [
      { height: 360, books: { count: 22, palette: "christie", spread: 1, align: "fill" } },
      { height: 320, books: { count: 22, palette: "christie", spread: 1, align: "fill" } },
      { height: 320, books: { count: 20, palette: "paperback", spread: 1, align: "fill" } },
      { height: 370, books: { count: 22, palette: "bright", spread: 1, align: "fill" } },
      {
        height: 330,
        books: { count: 20, palette: "bright", spread: 0.9, align: "left" },
        decor: { side: "right", width: 0.1, label: "egg" },
      },
    ],
  },
  {
    id: "G",
    width: 780,
    cells: [
      {
        height: 360,
        books: { count: 12, palette: "fantasy", spread: 0.55, align: "right" },
        decor: { side: "left", width: 0.45, label: "fern, clock", art: "pottedFern" },
      },
      {
        height: 320,
        books: { count: 10, palette: "deep", spread: 0.42, align: "left" },
        decor: { side: "right", width: 0.55, label: "flag case", art: "flagCase" },
      },
      {
        height: 320,
        content: [
          {
            width: 0.23,
            books: {
              count: 8,
              palette: "christieHard",
              align: "fill",
              wMin: 7,
              wRange: 2,
              hMin: 88,
              hRange: 5,
            },
          },
          { width: 0.147, decor: { label: "detective book nook", art: "bookNookDetective" } },
          {
            width: 0.242,
            books: {
              count: 7,
              palette: "christieHard",
              align: "fill",
              wMin: 7,
              wRange: 2,
              hMin: 88,
              hRange: 5,
            },
          },
          {
            width: 0.06,
            books: {
              count: 1,
              palette: "franklinRed",
              align: "fill",
              wMin: 10,
              wRange: 1,
              hMin: 86,
              hRange: 2,
            },
          },
          { width: 0.132, decor: { label: "rose dome", art: "roseDome" } },
          {
            width: 0.189,
            books: {
              count: 4,
              palette: "christieMixed",
              align: "fill",
              wMin: 8,
              wRange: 3,
              hMin: 80,
              hRange: 12,
            },
          },
        ],
      },
      {
        height: 370,
        content: [
          { width: 0.05 },
          { width: 0.122, decor: { label: "museum book nook", art: "bookNookMuseum" } },
          {
            width: 0.523,
            books: {
              align: "left",
              spines: [
                { w: 8, h: 92, color: "#eeeeec" },
                { w: 9, h: 92, color: "#c9a882" },
                { w: 7, h: 92, color: "#2a3a6a" },
                { w: 9, h: 92, color: "#c99a2c" },
                { w: 8, h: 92, color: "#4aa0a8" },
                { w: 12, h: 94, color: "#141414" },
                { w: 10, h: 92, color: "#f4f4f2" },
                { w: 5, h: 84, color: "#e0d4b8" },
                { w: 6, h: 82, color: "#1a1a1a" },
                { w: 10, h: 90, color: "#e8c4b8" },
                { w: 7, h: 78, color: "#2a4a4a" },
                { w: 7, h: 74, color: "#c9a02c" },
                { w: 8, h: 80, color: "#e8e4d4" },
                { w: 8, h: 76, color: "#f0ece0" },
                { w: 8, h: 78, color: "#1a1a1a" },
                { w: 6, h: 70, color: "#141414" },
                { w: 6, h: 66, color: "#1e3a6a" },
                { w: 4, h: 64, color: "#f0f0ee" },
                { w: 3, h: 60, color: "#1a1a1a" },
              ],
            },
          },
          { width: 0.048 },
          { width: 0.192, decor: { label: "cuckoo clock", art: "cuckooClock" } },
        ],
      },
      {
        height: 330,
        content: [
          { width: 0.2, decor: { label: "oil lamp", art: "oilLamp" } },
          { width: 0.053 },
          {
            width: 0.347,
            books: { count: 0, flat: 5, palette: "bright" },
          },
          {
            width: 0.4,
            books: {
              count: 12,
              palette: "fantasy",
              align: "fill",
              wMin: 6,
              wRange: 4,
              hMin: 80,
              hRange: 12,
            },
          },
        ],
      },
    ],
  },
];

/* Spine colors sampled off the photos. */
const PALETTES = {
  vintage: ["#7c3f33", "#2b3348", "#c9c3b4", "#8a5a3c", "#b06a55", "#6b4a2f"],
  classics: ["#1f2736", "#243044", "#2f6a63", "#d8d2c0", "#8a3a30", "#3c5a52", "#c46a52"],
  antique: ["#7a4038", "#8a5b3f", "#6d3a30", "#a67352", "#5c3a2c", "#93604a"],
  leather: ["#8f2f2f", "#6d1f22", "#1d2436", "#2a2a2a", "#a33a33", "#123024"],
  zaneGrey: ["#2f4a7a", "#d9c9a4", "#2f4a7a", "#d9c9a4", "#c9b58c", "#3a5488"],
  greenSet: ["#1e4436", "#1e4436", "#26523f", "#2f6a5a", "#3f7f6a"],
  deep: ["#1a1a1a", "#22242a", "#2b2b2b", "#141414", "#3a1a1a"],
  paperback: ["#c94a3a", "#3f7fa5", "#e2dcc8", "#7d8a5a", "#b5723c", "#5d5f78", "#a9b3bd"],
  ya: ["#2f7fc4", "#1b2a44", "#c9c2b2", "#7a3f6a", "#d9d3c4", "#3f4f6a", "#b5476b"],
  christie: ["#e0d8bc", "#d6cfae", "#c9bfa0", "#e8e2cc", "#b9ad8c", "#cbb9a8", "#d9c6b0"],
  christieHard: ["#151515", "#1c1c1c", "#101010", "#232323", "#8f2f2f", "#191919"],
  modern: ["#e6e0d2", "#6a7f8a", "#8a6a7f", "#c4b89c", "#3f4a5a", "#a89a7c", "#d4cdbc"],
  bright: ["#d4a03c", "#3f8a7a", "#c94a4a", "#4a6fb5", "#e2dcc8", "#7a4a86", "#5a9a4a"],
  fantasy: ["#1b2a44", "#6d1f3a", "#2f6a4a", "#c9a33c", "#3a2a5a", "#8a2f2f", "#d8d2c0"],
  nonfiction: ["#e8e4da", "#2f5f9a", "#c9c2b2", "#3a3a3a", "#c4783c", "#5a6a7a", "#d9d3c4"],
  picture: ["#c94a3a", "#e2dcc8", "#3f7fa5", "#d4a03c"],
  blackLeather: ["#131313", "#1a1a1a", "#0e0e0e"],
  franklinRed: ["#7d1f24"],
  christieMixed: ["#151515", "#8f2f2f", "#cbbf9e", "#1c1c1c"],
  e4mix: ["#e8e0cc", "#8f2f34", "#141414", "#2a2a2a", "#cbbf9e", "#3a2a28"],
  b4antique: ["#6d2f30", "#3a2f3a", "#7a5a3f", "#5c3a2c", "#8a3a34", "#4a3028", "#93604a"],
  collectorsNavy: ["#18202f", "#131313", "#1c2438", "#101018", "#1a1a24"],
};

/* Deterministic pseudo-random so spines stay put across renders. */
function seeded(seed) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function useSpines(cellId, books) {
  return useMemo(() => {
    const {
      count = 0,
      palette = "classics",
      flat = 0,
      wMin = 5,
      wRange = 8,
      hMin = 62,
      hRange = 34,
      hSlope = 0,
      bandColor,
      spines,
    } = books || {};
    const rand = seeded(cellId);
    const colors = PALETTES[palette] || PALETTES.classics;

    const upright = Array.isArray(spines)
      ? spines.map((s, i) => ({
          w: s.w,
          h: s.h,
          color: s.color,
          tilt: s.tilt || 0,
          band: Boolean(s.band),
          bandColor: s.bandColor,
          key: `${cellId}-e${i}`,
        }))
      : Array.from({ length: count }, (_, i) => ({
          w: wMin + rand() * wRange,
          h: hMin + rand() * hRange + (count > 1 ? (hSlope * i) / (count - 1) : 0),
          color: colors[Math.floor(rand() * colors.length)],
          tilt: rand() > 0.94 ? (rand() > 0.5 ? 5 : -5) : 0,
          band: rand() > 0.7,
          bandColor,
          key: `${cellId}-s${i}`,
        }));

    const stacked = Array.from({ length: flat }, (_, i) => ({
      color: colors[Math.floor(rand() * colors.length)],
      inset: rand() * 5,
      key: `${cellId}-f${i}`,
    }));
    return { upright, stacked };
  }, [cellId, books]);
}

function SpineRun({ spines, justify }) {
  const total = spines.reduce((sum, s) => sum + s.w, 0) || 1;
  return (
    <div className="vb-spines" style={{ justifyContent: justify }}>
      {spines.map((s) => (
        <div
          key={s.key}
          className="vb-spine"
          style={{
            width: `${(s.w / total) * 100}%`,
            height: `${s.h}%`,
            background: s.color,
            transform: s.tilt ? `rotate(${s.tilt}deg)` : undefined,
          }}
        >
          {s.band && (
            <span className="vb-band" style={s.bandColor ? { background: s.bandColor } : undefined} />
          )}
        </div>
      ))}
    </div>
  );
}

function Stack({ items, grow }) {
  if (!items.length) return null;
  return (
    <div
      className="vb-stack"
      style={{ flex: grow ? "1 1 auto" : "0 0 auto", marginLeft: grow ? 0 : undefined }}
    >
      {items.map((f) => (
        <div
          key={f.key}
          className="vb-flat"
          style={{ background: f.color, marginRight: `${f.inset}px` }}
        />
      ))}
    </div>
  );
}

/* --- artwork for decor cells --- */

function BranchVase() {
  const stems = [
    { d: "M50,151 C44,126 33,104 21,63", w: 1.15 },
    { d: "M50,151 C46,124 40,100 30,49", w: 1.0 },
    { d: "M50,151 C48,122 45,92 39,43", w: 1.25 },
    { d: "M50,151 C50,120 49,86 47,39", w: 1.0 },
    { d: "M50,151 C52,122 54,90 55,45", w: 1.1 },
    { d: "M50,151 C54,124 59,100 63,51", w: 0.95 },
    { d: "M50,151 C56,126 63,106 71,61", w: 1.15 },
    { d: "M50,151 C57,128 67,112 79,79", w: 0.9 },
    { d: "M50,151 C45,130 36,116 26,91", w: 0.85 },
    { d: "M50,151 C55,131 65,119 76,97", w: 0.85 },
    { d: "M50,151 C47,127 42,106 34,71", w: 0.9 },
    { d: "M50,151 C51,125 53,104 58,67", w: 0.8 },
    { d: "M50,151 C53,133 60,124 68,110", w: 0.7 },
    { d: "M50,151 C46,134 40,125 32,112", w: 0.7 },
  ];

  const twigs = [
    { d: "M39,88 C36,82 33,79 30,75", w: 0.6 },
    { d: "M44,79 C46,73 49,70 51,66", w: 0.6 },
    { d: "M56,86 C58,80 61,77 64,73", w: 0.6 },
    { d: "M34,105 C31,100 28,98 25,95", w: 0.55 },
    { d: "M63,96 C66,91 69,89 72,86", w: 0.55 },
    { d: "M48,64 C46,59 44,56 42,52", w: 0.55 },
    { d: "M55,72 C57,67 60,65 62,62", w: 0.55 },
  ];

  const buds = [
    { x: 21, y: 62, r: -22 },
    { x: 30, y: 48, r: -14 },
    { x: 39, y: 42, r: -8 },
    { x: 47, y: 38, r: 0 },
    { x: 55, y: 44, r: 8 },
    { x: 63, y: 50, r: 14 },
    { x: 71, y: 60, r: 22 },
    { x: 79, y: 78, r: 30 },
    { x: 26, y: 90, r: -28 },
    { x: 76, y: 96, r: 28 },
    { x: 34, y: 70, r: -18 },
    { x: 58, y: 66, r: 12 },
    { x: 30, y: 74, r: -20 },
    { x: 51, y: 65, r: 4 },
    { x: 64, y: 72, r: 18 },
    { x: 42, y: 51, r: -6 },
    { x: 72, y: 85, r: 26 },
    { x: 25, y: 94, r: -30 },
  ];

  return (
    <svg
      viewBox="0 0 100 200"
      preserveAspectRatio="xMidYMax meet"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Budded branches in a wire-wrapped vase"
    >
      <defs>
        <linearGradient id="vbVaseBody" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4a382e" />
          <stop offset="16%" stopColor="#7a6150" />
          <stop offset="38%" stopColor="#a2856c" />
          <stop offset="58%" stopColor="#8a6c56" />
          <stop offset="82%" stopColor="#5c4638" />
          <stop offset="100%" stopColor="#3f2f26" />
        </linearGradient>
        <linearGradient id="vbVaseShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c9ab8c" stopOpacity="0.55" />
          <stop offset="30%" stopColor="#c9ab8c" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#241a14" stopOpacity="0.45" />
        </linearGradient>
      </defs>

      <g stroke="#463830" fill="none" strokeLinecap="round">
        {stems.map((s, i) => (
          <path key={`stem${i}`} d={s.d} strokeWidth={s.w} />
        ))}
        {twigs.map((t, i) => (
          <path key={`twig${i}`} d={t.d} strokeWidth={t.w} />
        ))}
      </g>

      <g fill="#9aa48d">
        {buds.map((b, i) => (
          <ellipse
            key={`bud${i}`}
            cx={b.x}
            cy={b.y}
            rx="1.1"
            ry="2.4"
            transform={`rotate(${b.r} ${b.x} ${b.y})`}
          />
        ))}
      </g>

      {/* vase */}
      <path
        d="M34.5,150 C33.6,166 34.8,182 41.2,192.4 C44.2,197.2 55.8,197.2 58.8,192.4 C65.2,182 66.4,166 65.5,150 Z"
        fill="url(#vbVaseBody)"
      />
      <path
        d="M34.5,150 C33.6,166 34.8,182 41.2,192.4 C44.2,197.2 55.8,197.2 58.8,192.4 C65.2,182 66.4,166 65.5,150 Z"
        fill="url(#vbVaseShade)"
      />
      <ellipse cx="50" cy="150" rx="15.5" ry="2.6" fill="#2e231c" />
      <ellipse cx="50" cy="150" rx="12.8" ry="1.7" fill="#1b1410" />

      {/* wire wrap */}
      <g stroke="#241d18" fill="none" strokeWidth="0.55" strokeLinecap="round">
        <path d="M35.4,162 C42,160.4 50,163.4 57,161.4 C61,160.2 63.6,161.6 65,162.6" />
        <path d="M35.6,165.4 C43,167.2 51,164.2 58,166.4 C61.4,167.4 63.8,166.4 65.2,165.6" />
        <path d="M36,169 C43.4,167.2 51.6,170.4 58.6,168.4 C61.6,167.6 63.6,168.6 64.9,169.6" />
        <path d="M36.4,172.6 C44,174.4 52,171.4 59,173.6 C61.8,174.4 63.4,173.6 64.6,172.8" />
        <path d="M37,176.2 C44.6,174.4 52.6,177.6 59.4,175.6 C61.8,174.9 63.2,175.8 64.2,176.8" />
        <path d="M37.6,179.8 C45,181.6 53,178.6 59.8,180.8 C61.8,181.5 62.9,180.8 63.8,180" />
        <path d="M38.4,183.4 C45.6,181.6 53.4,184.8 60,182.8 C61.6,182.2 62.4,183 63.1,183.8" />
      </g>

      {/* shadow on the shelf */}
      <ellipse cx="50" cy="196.6" rx="12" ry="1.6" fill="#000" opacity="0.13" />
    </svg>
  );
}

function candlestick(c, top, base) {
  const h = base - top;
  const y = (f) => top + h * f;
  return [
    `M${c - 4.1},${base}`,
    `L${c - 3.7},${y(0.965)}`,
    `C${c - 1.5},${y(0.94)} ${c - 1.25},${y(0.9)} ${c - 1.25},${y(0.875)}`,
    `C${c - 1.25},${y(0.83)} ${c - 3.5},${y(0.8)} ${c - 3.5},${y(0.755)}`,
    `C${c - 3.5},${y(0.7)} ${c - 1.05},${y(0.675)} ${c - 1},${y(0.635)}`,
    `L${c - 0.95},${y(0.47)}`,
    `C${c - 0.95},${y(0.43)} ${c - 2.7},${y(0.4)} ${c - 2.7},${y(0.35)}`,
    `C${c - 2.7},${y(0.3)} ${c - 1},${y(0.275)} ${c - 0.95},${y(0.24)}`,
    `L${c - 0.95},${y(0.2)}`,
    `C${c - 0.95},${y(0.17)} ${c - 2.8},${y(0.155)} ${c - 2.9},${y(0.115)}`,
    `L${c - 3},${y(0)}`,
    `L${c + 3},${y(0)}`,
    `L${c + 2.9},${y(0.115)}`,
    `C${c + 2.8},${y(0.155)} ${c + 0.95},${y(0.17)} ${c + 0.95},${y(0.2)}`,
    `L${c + 0.95},${y(0.24)}`,
    `C${c + 1},${y(0.275)} ${c + 2.7},${y(0.3)} ${c + 2.7},${y(0.35)}`,
    `C${c + 2.7},${y(0.4)} ${c + 0.95},${y(0.43)} ${c + 0.95},${y(0.47)}`,
    `L${c + 1},${y(0.635)}`,
    `C${c + 1.05},${y(0.675)} ${c + 3.5},${y(0.7)} ${c + 3.5},${y(0.755)}`,
    `C${c + 3.5},${y(0.8)} ${c + 1.25},${y(0.83)} ${c + 1.25},${y(0.875)}`,
    `C${c + 1.25},${y(0.9)} ${c + 1.5},${y(0.94)} ${c + 3.7},${y(0.965)}`,
    `L${c + 4.1},${base}`,
    "Z",
  ].join(" ");
}

function PaintingCandlesticks() {
  const cs = [24, 47];
  return (
    <svg
      viewBox="0 0 100 96"
      preserveAspectRatio="xMidYMax meet"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Sunset landscape painting with two green glass candlesticks"
    >
      <defs>
        <clipPath id="vbCanvasClip">
          <rect x="2" y="48" width="64" height="47" />
        </clipPath>
        <linearGradient id="vbGlass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8fa88c" />
          <stop offset="22%" stopColor="#d7e6d2" />
          <stop offset="52%" stopColor="#aac2a5" />
          <stop offset="78%" stopColor="#cfe0ca" />
          <stop offset="100%" stopColor="#7d9679" />
        </linearGradient>
      </defs>

      {/* canvas */}
      <g transform="translate(16 0)">
      <g clipPath="url(#vbCanvasClip)">
        <rect x="2" y="48" width="64" height="47" fill="#e8dcc4" />
        <rect x="2" y="48" width="64" height="9" fill="#b8451f" />
        <rect x="2" y="53" width="64" height="7" fill="#d46a24" />
        <rect x="2" y="58" width="64" height="6" fill="#efa93c" />
        <rect x="2" y="62" width="64" height="4" fill="#f7cd6a" />
        <path d="M2,57 C14,54.6 26,58 38,55.6 C50,53.4 58,56.4 66,54.6 L66,49 L2,49 Z" fill="#a83a1c" opacity="0.75" />
        <path d="M2,61.4 C13,59.6 24,62.4 35,60.6 C47,58.8 57,61.4 66,59.8 L66,56 L2,56 Z" fill="#e78a2c" opacity="0.6" />
        <path d="M2,66.5 C12,64.2 22,67.4 33,65.4 C45,63.2 56,66.2 66,64.4 L66,62 L2,62 Z" fill="#f4c05c" opacity="0.55" />
        {/* ridge */}
        <path d="M2,72 L11,67.6 L19,70.4 L27,66.6 L36,70.2 L45,66.8 L54,70.4 L66,67.4 L66,79 L2,79 Z" fill="#1d3128" />
        <path d="M2,74.6 L13,71 L23,73.6 L33,70.4 L44,73.6 L55,70.8 L66,73 L66,79 L2,79 Z" fill="#132119" />
        {/* water */}
        <rect x="2" y="79" width="64" height="12" fill="#2b6273" />
        <rect x="2" y="79" width="64" height="3" fill="#3f8496" opacity="0.8" />
        <path d="M4,83.4 L26,83.4 M32,84.6 L52,84.6 M8,87 L30,87 M38,88.2 L60,88.2 M14,90 L34,90" stroke="#cfe4e6" strokeWidth="0.7" opacity="0.55" />
        <rect x="2" y="90" width="64" height="5" fill="#16261f" />
      </g>
      <rect x="2" y="48" width="64" height="47" fill="none" stroke="#00000022" strokeWidth="0.5" />
      <rect x="63.5" y="48" width="2.5" height="47" fill="#00000018" />

      {/* candlesticks */}
      {cs.map((c) => (
        <g key={c}>
          <path d={candlestick(c, 45.5, 95)} fill="url(#vbGlass)" opacity="0.92" />
          <ellipse cx={c} cy="45.6" rx="3" ry="0.75" fill="#e6f0e2" opacity="0.9" />
          <ellipse cx={c} cy="45.6" rx="1.9" ry="0.4" fill="#7d9679" opacity="0.7" />
          <path
            d={`M${c - 1.5},47 L${c - 1.5},52 M${c + 1.6},47.5 L${c + 1.6},51`}
            stroke="#f2f8ef"
            strokeWidth="0.5"
            opacity="0.7"
          />
          <ellipse cx={c} cy="94.8" rx="4.4" ry="0.9" fill="#000" opacity="0.12" />
        </g>
      ))}
      </g>
    </svg>
  );
}

function AgateSlice() {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMax meet"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Polished agate slice"
    >
      <defs>
        <radialGradient id="vbAgate" cx="0.45" cy="0.4" r="0.62">
          <stop offset="0%" stopColor="#f6f3ea" />
          <stop offset="52%" stopColor="#ded7c7" />
          <stop offset="100%" stopColor="#bdae95" />
        </radialGradient>
        <clipPath id="vbAgateClip">
          <path d="M50,3 C75,3 97,24 97,50 C97,77 74,97 49,97 C25,97 3,77 3,50 C3,24 25,3 50,3 Z" />
        </clipPath>
      </defs>

      <path
        d="M50,3 C75,3 97,24 97,50 C97,77 74,97 49,97 C25,97 3,77 3,50 C3,24 25,3 50,3 Z"
        fill="url(#vbAgate)"
      />

      <g clipPath="url(#vbAgateClip)">
        <path
          d="M6,66 C18,60 26,72 38,70 C30,84 16,92 6,88 Z"
          fill="#33513c"
          opacity="0.88"
        />
        <path d="M12,70 C20,67 25,74 31,73 C26,81 18,85 12,82 Z" fill="#20372a" opacity="0.7" />
        <path
          d="M62,58 C74,52 86,58 92,70 C82,80 68,78 60,70 Z"
          fill="#35543e"
          opacity="0.82"
        />
        <path d="M70,62 C78,59 85,63 88,70 C81,75 72,73 68,68 Z" fill="#22392c" opacity="0.65" />
        <path d="M40,10 C50,6 60,10 64,18 C54,22 44,20 38,16 Z" fill="#3a5a42" opacity="0.45" />
        <ellipse cx="46" cy="42" rx="20" ry="16" fill="#fbf9f2" opacity="0.75" />
        <ellipse cx="46" cy="42" rx="12" ry="9" fill="#ffffff" opacity="0.7" />
      </g>

      <path
        d="M50,3 C75,3 97,24 97,50 C97,77 74,97 49,97 C25,97 3,77 3,50 C3,24 25,3 50,3 Z"
        fill="none"
        stroke="#8f7f66"
        strokeWidth="2.4"
        opacity="0.75"
      />
      <ellipse cx="50" cy="97.5" rx="26" ry="2" fill="#000" opacity="0.12" />
    </svg>
  );
}

function FramedPrint() {
  return (
    <svg
      viewBox="0 0 100 92"
      preserveAspectRatio="xMidYMax meet"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Small abstract print in a deep white frame"
    >
      <defs>
        <linearGradient id="vbFrameFace" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="#f4f2ee" />
          <stop offset="100%" stopColor="#e3dfd8" />
        </linearGradient>
      </defs>

      {/* outer frame */}
      <rect x="4" y="4" width="84" height="86" fill="url(#vbFrameFace)" />
      <rect x="4" y="4" width="84" height="86" fill="none" stroke="#d9d4cb" strokeWidth="0.7" />

      {/* frame depth on the right */}
      <path d="M88,4 L95,9 L95,90 L88,90 Z" fill="#e7e3db" />
      <path d="M88,4 L95,9 L95,12 L88,7 Z" fill="#f2efe9" />

      {/* recessed opening */}
      <rect x="17" y="17" width="58" height="60" fill="#fbfaf7" />
      <rect x="17" y="17" width="58" height="60" fill="none" stroke="#dcd7ce" strokeWidth="0.6" />
      <path d="M17,17 L21,21 L21,73 L17,77 Z" fill="#eeeae3" />
      <path d="M17,17 L21,21 L71,21 L75,17 Z" fill="#e9e5de" />

      {/* the print */}
      <rect x="30" y="30" width="32" height="30" fill="#d8bd97" />
      <path d="M30,52 C38,49 46,53 54,50 C58,48.6 60,49.4 62,50.4 L62,60 L30,60 Z" fill="#c9a87e" />
      <path d="M44,32 L52,44 L46,58 L38,50 Z" fill="#2f2a2c" />
      <path d="M44,32 L52,44 L47,45 L42,36 Z" fill="#4a4245" />
      <ellipse cx="36" cy="43" rx="4.2" ry="5.4" fill="#f2ece0" />
      <path d="M46,54 C50,52 54,54 54,57 C54,59.4 50,60 47,59 Z" fill="#7c2438" />
      <path d="M30,30 L62,30 L62,32 L30,32 Z" fill="#c5a37a" />
      <rect x="30" y="30" width="32" height="30" fill="none" stroke="#00000018" strokeWidth="0.5" />

      <ellipse cx="49" cy="90.6" rx="40" ry="1.4" fill="#000" opacity="0.1" />
    </svg>
  );
}

function frondLeaflets(o, c, e, n) {
  const out = [];
  for (let i = 1; i <= n; i++) {
    const t = i / (n + 1);
    const mt = 1 - t;
    const x = mt * mt * o[0] + 2 * mt * t * c[0] + t * t * e[0];
    const y = mt * mt * o[1] + 2 * mt * t * c[1] + t * t * e[1];
    const dx = 2 * mt * (c[0] - o[0]) + 2 * t * (e[0] - c[0]);
    const dy = 2 * mt * (c[1] - o[1]) + 2 * t * (e[1] - c[1]);
    const len = Math.hypot(dx, dy) || 1;
    const px = -dy / len;
    const py = dx / len;
    const ang = (Math.atan2(dy, dx) * 180) / Math.PI;
    const s = Math.max(0.32, 1 - Math.abs(t - 0.42) * 1.25);
    out.push({ x: x + px * 1.5 * s, y: y + py * 1.5 * s, ang: ang + 52, s });
    out.push({ x: x - px * 1.5 * s, y: y - py * 1.5 * s, ang: ang - 52, s });
  }
  return out;
}

function PottedFern() {
  const O = [56, 62];
  const fronds = [
    { c: [32, 50], e: [7, 43] },
    { c: [35, 37], e: [15, 24] },
    { c: [45, 27], e: [31, 10] },
    { c: [52, 23], e: [49, 5] },
    { c: [61, 24], e: [67, 8] },
    { c: [70, 30], e: [85, 15] },
    { c: [76, 42], e: [95, 33] },
    { c: [74, 54], e: [96, 51] },
    { c: [40, 57], e: [11, 58] },
    { c: [67, 57], e: [92, 59] },
    { c: [49, 33], e: [39, 16] },
    { c: [63, 32], e: [76, 13] },
  ];
  const greens = ["#4f8a3e", "#5f9c4a", "#427a34", "#69a852"];

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMax meet"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Potted fern and a small square timer"
    >
      <ellipse cx="56" cy="96.4" rx="20" ry="1.8" fill="#000" opacity="0.12" />
      <ellipse cx="20" cy="96.4" rx="13" ry="1.4" fill="#000" opacity="0.1" />

      {/* fronds */}
      <g>
        {fronds.map((f, fi) => (
          <g key={`f${fi}`}>
            <path
              d={`M${O[0]},${O[1]} Q${f.c[0]},${f.c[1]} ${f.e[0]},${f.e[1]}`}
              fill="none"
              stroke="#3f6f31"
              strokeWidth="0.85"
              strokeLinecap="round"
            />
            {frondLeaflets(O, f.c, f.e, 11).map((l, li) => (
              <ellipse
                key={`l${fi}-${li}`}
                cx={l.x}
                cy={l.y}
                rx={2.1 * l.s}
                ry={0.85 * l.s}
                fill={greens[(fi + li) % greens.length]}
                transform={`rotate(${l.ang} ${l.x} ${l.y})`}
              />
            ))}
          </g>
        ))}
      </g>

      {/* pot */}
      <path
        d="M39,63 L43.5,93 C44,95.4 46,96.4 50,96.4 L62,96.4 C66,96.4 68,95.4 68.5,93 L73,63 Z"
        fill="#7cc2c8"
      />
      <g stroke="#67b0b7" strokeWidth="0.9" opacity="0.85">
        {[43, 46.5, 50, 53.5, 57, 60.5, 64, 67.5].map((x, i) => (
          <path key={`rib${i}`} d={`M${x},64.5 L${x + (56 - x) * 0.06},94.5`} />
        ))}
      </g>
      <path
        d="M39,63 L43.5,93 C44,95.4 46,96.4 50,96.4 L54,96.4 L50,63 Z"
        fill="#ffffff"
        opacity="0.16"
      />
      <path
        d="M66,63 L62,96.4 C66,96.4 68,95.4 68.5,93 L73,63 Z"
        fill="#000000"
        opacity="0.12"
      />
      <ellipse cx="56" cy="63" rx="17" ry="2.8" fill="#6fb6bd" />
      <ellipse cx="56" cy="63.2" rx="14.4" ry="2.1" fill="#2f4a3a" />

      {/* timer */}
      <rect x="8" y="74" width="24" height="22.4" rx="4.2" fill="#f6f5f2" />
      <rect
        x="8"
        y="74"
        width="24"
        height="22.4"
        rx="4.2"
        fill="none"
        stroke="#d8d5cf"
        strokeWidth="0.7"
      />
      <circle cx="20" cy="85.2" r="8.6" fill="#4c5154" />
      <circle cx="20" cy="85.2" r="8.6" fill="none" stroke="#3a3e41" strokeWidth="0.6" />
      <path d="M20,85.2 L28.4,83.4 L20,86.6 Z" fill="#e8722c" />
      <circle cx="20" cy="85.2" r="1.1" fill="#e8722c" />
      <circle cx="16.4" cy="90.4" r="0.9" fill="#cfd3d4" />
    </svg>
  );
}

function star(cx, cy, r) {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const rr = i % 2 === 0 ? r : r * 0.42;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    pts.push(`${(cx + rr * Math.cos(a)).toFixed(2)},${(cy + rr * Math.sin(a)).toFixed(2)}`);
  }
  return `M${pts.join(" L")} Z`;
}

function FlagCase() {
  const stars = [
    [50, 21, 3.1],
    [37.5, 31, 3.5],
    [62.5, 31, 3.5],
    [27, 41, 3.7],
    [50, 41, 3.7],
    [73, 41, 3.7],
    [21, 50.5, 3.3],
    [40, 50.5, 3.3],
    [60, 50.5, 3.3],
    [79, 50.5, 3.3],
  ];

  return (
    <svg
      viewBox="0 0 100 78"
      preserveAspectRatio="xMidYMax meet"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Folded flag in a triangular display case"
    >
      <defs>
        <clipPath id="vbFlagClip">
          <path d="M50,13 L86,56 L14,56 Z" />
        </clipPath>
      </defs>

      <ellipse cx="50" cy="76.6" rx="46" ry="1.6" fill="#000" opacity="0.14" />

      {/* case frame */}
      <path d="M50,3 L95,58 L5,58 Z" fill="#191a1c" />
      <path d="M50,5.6 L91,57 L9,57 Z" fill="#101113" />
      <path d="M50,3 L95,58 L91.5,58 L50,7.4 Z" fill="#2c2e31" opacity="0.8" />

      {/* folded flag */}
      <path d="M50,13 L86,56 L14,56 Z" fill="#1d2c4e" />
      <g clipPath="url(#vbFlagClip)">
        <path d="M50,13 L86,56 L74,56 L44,13 Z" fill="#233457" opacity="0.75" />
        <path d="M50,13 L26,56 L14,56 L38,13 Z" fill="#16233f" opacity="0.6" />
        <path d="M20,56 L52,13 L54,13 L23,56 Z" fill="#2b3d63" opacity="0.5" />
        <path d="M62,56 L36,13 L38,13 L65,56 Z" fill="#2b3d63" opacity="0.4" />
        <g fill="#f2f3f0">
          {stars.map(([x, y, r], i) => (
            <path key={`st${i}`} d={star(x, y, r)} />
          ))}
        </g>
        {/* glass reflection */}
        <path d="M14,56 L46,13 L58,13 L26,56 Z" fill="#ffffff" opacity="0.06" />
        <path d="M62,56 L86,26 L86,40 L74,56 Z" fill="#ffffff" opacity="0.04" />
      </g>
      <path d="M50,13 L86,56 L14,56 Z" fill="none" stroke="#26282b" strokeWidth="1.1" />

      {/* base */}
      <rect x="5" y="58" width="90" height="18" rx="1" fill="#141517" />
      <rect x="5" y="58" width="90" height="1.6" fill="#2e3033" />
      <rect x="5" y="74.2" width="90" height="1.8" fill="#08090a" />

      {/* nameplate */}
      <rect x="33" y="61" width="34" height="11.4" rx="0.6" fill="#cfc9b2" />
      <rect
        x="33"
        y="61"
        width="34"
        height="11.4"
        rx="0.6"
        fill="none"
        stroke="#8d8770"
        strokeWidth="0.5"
      />
      <g fill="#6b6656">
        <rect x="39" y="63.2" width="22" height="1.5" />
        <rect x="36" y="66" width="28" height="0.9" />
        <rect x="37" y="67.8" width="26" height="0.8" />
        <rect x="40" y="69.6" width="20" height="0.8" />
      </g>

      {/* medallions */}
      <g>
        <circle cx="17" cy="67" r="6.2" fill="#b8912f" />
        <circle cx="17" cy="67" r="4.9" fill="#1e3a6a" />
        <path d="M12.5,67 h9" stroke="#c9342f" strokeWidth="1.6" />
        <path d={star(17, 66.2, 2.2)} fill="#f2f3f0" />
      </g>
      <g>
        <circle cx="83" cy="67" r="6.2" fill="#b8912f" />
        <circle cx="83" cy="67" r="4.9" fill="#7a1f26" />
        <path
          d="M79,67.4 C81,65.4 85,65.4 87,67.4 C85,66.8 81,66.8 79,67.4 Z"
          fill="#e8e4d6"
        />
        <circle cx="83" cy="69.2" r="1.1" fill="#e8e4d6" />
      </g>
    </svg>
  );
}

function BookNookDetective() {
  return (
    <svg
      viewBox="0 0 60 100"
      preserveAspectRatio="xMidYMax meet"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Detective house book nook diorama"
    >
      <defs>
        <clipPath id="vbNookAClip">
          <rect x="5" y="7" width="50" height="90" />
        </clipPath>
        <radialGradient id="vbNookGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#ffd08a" />
          <stop offset="60%" stopColor="#d8913c" />
          <stop offset="100%" stopColor="#7a4a1c" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="0" y="2" width="60" height="96" fill="#13100e" />
      <rect x="2" y="4" width="56" height="92" fill="none" stroke="#2a231e" strokeWidth="1" />

      <g clipPath="url(#vbNookAClip)">
        <rect x="5" y="7" width="50" height="90" fill="#0b1116" />

        {/* receding side walls */}
        <path d="M5,7 L18,20 L18,84 L5,97 Z" fill="#2f231c" />
        <path d="M55,7 L42,20 L42,84 L55,97 Z" fill="#241a15" />
        <g stroke="#3d2d24" strokeWidth="0.5">
          {[24, 32, 40, 48, 56, 64, 72, 80].map((y) => (
            <path key={`bl${y}`} d={`M6,${y} L18,${y - 1}`} />
          ))}
          {[24, 32, 40, 48, 56, 64, 72, 80].map((y) => (
            <path key={`br${y}`} d={`M54,${y} L42,${y - 1}`} />
          ))}
        </g>

        {/* back wall + glow */}
        <rect x="18" y="20" width="24" height="64" fill="#141c22" />
        <ellipse cx="30" cy="44" rx="20" ry="22" fill="url(#vbNookGlow)" opacity="0.55" />

        {/* lit window */}
        <rect x="23" y="30" width="14" height="18" fill="#f0b45c" />
        <g stroke="#2a1c10" strokeWidth="0.9">
          <path d="M30,30 L30,48 M23,39 L37,39" />
        </g>

        {/* clock face above */}
        <circle cx="30" cy="24" r="3.6" fill="#c9bda0" />
        <path d="M30,24 L30,21.6 M30,24 L32,25" stroke="#2a231e" strokeWidth="0.6" />

        {/* sign band */}
        <rect x="16" y="52" width="28" height="7" fill="#0e1418" />
        <g fill="#d8c9a2">
          <rect x="18.5" y="54.4" width="23" height="1.1" />
          <rect x="21" y="56.6" width="18" height="0.9" />
        </g>

        {/* doorway */}
        <path d="M24,84 L24,66 C24,62 36,62 36,66 L36,84 Z" fill="#1a1208" />
        <path d="M26,84 L26,67 C26,64.4 34,64.4 34,67 L34,84 Z" fill="#e0a34c" opacity="0.85" />
        <rect x="29.4" y="72" width="1.4" height="12" fill="#7a4a1c" />

        {/* hanging lanterns */}
        <g fill="#f4c774">
          <circle cx="21" cy="63" r="1.5" />
          <circle cx="39" cy="63" r="1.5" />
        </g>

        {/* street */}
        <rect x="5" y="84" width="50" height="13" fill="#151b1e" />
        <path d="M18,84 L42,84 L48,97 L12,97 Z" fill="#20282b" />
        <path d="M22,90 L38,90 M20,94 L40,94" stroke="#2f393d" strokeWidth="0.6" />
      </g>

      <rect x="0" y="2" width="60" height="96" fill="none" stroke="#0a0806" strokeWidth="2" />
    </svg>
  );
}

function BookNookMuseum() {
  return (
    <svg
      viewBox="0 0 44 124"
      preserveAspectRatio="xMidYMax meet"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Museum book nook with statue and dinosaur skeleton"
    >
      <defs>
        <clipPath id="vbNookBClip">
          <path d="M7,120 L7,46 C7,27 37,27 37,46 L37,120 Z" />
        </clipPath>
      </defs>

      {/* copper cupola */}
      <circle cx="22" cy="2.6" r="1.3" fill="#d9a05c" />
      <rect x="21.4" y="3.6" width="1.2" height="2.4" fill="#b8763c" />
      <path d="M16.6,14 C16.6,7.6 27.4,7.6 27.4,14 Z" fill="#c98a4c" />
      <path d="M16.6,14 C16.6,9.6 22,7.8 22,7.8 L22,14 Z" fill="#e0aa6c" opacity="0.7" />
      <rect x="15.4" y="14" width="13.2" height="2" fill="#a86a34" />

      {/* facade */}
      <rect x="1" y="16" width="42" height="106" fill="#9c5f3f" />
      <g stroke="#834e33" strokeWidth="0.55">
        {Array.from({ length: 18 }, (_, i) => 16 + i * 6).map((y, i) => (
          <g key={`bl${y}`}>
            <path d={`M1,${y} L43,${y}`} />
            {[4, 13, 22, 31, 40].map((x) => (
              <path key={`v${x}`} d={`M${x + (i % 2 ? 4.5 : 0)},${y} L${x + (i % 2 ? 4.5 : 0)},${y + 6}`} />
            ))}
          </g>
        ))}
      </g>

      {/* museum plaque */}
      <rect x="12" y="17.6" width="20" height="5" rx="0.6" fill="#7d4930" />
      <rect x="14.6" y="19.4" width="14.8" height="1.4" rx="0.5" fill="#e0c9a8" opacity="0.85" />

      {/* arch opening */}
      <path d="M7,120 L7,46 C7,27 37,27 37,46 L37,120 Z" fill="#241c18" />

      <g clipPath="url(#vbNookBClip)">
        {/* interior walls and floor */}
        <rect x="7" y="27" width="30" height="76" fill="#2b211b" />
        <rect x="7" y="99" width="30" height="21" fill="#5a3a24" />
        <path d="M7,99 L37,99 L34,120 L10,120 Z" fill="#6b452a" />

        {/* chandelier */}
        <path d="M22,30 L22,39" stroke="#9c8a6a" strokeWidth="0.5" />
        <ellipse cx="22" cy="40.4" rx="5.4" ry="1.7" fill="none" stroke="#c9b48c" strokeWidth="0.6" />
        <ellipse cx="22" cy="43.4" rx="3.4" ry="1.1" fill="none" stroke="#b3a07c" strokeWidth="0.5" />

        {/* statue on pedestal */}
        <g fill="#ddd6c6">
          <ellipse cx="13.6" cy="55" rx="1.5" ry="1.9" />
          <path d="M11.8,58 C11.8,56.6 15.4,56.6 15.4,58 L16.2,68 L11,68 Z" />
          <path d="M11.6,59.6 L9.8,64.6 L10.8,65.2 L12.4,60.6 Z" />
        </g>
        <rect x="10.6" y="68" width="6" height="2.4" fill="#b8ae9c" />
        <rect x="11.4" y="70.4" width="4.4" height="5" fill="#8e8474" />

        {/* right display cases */}
        <g fill="#3a2e26">
          <rect x="27" y="50" width="9" height="13" />
          <rect x="27" y="65" width="9" height="13" />
          <rect x="27" y="80" width="9" height="13" />
        </g>
        <g fill="#cfc4ae" opacity="0.8">
          <circle cx="29.6" cy="57" r="1.3" />
          <circle cx="33.4" cy="56.4" r="1" />
          <rect x="28.8" y="70" width="2.4" height="4" />
          <circle cx="33.4" cy="71.6" r="1.2" />
          <rect x="29.4" y="85" width="5.4" height="3.4" />
        </g>

        {/* dinosaur skeleton */}
        <g fill="#e8e1d0">
          <path d="M10,98 C12,90 17,86 23,86 C29,86 33,88.6 35,92.6 L33.4,93.6 C31.6,90.4 28,88.2 23,88.2 C18,88.2 14,91 11.8,98.4 Z" />
          <path d="M10,98 L7,99.6 L7.8,96.6 Z" />
          <ellipse cx="33" cy="90.4" rx="2.6" ry="1.6" />
          <path d="M35.4,91 L37,91.8 L35,92.2 Z" />
        </g>
        <g stroke="#e8e1d0" strokeWidth="0.55" strokeLinecap="round">
          <path d="M15,91.6 L15.4,97" />
          <path d="M17.6,90 L18,96.6" />
          <path d="M20.2,89 L20.6,96.4" />
          <path d="M23,88.6 L23.4,96.4" />
          <path d="M25.8,89 L26.2,96" />
          <path d="M28.4,90 L28.6,95.4" />
          <path d="M23,96.4 L21.4,101.6 M23,96.4 L25,101.6" />
          <path d="M28,95.6 L27.4,100.6" />
        </g>

        {/* gold rail */}
        <rect x="6" y="105" width="32" height="1.4" fill="#c9a33c" />
        <g stroke="#c9a33c" strokeWidth="0.9">
          {[9, 13, 17, 21, 25, 29, 33].map((x) => (
            <path key={`ra${x}`} d={`M${x},106 L${x},113`} />
          ))}
        </g>
        <ellipse cx="22" cy="117" rx="5.4" ry="3" fill="#c9a33c" />
        <ellipse cx="22" cy="116.4" rx="3.6" ry="1.9" fill="#e0bd68" />
      </g>

      {/* arch trim */}
      <path
        d="M7,120 L7,46 C7,27 37,27 37,46 L37,120"
        fill="none"
        stroke="#c9a33c"
        strokeWidth="1.1"
        opacity="0.7"
      />
      <rect x="1" y="16" width="42" height="106" fill="none" stroke="#6e3f28" strokeWidth="1.8" />
    </svg>
  );
}

function CuckooClock() {
  const ticks = [1, 2, 4, 5, 7, 8, 10, 11].map((h) => {
    const a = (h * Math.PI) / 6 - Math.PI / 2;
    return {
      x: 35 + Math.cos(a) * 15,
      y: 86 + Math.sin(a) * 15,
      r: h * 30,
      key: `ck${h}`,
    };
  });

  return (
    <svg
      viewBox="0 0 70 118"
      preserveAspectRatio="xMidYMax meet"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Modern black cuckoo clock"
    >
      <ellipse cx="35" cy="116.6" rx="26" ry="1.4" fill="#000" opacity="0.14" />

      {/* body */}
      <rect x="11" y="38" width="48" height="78" fill="#141414" />

      {/* roof with overhanging eaves */}
      <path d="M35,6 L68,40 L2,40 Z" fill="#101010" />
      <path d="M35,9.4 L63.6,38.6 L6.4,38.6 Z" fill="#1a1a1a" />
      <path d="M35,6 L68,40 L64.6,40 L35,9.4 L5.4,40 L2,40 Z" fill="#242424" />

      {/* cuckoo door */}
      <circle cx="35" cy="56" r="11" fill="#0b0b0b" />
      <circle cx="35" cy="56" r="11" fill="none" stroke="#2c2c2c" strokeWidth="0.8" />
      <path d="M24.4,56 L45.6,56" stroke="#242424" strokeWidth="0.7" />

      {/* dial */}
      <g fill="#f2f2f2" fontFamily="Helvetica, Arial, sans-serif" fontSize="5.4" textAnchor="middle">
        <text x="35" y="74.6">12</text>
        <text x="52.4" y="88.4">3</text>
        <text x="35" y="103.4">6</text>
        <text x="17.6" y="88.4">9</text>
      </g>
      <g fill="#d8d8d8">
        {ticks.map((t) => (
          <rect
            key={t.key}
            x={t.x - 0.5}
            y={t.y - 1.6}
            width="1"
            height="3.2"
            rx="0.4"
            transform={`rotate(${t.r} ${t.x} ${t.y})`}
          />
        ))}
      </g>
      <g
        fill="#f2f2f2"
        fontFamily="Helvetica, Arial, sans-serif"
        fontSize="3.2"
        textAnchor="middle"
        letterSpacing="0.3"
      >
        <text x="35" y="83.4">KOO</text>
        <text x="35" y="87.4">KOO</text>
      </g>
      <g stroke="#f4f4f4" strokeLinecap="round" fill="none">
        <path d="M35,86 L21.4,85.4" strokeWidth="1.5" />
        <path d="M35,86 L25.6,89.4" strokeWidth="1.3" />
      </g>
      <circle cx="35" cy="86" r="1.7" fill="#dcdcdc" />
      <circle cx="35" cy="112" r="0.9" fill="#2a2a2a" />
    </svg>
  );
}

function OilLamp({ lit }) {
  return (
    <svg
      viewBox="0 0 60 100"
      preserveAspectRatio="xMidYMax meet"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={lit ? "Oil lamp, lit" : "Oil lamp, unlit"}
    >
      <defs>
        <radialGradient id="vbLampGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#ffdb8a" stopOpacity="0.85" />
          <stop offset="55%" stopColor="#f6b94a" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#f6b94a" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="30" cy="97.2" rx="22" ry="1.6" fill="#000" opacity="0.14" />

      <ellipse
        cx="30"
        cy="46"
        rx="27"
        ry="32"
        fill="url(#vbLampGlow)"
        opacity={lit ? 1 : 0}
        style={{ transition: "opacity 240ms ease" }}
      />

      {/* glass chimney */}
      <path
        d="M17,70 L17,40 C17,32 22,26 24,22 L36,22 C38,26 43,32 43,40 L43,70 Z"
        fill="#eef4f4"
        opacity="0.28"
      />
      <path
        d="M17,70 L17,40 C17,32 22,26 24,22 L36,22 C38,26 43,32 43,40 L43,70"
        fill="none"
        stroke="#c7d2d2"
        strokeWidth="0.9"
        opacity="0.75"
      />
      <ellipse cx="30" cy="22" rx="6" ry="1.4" fill="none" stroke="#c7d2d2" strokeWidth="0.8" opacity="0.7" />
      <path d="M21,64 L21,42 C21,36 24,31 25.4,28" stroke="#ffffff" strokeWidth="1.4" opacity="0.5" fill="none" />
      <path d="M39.4,62 L39.4,44" stroke="#ffffff" strokeWidth="0.9" opacity="0.3" fill="none" />

      {/* bulb */}
      <ellipse
        cx="30"
        cy="48"
        rx="5.6"
        ry="7.4"
        fill={lit ? "#ffdd8f" : "#f6cd86"}
        opacity={lit ? 0.95 : 0.4}
        style={{ transition: "opacity 240ms ease, fill 240ms ease" }}
      />
      <g
        stroke={lit ? "#ff9a3c" : "#e8722c"}
        strokeWidth="1.1"
        strokeLinecap="round"
        fill="none"
        opacity={lit ? 1 : 0.4}
        style={{ transition: "opacity 240ms ease, stroke 240ms ease" }}
      >
        <path d="M27.6,52 L32.4,50.4 M27.6,49.6 L32.4,48 M27.6,47.2 L32.4,45.6 M27.6,44.8 L32.4,43.2" />
      </g>
      <rect x="26.6" y="55" width="6.8" height="5" rx="0.6" fill="#3a3a3a" />
      <rect x="27.4" y="60" width="5.2" height="3" fill="#2a2a2a" />

      {/* brass collar */}
      <rect x="19" y="63" width="22" height="5.4" rx="1" fill="#c9a33c" />
      <rect x="19" y="63" width="22" height="1.6" fill="#e0bd5e" />
      <rect x="19" y="67" width="22" height="1.4" fill="#8f7226" />

      {/* base */}
      <path
        d="M11,97 L11,84 C11,76 18,70 30,70 C42,70 49,76 49,84 L49,97 Z"
        fill="#17181a"
      />
      <path
        d="M11,97 L11,84 C11,76 18,70 30,70 L30,97 Z"
        fill="#232527"
        opacity="0.7"
      />
      <rect x="11" y="94" width="38" height="3" fill="#0c0d0e" />
      <ellipse cx="30" cy="70.6" rx="19" ry="2.4" fill="#26282b" />
      <circle cx="50.6" cy="80" r="3" fill="#c9a33c" />
      <rect x="47" y="78.6" width="4" height="2.8" fill="#a8862c" />
    </svg>
  );
}

function RoseDome() {
  return (
    <svg
      viewBox="0 0 50 100"
      preserveAspectRatio="xMidYMax meet"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Preserved rose under a glass dome"
    >
      <defs>
        <linearGradient id="vbWoodBase" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4f3120" />
          <stop offset="30%" stopColor="#8d5c38" />
          <stop offset="62%" stopColor="#6e4529" />
          <stop offset="100%" stopColor="#3f2718" />
        </linearGradient>
      </defs>

      <ellipse cx="25" cy="97.4" rx="18" ry="1.4" fill="#000" opacity="0.14" />

      {/* glass dome */}
      <path
        d="M11,86 L11,38 C11,24 39,24 39,38 L39,86 Z"
        fill="#eef4f4"
        opacity="0.22"
      />
      <path
        d="M11,86 L11,38 C11,24 39,24 39,38 L39,86"
        fill="none"
        stroke="#c7d2d2"
        strokeWidth="0.9"
        opacity="0.7"
      />

      {/* rose */}
      <path d="M25,80 L25,50" stroke="#3f6a3a" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="18.6" cy="64" rx="5.4" ry="2.2" fill="#4a7a42" transform="rotate(-24 18.6 64)" />
      <ellipse cx="31.4" cy="70" rx="5" ry="2" fill="#3f6a3a" transform="rotate(22 31.4 70)" />
      <g>
        <circle cx="25" cy="44" r="7.4" fill="#8f1f2a" />
        <path d="M18.6,41 C21,36.6 29,36.6 31.4,41 C29,44 21,44 18.6,41 Z" fill="#b02a35" />
        <path d="M20,46.6 C22,43.6 28,43.6 30,46.6 C28,49.4 22,49.4 20,46.6 Z" fill="#a8232f" />
        <circle cx="25" cy="43.4" r="3.4" fill="#c2404a" />
        <circle cx="25" cy="43" r="1.5" fill="#d9636a" />
      </g>

      {/* dome highlight */}
      <path d="M15,80 L15,39 C15,31 20,28 23,27" stroke="#ffffff" strokeWidth="1.6" opacity="0.4" fill="none" />

      {/* wooden base */}
      <path d="M6,86 L44,86 L41,94 C40.4,95.8 38,96.6 25,96.6 C12,96.6 9.6,95.8 9,94 Z" fill="url(#vbWoodBase)" />
      <ellipse cx="25" cy="86" rx="19" ry="2.6" fill="#a26c42" />
      <ellipse cx="25" cy="86" rx="15" ry="1.8" fill="#7a4e2d" />
      <path d="M8,92 L42,92" stroke="#2f1d11" strokeWidth="0.7" opacity="0.6" />
    </svg>
  );
}

function curveSamples(o, c, e, n, startT) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const t = startT + (0.98 - startT) * (i / (n - 1 || 1));
    const mt = 1 - t;
    const x = mt * mt * o[0] + 2 * mt * t * c[0] + t * t * e[0];
    const y = mt * mt * o[1] + 2 * mt * t * c[1] + t * t * e[1];
    const dx = 2 * mt * (c[0] - o[0]) + 2 * t * (e[0] - c[0]);
    const dy = 2 * mt * (c[1] - o[1]) + 2 * t * (e[1] - c[1]);
    const len = Math.hypot(dx, dy) || 1;
    out.push({
      x,
      y,
      px: -dy / len,
      py: dx / len,
      ang: (Math.atan2(dy, dx) * 180) / Math.PI,
      t,
    });
  }
  return out;
}

function WillowVase() {
  const O = [50, 157];
  const stems = [
    { c: [30, 120], e: [9, 58] },
    { c: [34, 110], e: [16, 40] },
    { c: [40, 100], e: [25, 32] },
    { c: [44, 95], e: [34, 31] },
    { c: [48, 92], e: [44, 33] },
    { c: [52, 92], e: [53, 31] },
    { c: [56, 95], e: [63, 34] },
    { c: [60, 100], e: [72, 38] },
    { c: [66, 108], e: [84, 48] },
    { c: [70, 118], e: [93, 62] },
    { c: [38, 125], e: [14, 84] },
    { c: [64, 126], e: [90, 86] },
    { c: [46, 118], e: [38, 66] },
    { c: [55, 118], e: [60, 64] },
  ];

  return (
    <svg
      viewBox="0 0 100 215"
      preserveAspectRatio="xMidYMax meet"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Pussy willow branches in a green marble vase"
    >
      <defs>
        <linearGradient id="vbMarble" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#22382f" />
          <stop offset="22%" stopColor="#3f6153" />
          <stop offset="48%" stopColor="#4a705f" />
          <stop offset="74%" stopColor="#2e4a3e" />
          <stop offset="100%" stopColor="#1a2b24" />
        </linearGradient>
        <clipPath id="vbVaseEClip">
          <path d="M33.5,157 L36,206 C36.4,210 39,211.6 50,211.6 C61,211.6 63.6,210 64,206 L66.5,157 Z" />
        </clipPath>
      </defs>

      {/* stems */}
      <g stroke="#5f4f42" fill="none" strokeLinecap="round">
        {stems.map((s, i) => (
          <path
            key={`ws${i}`}
            d={`M${O[0]},${O[1]} Q${s.c[0]},${s.c[1]} ${s.e[0]},${s.e[1]}`}
            strokeWidth={0.75 + (i % 3) * 0.12}
          />
        ))}
      </g>

      {/* catkins */}
      <g>
        {stems.map((s, si) =>
          curveSamples(O, s.c, s.e, 9, 0.24).map((p, pi) => {
            const side = pi % 2 ? 1 : -1;
            const cx = p.x + p.px * 0.9 * side;
            const cy = p.y + p.py * 0.9 * side;
            return (
              <ellipse
                key={`wc${si}-${pi}`}
                cx={cx}
                cy={cy}
                rx="1.05"
                ry="2.25"
                fill={pi % 3 === 0 ? "#e2dbcd" : "#efeae0"}
                transform={`rotate(${p.ang + side * 16} ${cx} ${cy})`}
              />
            );
          })
        )}
      </g>

      {/* vase */}
      <path
        d="M33.5,157 L36,206 C36.4,210 39,211.6 50,211.6 C61,211.6 63.6,210 64,206 L66.5,157 Z"
        fill="url(#vbMarble)"
      />
      <g clipPath="url(#vbVaseEClip)">
        <g stroke="#8fae9d" fill="none" opacity="0.42" strokeLinecap="round">
          <path d="M35,168 C42,172 46,164 53,170 C59,175 62,168 66,172" strokeWidth="0.8" />
          <path d="M34,186 C40,190 45,182 52,188 C58,193 61,186 65,190" strokeWidth="0.7" />
          <path d="M38,160 C43,166 49,158 55,163" strokeWidth="0.6" />
          <path d="M37,200 C44,204 50,197 57,202" strokeWidth="0.6" />
        </g>
        <g stroke="#d3e0d7" fill="none" opacity="0.3" strokeLinecap="round">
          <path d="M40,176 C46,180 52,172 58,178" strokeWidth="0.5" />
          <path d="M36,194 C43,198 49,191 56,196" strokeWidth="0.45" />
          <path d="M44,163 C48,168 54,161 59,165" strokeWidth="0.4" />
        </g>
        <path d="M33.5,157 L38,157 L40,211.6 L36,211.6 Z" fill="#ffffff" opacity="0.12" />
        <path d="M60,157 L66.5,157 L64,211.6 L58,211.6 Z" fill="#000000" opacity="0.2" />
      </g>
      <ellipse cx="50" cy="157" rx="16.5" ry="2.8" fill="#2a4438" />
      <ellipse cx="50" cy="157.2" rx="13.4" ry="2" fill="#152219" />
      <ellipse cx="50" cy="212" rx="13" ry="1.5" fill="#000" opacity="0.14" />
    </svg>
  );
}

function PaperBox() {
  const rand = seeded("paperbox");
  const hues = [
    "#c0432f",
    "#2f6a8a",
    "#d4a03c",
    "#3f7a52",
    "#7a3f6a",
    "#e0d6bc",
    "#2a2f3a",
    "#b5603c",
    "#4a5f8a",
    "#8a9a4a",
  ];
  const cols = 20;
  const rows = 12;
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      cells.push({
        x: 10 + c * 4,
        y: 20 + r * 4.67,
        fill: hues[Math.floor(rand() * hues.length)],
        key: `p${r}-${c}`,
      });
    }
  }

  return (
    <svg
      viewBox="0 0 100 80"
      preserveAspectRatio="xMidYMax meet"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Small box made of rolled colored paper"
    >
      <ellipse cx="50" cy="77.6" rx="42" ry="1.6" fill="#000" opacity="0.13" />

      <g>
        {cells.map((c) => (
          <rect key={c.key} x={c.x} y={c.y} width="3.6" height="4.2" fill={c.fill} />
        ))}
      </g>

      <rect x="10" y="20" width="80" height="56" fill="#000" opacity="0.06" />
      <rect x="10" y="20" width="80" height="56" fill="none" stroke="#2a2a30" strokeWidth="1" />
    </svg>
  );
}

function GreenVase() {
  return (
    <svg
      viewBox="0 0 100 121"
      preserveAspectRatio="xMidYMax meet"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Olive green glass vase"
    >
      <defs>
        <linearGradient id="vbGreenGlass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2f3a29" />
          <stop offset="14%" stopColor="#55654a" />
          <stop offset="38%" stopColor="#6b7c56" />
          <stop offset="62%" stopColor="#54654a" />
          <stop offset="86%" stopColor="#3c4a34" />
          <stop offset="100%" stopColor="#252e21" />
        </linearGradient>
      </defs>

      <ellipse cx="50" cy="119" rx="40" ry="1.6" fill="#000" opacity="0.14" />

      <path
        d="M40,10 L40,24 C40,28.5 30,32 20,40 C12.5,46 8,52 8,60 L8,110 C8,116 12,118.4 18,118.4 L82,118.4 C88,118.4 92,116 92,110 L92,60 C92,52 87.5,46 80,40 C70,32 60,28.5 60,24 L60,10 Z"
        fill="url(#vbGreenGlass)"
      />
      <path
        d="M18,44 C14,50 12,55 12,60 L12,110 C12,114 14,116 18,116 L26,116 L26,44 Z"
        fill="#ffffff"
        opacity="0.16"
      />
      <path d="M66,42 L74,42 L74,116 L66,116 Z" fill="#ffffff" opacity="0.09" />
      <path
        d="M82,44 C86,50 88,55 88,60 L88,110 C88,114 86,116 82,116 L78,116 L78,44 Z"
        fill="#000000"
        opacity="0.18"
      />
      <ellipse cx="50" cy="10" rx="10" ry="2.3" fill="#3f4d36" />
      <ellipse cx="50" cy="10.2" rx="7.4" ry="1.5" fill="#1b2318" />
    </svg>
  );
}

function MarbleClock() {
  return (
    <svg
      viewBox="0 0 100 84"
      preserveAspectRatio="xMidYMax meet"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Round marble clock on a brass stand"
    >
      <defs>
        <clipPath id="vbClockClip">
          <circle cx="50" cy="36" r="30" />
        </clipPath>
      </defs>

      <ellipse cx="50" cy="82.4" rx="24" ry="1.4" fill="#000" opacity="0.12" />

      {/* stand rail, behind the disc */}
      <g stroke="#b0872c" fill="none" strokeLinecap="round">
        <path d="M33,80.5 C40,73.5 60,73.5 67,80.5" strokeWidth="1.7" />
      </g>

      {/* marble disc */}
      <circle cx="50" cy="36" r="30" fill="#f5f3ef" />
      <g clipPath="url(#vbClockClip)">
        <g stroke="#b8b5b1" fill="none" strokeLinecap="round" opacity="0.75">
          <path d="M22,16 C30,22 34,14 42,20 C48,24 52,18 58,22" strokeWidth="0.9" />
          <path d="M26,48 C34,54 40,46 48,52" strokeWidth="0.8" />
          <path d="M56,44 C62,50 68,42 74,48" strokeWidth="0.7" />
          <path d="M38,60 C44,64 50,58 56,62" strokeWidth="0.6" />
          <path d="M62,20 C68,26 72,20 78,24" strokeWidth="0.6" />
        </g>
        <g stroke="#c9c6c2" fill="none" opacity="0.6">
          <path d="M30,30 C36,34 40,28 46,32" strokeWidth="0.5" />
          <path d="M54,54 C60,58 66,52 70,56" strokeWidth="0.45" />
        </g>
      </g>
      <circle cx="50" cy="36" r="30" fill="none" stroke="#dedbd6" strokeWidth="0.8" />

      {/* hands */}
      <g stroke="#b8912f" strokeLinecap="round" fill="#b8912f">
        <path d="M50,36 L27,28" strokeWidth="0.7" fill="none" />
        <path d="M50,36 L60,44" strokeWidth="1" fill="none" />
        <path d="M58.4,42.6 L64,45.4 L59.6,45.6 Z" />
        <path d="M50,36 L42,50" strokeWidth="1" fill="none" />
        <path d="M43.4,47.6 L41,53.4 L40.2,49 Z" />
      </g>
      <circle cx="50" cy="36" r="2.1" fill="#c9a33c" />
      <circle cx="50" cy="36" r="0.9" fill="#8f6f22" />

      {/* posts in front */}
      <g stroke="#c9a33c" fill="none" strokeLinecap="round" strokeWidth="1.6">
        <path d="M36,61 L33,80.5" />
        <path d="M64,61 L67,80.5" />
      </g>
      <circle cx="36" cy="60.4" r="1.8" fill="#d9b452" />
      <circle cx="64" cy="60.4" r="1.8" fill="#d9b452" />
      <circle cx="33" cy="80.8" r="1.4" fill="#b0872c" />
      <circle cx="67" cy="80.8" r="1.4" fill="#b0872c" />
    </svg>
  );
}

function ElephantBookend() {
  return (
    <svg
      viewBox="0 0 80 100"
      preserveAspectRatio="xMidYMax meet"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Carved jade elephant bookend"
    >
      <defs>
        <linearGradient id="vbJade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c2ccb0" />
          <stop offset="45%" stopColor="#a2b08c" />
          <stop offset="100%" stopColor="#7d8b6c" />
        </linearGradient>
      </defs>

      <ellipse cx="40" cy="98" rx="34" ry="1.4" fill="#000" opacity="0.13" />

      {/* head mass */}
      <path
        d="M22,86 C18,68 20,48 30,38 C40,28 58,30 64,42 C68,50 68,62 64,72 L60,86 Z"
        fill="url(#vbJade)"
      />
      {/* ear */}
      <path
        d="M24,80 C19,66 20,50 28,42 C35,35 44,38 45,48 C46,60 42,74 36,84 Z"
        fill="#94a37e"
      />
      <path
        d="M26,76 C22,64 23,52 29,46 C34,41 40,43 41,50 C42,60 38,71 33,79 Z"
        fill="none"
        stroke="#7d8b6c"
        strokeWidth="0.8"
        opacity="0.7"
      />
      {/* trunk */}
      <path
        d="M60,48 C68,52 70,62 67,72 C64,82 60,86 58,90 L50,90 C54,84 58,78 59,70 C60,62 57,55 54,52 Z"
        fill="#b0bd9c"
      />
      <path
        d="M60,54 C64,58 65,64 63,70 M61,60 C64,63 64,68 62,73"
        fill="none"
        stroke="#849270"
        strokeWidth="0.8"
      />
      {/* tusk */}
      <path d="M50,66 C54,68 57,72 57,77 C54,74 51,70 49,68 Z" fill="#e4e8d8" />
      {/* eye */}
      <ellipse cx="52" cy="48" rx="1.8" ry="1.4" fill="#5e6b50" />

      {/* base slab */}
      <path d="M6,86 L74,86 L74,96 L6,96 Z" fill="#aab897" />
      <path d="M6,86 L74,86 L74,88.4 L6,88.4 Z" fill="#c4d0b2" />
      <path d="M6,93.6 L74,93.6 L74,96 L6,96 Z" fill="#8b9878" />
    </svg>
  );
}

function DigitalClockFrame() {
  const ticks = Array.from({ length: 12 }, (_, i) => {
    const a = (i * Math.PI) / 6 - Math.PI / 2;
    return {
      x: 36 + Math.cos(a) * 11.5,
      y: 38 + Math.sin(a) * 10.5,
      r: (i * 30) % 360,
      key: `tk${i}`,
    };
  });

  return (
    <svg
      viewBox="0 0 100 78"
      preserveAspectRatio="xMidYMax meet"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Digital photo frame showing a clock"
    >
      <ellipse cx="49" cy="74.4" rx="46" ry="1.8" fill="#000" opacity="0.16" />

      {/* frame */}
      <rect x="3" y="6" width="92" height="64" fill="#17171a" />
      <rect x="3" y="6" width="92" height="2.6" fill="#2a2a2e" />
      <rect x="3" y="6" width="3" height="64" fill="#232327" />

      {/* mat */}
      <rect x="13" y="16" width="73" height="44" fill="#efeade" />
      <rect x="13" y="16" width="73" height="2" fill="#fbf8f0" />
      <rect x="13" y="58" width="73" height="2" fill="#ddd7c8" />

      {/* screen */}
      <rect x="19.5" y="21.5" width="61" height="33" fill="#0b0b0e" />

      {/* analog face */}
      <g fill="#b6c6ea">
        {ticks.map((t) => (
          <rect
            key={t.key}
            x={t.x - 1.5}
            y={t.y - 0.55}
            width="3"
            height="1.1"
            rx="0.5"
            transform={`rotate(${t.r} ${t.x} ${t.y})`}
          />
        ))}
      </g>
      <g stroke="#f2f4f8" strokeLinecap="round" fill="none">
        <path d="M36,38 L42.4,30.6" strokeWidth="0.9" />
        <path d="M36,38 L41.6,32.6" strokeWidth="1.1" />
        <path d="M36,38 L34.6,49.4" strokeWidth="0.6" />
      </g>
      <circle cx="36" cy="38" r="1.5" fill="#dfe6f4" />

      {/* digital readout */}
      <text
        x="63"
        y="41"
        textAnchor="middle"
        fontFamily="Helvetica, Arial, sans-serif"
        fontSize="11"
        fill="#aebbe6"
      >
        01:02
      </text>
      <g fill="#8c98bc">
        <rect x="47" y="39" width="4.4" height="1.6" rx="0.4" />
        <rect x="53" y="46" width="20" height="1.1" rx="0.4" />
      </g>
      <circle cx="78.6" cy="52.4" r="0.55" fill="#4a4a50" />
    </svg>
  );
}

function CarvedBowl() {
  const notches = Array.from({ length: 26 }, (_, i) => {
    const a = (i / 26) * Math.PI * 2;
    return {
      x: 50 + Math.cos(a) * 30,
      y: 47 + Math.sin(a) * 10.4,
      w: 3.4 + ((i * 7) % 5) * 0.5,
      h: 3.2 + ((i * 5) % 4) * 0.6,
      key: `nt${i}`,
    };
  });

  return (
    <svg
      viewBox="0 0 100 80"
      preserveAspectRatio="xMidYMax meet"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Carved dark bowl with glazed interior on a rope ring"
    >
      <ellipse cx="50" cy="77.6" rx="26" ry="1.6" fill="#000" opacity="0.14" />

      {/* rope ring */}
      <ellipse cx="50" cy="70" rx="21" ry="7" fill="#b89769" />
      <ellipse cx="50" cy="68.4" rx="21" ry="7" fill="#cbab7c" />
      <g stroke="#a2823f" strokeWidth="0.8" fill="none" opacity="0.8">
        <path d="M31,66.6 C34,70.6 40,72.6 50,72.6 C60,72.6 66,70.6 69,66.6" />
        <path d="M33,64.4 C36,68 42,69.6 50,69.6 C58,69.6 64,68 67,64.4" />
      </g>
      <g stroke="#96763a" strokeWidth="0.6" opacity="0.7">
        {[36, 42, 48, 54, 60, 64].map((x, i) => (
          <path key={`rp${i}`} d={`M${x},64.6 L${x + 2},71`} />
        ))}
      </g>

      {/* bowl body */}
      <path d="M20,47 C20,62 33,71 50,71 C67,71 80,62 80,47 Z" fill="#221d1a" />
      <path d="M20,47 C20,58 28,66 38,69 C29,63 24,56 24,47 Z" fill="#332b26" opacity="0.8" />
      <path d="M80,47 C80,58 72,66 62,69 C71,63 76,56 76,47 Z" fill="#100d0b" opacity="0.85" />

      {/* rim notches */}
      <g fill="#191512">
        {notches.map((n) => (
          <ellipse key={n.key} cx={n.x} cy={n.y} rx={n.w / 2} ry={n.h / 2} />
        ))}
      </g>
      <g fill="#3a322c" opacity="0.75">
        {notches
          .filter((_, i) => i % 2 === 0)
          .map((n) => (
            <ellipse key={`hi${n.key}`} cx={n.x} cy={n.y - 1} rx={n.w / 3} ry={n.h / 3.4} />
          ))}
      </g>

      {/* glazed interior */}
      <ellipse cx="51" cy="48" rx="20.5" ry="7" fill="#a9bccb" />
      <ellipse cx="51" cy="48.4" rx="18" ry="5.8" fill="#c8d6e0" />
      <g stroke="#6a86a4" strokeWidth="0.6" fill="none" opacity="0.8">
        <path d="M36,47 C42,50 48,45 54,48 C58,50 63,47 66,48.6" />
        <path d="M39,50.6 C44,52.6 50,49.6 56,51.4" />
        <path d="M44,44.6 C48,46.6 54,43.6 59,45.4" />
      </g>
      <ellipse cx="46" cy="46.6" rx="6" ry="2" fill="#e6eef4" opacity="0.75" />
      <path
        d="M30.5,48 C33,54 40,58 51,58 C62,58 69,54 71.5,48"
        fill="none"
        stroke="#7d6a5c"
        strokeWidth="0.5"
        opacity="0.5"
      />
    </svg>
  );
}

function GoldApple() {
  return (
    <svg
      viewBox="0 0 60 62"
      preserveAspectRatio="xMidYMax meet"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Brass apple ornament"
    >
      <defs>
        <radialGradient id="vbApple" cx="0.36" cy="0.34" r="0.72">
          <stop offset="0%" stopColor="#e0c384" />
          <stop offset="45%" stopColor="#c9a355" />
          <stop offset="82%" stopColor="#a9853a" />
          <stop offset="100%" stopColor="#7d6128" />
        </radialGradient>
      </defs>

      <ellipse cx="30" cy="59.4" rx="20" ry="1.5" fill="#000" opacity="0.14" />

      <path d="M30,10.4 C29.4,14 28.8,18 29,20.6 L32.2,20.6 C32.4,17.4 32,13.6 32.4,10.8 Z" fill="#a9853a" />
      <ellipse cx="31.4" cy="10" rx="2.1" ry="1.9" fill="#cfab60" />

      <path
        d="M30,19.6 C42,19.6 51.5,27.6 51.5,38.6 C51.5,50.2 42,58.6 30,58.6 C18,58.6 8.5,50.2 8.5,38.6 C8.5,27.6 18,19.6 30,19.6 Z"
        fill="url(#vbApple)"
      />
      <ellipse cx="30.6" cy="21.4" rx="6.6" ry="2.2" fill="#9a7833" opacity="0.55" />
      <path
        d="M20.5,24.5 C17,30 16,36 17.5,43"
        fill="none"
        stroke="#8f6f2c"
        strokeWidth="0.9"
        opacity="0.3"
      />
      <ellipse cx="22.5" cy="33" rx="7.5" ry="5.6" fill="#ffffff" opacity="0.2" transform="rotate(-24 22.5 33)" />
      <path
        d="M47,29 C50.5,35 50.5,45 45,52"
        fill="none"
        stroke="#6f5522"
        strokeWidth="2.2"
        opacity="0.25"
      />
    </svg>
  );
}

function Antler() {
  return (
    <svg
      viewBox="0 0 200 48"
      preserveAspectRatio="xMidYMax meet"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Shed deer antler"
    >
      <ellipse cx="100" cy="46.6" rx="88" ry="1.2" fill="#000" opacity="0.12" />

      {/* tine, behind the beam */}
      <path
        d="M72,30 C88,24 106,19.4 124,17.6 L126,20.6 C108,22.6 90,27 76,34 Z"
        fill="#c8b998"
      />
      <path
        d="M124,17.6 L126,20.6 L131,20 Z"
        fill="#d5c7a8"
      />

      {/* main beam */}
      <path
        d="M14,40 C30,28 58,17.6 92,14.4 C126,17.6 162,29 190,42 L192,45.4 C164,34.6 128,24.4 92,20.4 C58,23.6 32,34 18,45.4 Z"
        fill="#d5c7a8"
      />
      <path
        d="M14,40 C30,28 58,17.6 92,14.4 C126,17.6 162,29 190,42 L190.6,43.2 C162,31 126,20.6 92,17.6 C58,20.6 31,31 16,42.6 Z"
        fill="#e8dcc4"
      />
      <path
        d="M188,41 C190,42.4 191.4,43.8 192,45.4 L188.6,44.2 Z"
        fill="#bfae8c"
      />
      <g stroke="#b3a284" strokeWidth="0.5" fill="none" opacity="0.7">
        <path d="M26,38 C46,26.6 68,20.6 92,18.4 C118,21 148,30 176,40" />
        <path d="M32,41 C52,30.6 72,24.6 92,22.6 C116,25 144,33.6 170,42" />
      </g>

      {/* burr */}
      <g fill="#c8b998">
        <ellipse cx="14" cy="41" rx="7.6" ry="5.4" />
        <ellipse cx="8" cy="43.6" rx="3.4" ry="3" />
        <ellipse cx="17" cy="45" rx="3" ry="2.4" />
        <ellipse cx="10" cy="37.6" rx="2.6" ry="2.2" />
        <ellipse cx="20" cy="39" rx="2.4" ry="2.2" />
      </g>
      <g fill="#a89878" opacity="0.65">
        <circle cx="11" cy="41.6" r="1.2" />
        <circle cx="15.6" cy="43.6" r="1" />
        <circle cx="8.4" cy="40" r="0.9" />
        <circle cx="18.4" cy="42" r="0.9" />
      </g>
    </svg>
  );
}

function PineconeShape({ cx, cy, len, wid, angle, rows = 10, seedKey }) {
  const rand = seeded(seedKey);
  const tans = ["#c99a63", "#b8834c", "#d9b183", "#a8763f", "#c08a55"];
  const scales = [];
  for (let i = 0; i < rows; i++) {
    const t = i / (rows - 1);
    const u = -len / 2 + t * len;
    const prof = Math.sqrt(Math.max(0, 1 - Math.pow(2 * t - 1, 2)));
    const hw = (wid / 2) * (0.34 + 0.66 * prof);
    const cols = hw > wid * 0.26 ? 3 : 2;
    for (let j = 0; j < cols; j++) {
      const v = cols === 3 ? (j - 1) * hw * 0.64 : (j - 0.5) * hw * 0.9;
      scales.push({
        u: u + (j % 2 ? len / (rows * 2.6) : 0),
        v,
        s: 0.72 + 0.5 * prof,
        fill: tans[Math.floor(rand() * tans.length)],
        key: `sc${i}-${j}`,
      });
    }
  }
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${angle})`}>
      <ellipse cx="0" cy="0" rx={len / 2} ry={wid / 2} fill="#8a6236" />
      {scales.map((s) => (
        <g key={s.key} transform={`translate(${s.u} ${s.v}) scale(${s.s})`}>
          <path d="M-3.4,-2.8 L1.8,-3.6 L4.2,0 L1.8,3.6 L-3.4,2.8 Z" fill={s.fill} />
          <path d="M1.8,-3.6 L4.2,0 L1.8,3.6 Z" fill="#e2c59c" opacity="0.5" />
        </g>
      ))}
    </g>
  );
}

function Pinecones() {
  return (
    <svg
      viewBox="0 0 140 100"
      preserveAspectRatio="xMidYMax meet"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Cluster of pinecones"
    >
      <ellipse cx="70" cy="97.6" rx="62" ry="2" fill="#000" opacity="0.13" />

      <PineconeShape cx={74} cy={40} len={66} wid={34} angle={-30} seedKey="pc-a" />
      <path d="M101,23.6 L112,16.6 L114.4,19.6 L103.4,26.6 Z" fill="#a89070" />
      <PineconeShape cx={40} cy={64} len={68} wid={36} angle={-6} seedKey="pc-b" />
      <PineconeShape cx={108} cy={78} len={42} wid={27} angle={6} seedKey="pc-c" />
      <PineconeShape cx={40} cy={86} len={30} wid={20} angle={8} seedKey="pc-d" />
      <PineconeShape cx={74} cy={88} len={30} wid={20} angle={-6} seedKey="pc-e" />
    </svg>
  );
}

function GreenBowl() {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMax meet"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Green glazed ceramic bowl"
    >
      <defs>
        <radialGradient id="vbBowlGlaze" cx="0.46" cy="0.44" r="0.62">
          <stop offset="0%" stopColor="#b3ae76" />
          <stop offset="55%" stopColor="#8d8c58" />
          <stop offset="100%" stopColor="#6b7148" />
        </radialGradient>
      </defs>

      <ellipse cx="50" cy="97.4" rx="30" ry="1.6" fill="#000" opacity="0.14" />

      <ellipse cx="50" cy="52" rx="44" ry="45" fill="#6f7549" />
      <ellipse cx="50" cy="52" rx="41" ry="42" fill="url(#vbBowlGlaze)" />

      <g fill="none" stroke="#7d7f4f" strokeWidth="1" opacity="0.65">
        <ellipse cx="50" cy="53" rx="33" ry="34" />
        <ellipse cx="50" cy="54" rx="25" ry="25.5" />
        <ellipse cx="50" cy="55" rx="17" ry="17" />
      </g>
      <g fill="none" stroke="#a5a473" strokeWidth="0.8" opacity="0.55">
        <ellipse cx="50" cy="52.6" rx="37" ry="38" />
        <ellipse cx="50" cy="54.4" rx="21" ry="21.4" />
      </g>

      <path
        d="M38,62 C42,52 56,50 60,58 C62,63 54,68 46,66 C42,65 39,64 38,62 Z"
        fill="#c98a6a"
        opacity="0.85"
      />
      <path
        d="M42,60.6 C46,55 54,54.4 56,58.6 C57,61 52,63.4 47,62.6 Z"
        fill="#d9a184"
        opacity="0.8"
      />

      <ellipse cx="50" cy="52" rx="44" ry="45" fill="none" stroke="#5c6440" strokeWidth="2" />
      <path
        d="M18,30 C24,20 36,12 50,10"
        fill="none"
        stroke="#c2c095"
        strokeWidth="2.4"
        opacity="0.4"
      />
    </svg>
  );
}

function StoneCurios() {
  return (
    <svg
      viewBox="0 0 100 74"
      preserveAspectRatio="xMidYMax meet"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Two small lidded curio boxes"
    >
      <ellipse cx="30" cy="71.4" rx="23" ry="1.6" fill="#000" opacity="0.14" />
      <ellipse cx="73" cy="72.6" rx="18" ry="1.4" fill="#000" opacity="0.13" />

      {/* dark bronze lidded box */}
      <path d="M8,44 C8,60 15,70 30,70 C45,70 52,60 52,44 Z" fill="#2f251a" />
      <path d="M8,44 C8,58 13,67 22,69.4 C15,63 12,54 12,44 Z" fill="#42341f" opacity="0.75" />
      <path d="M52,44 C52,58 47,67 38,69.4 C45,63 48,54 48,44 Z" fill="#191207" opacity="0.8" />
      <path d="M9,42.6 C11,32 20,27.4 30,27.4 C40,27.4 49,32 51,42.6 Z" fill="#4a3a24" />
      <path d="M13,40 C15,32.6 22,29.4 30,29.4 C36,29.4 41,31 44,34 C38,32 22,33 13,40 Z" fill="#6a5636" opacity="0.7" />
      <ellipse cx="30" cy="43.4" rx="21.6" ry="2.6" fill="#241a10" />
      <ellipse cx="31" cy="26.6" rx="4.6" ry="3" fill="#3f3120" />
      <ellipse cx="30.4" cy="25.4" rx="3" ry="1.8" fill="#5c4a2e" opacity="0.8" />
      <g fill="#6a5636" opacity="0.35">
        <ellipse cx="19" cy="53" rx="4" ry="2.6" transform="rotate(-18 19 53)" />
        <ellipse cx="40" cy="50" rx="3" ry="2" transform="rotate(22 40 50)" />
        <ellipse cx="28" cy="61" rx="3.4" ry="1.8" />
      </g>

      {/* pale stone box */}
      <path d="M57,52 L57,68 C57,71.4 61,72.6 73,72.6 C85,72.6 89,71.4 89,68 L89,52 Z" fill="#c4b28c" />
      <path d="M57,52 L57,68 C57,70.6 59,71.8 64,72.4 L64,52 Z" fill="#d8caa6" opacity="0.75" />
      <path d="M83,52 L83,72.4 C87,71.8 89,70.6 89,68 L89,52 Z" fill="#9c8a66" opacity="0.8" />
      <path d="M56,49.4 L61,45.6 L85,45.6 L90,49.4 L85,53 L61,53 Z" fill="#d9caa4" />
      <path d="M56,49.4 L61,45.6 L85,45.6 L90,49.4 L85,50.6 L61,50.6 Z" fill="#e6dabb" />
      <path d="M56,49.4 L61,53 L85,53 L90,49.4 L90,50.8 L85,54.4 L61,54.4 L56,50.8 Z" fill="#a8946e" />
      <g stroke="#a8946e" strokeWidth="0.6" opacity="0.6">
        <path d="M64,54.6 L64,71.8" />
        <path d="M73,55 L73,72.4" />
        <path d="M82,54.6 L82,71.8" />
      </g>
      <g fill="#9c8a66" opacity="0.4">
        <circle cx="68" cy="60" r="1.2" />
        <circle cx="78" cy="64" r="1" />
        <circle cx="71" cy="67" r="0.9" />
      </g>
    </svg>
  );
}

const ART = {
  branchVase: BranchVase,
  paintingCandlesticks: PaintingCandlesticks,
  agateSlice: AgateSlice,
  framedPrint: FramedPrint,
  pottedFern: PottedFern,
  flagCase: FlagCase,
  bookNookDetective: BookNookDetective,
  bookNookMuseum: BookNookMuseum,
  cuckooClock: CuckooClock,
  oilLamp: OilLamp,
  roseDome: RoseDome,
  willowVase: WillowVase,
  paperBox: PaperBox,
  greenVase: GreenVase,
  marbleClock: MarbleClock,
  elephantBookend: ElephantBookend,
  digitalClockFrame: DigitalClockFrame,
  carvedBowl: CarvedBowl,
  goldApple: GoldApple,
  antler: Antler,
  pinecones: Pinecones,
  greenBowl: GreenBowl,
  stoneCurios: StoneCurios,
};

function DecorBlock({ decor }) {
  const Art = decor.art ? ART[decor.art] : null;
  return (
    <div className="vb-decor-block" style={{ width: `${(decor.width || 1) * 100}%` }}>
      {Art ? (
        <div className="vb-art">
          <Art />
        </div>
      ) : (
        <span className="vb-decor">{decor.label}</span>
      )}
    </div>
  );
}

function BookGroup({ cellId, books, midDecor, style }) {
  const spines = useSpines(cellId, books);
  const align = books.align || "left";
  const justify =
    align === "right" ? "flex-end" : align === "fill" ? "space-between" : "flex-start";
  const half = Math.ceil(spines.upright.length / 2);

  return (
    <div className="vb-books" style={style}>
      {midDecor ? (
        <>
          <SpineRun spines={spines.upright.slice(0, half)} justify={justify} />
          <DecorBlock decor={midDecor} />
          <SpineRun spines={spines.upright.slice(half)} justify={justify} />
        </>
      ) : (
        <SpineRun spines={spines.upright} justify={justify} />
      )}
      <Stack items={spines.stacked} grow={spines.upright.length === 0} />
    </div>
  );
}

function ContentSegment({ cellId, seg, index, lampOn, onToggleLamp }) {
  const width = `${(seg.width || 0.1) * 100}%`;

  if (seg.decor) {
    const Art = seg.decor.art ? ART[seg.decor.art] : null;
    const isLamp = seg.decor.art === "oilLamp";
    return (
      <div className="vb-seg" style={{ width }}>
        {Art ? (
          isLamp ? (
            <div
              className={["vb-art", "vb-lamp", lampOn ? "is-lit" : ""].join(" ")}
              role="button"
              tabIndex={0}
              aria-pressed={lampOn}
              aria-label={lampOn ? "Turn off the oil lamp" : "Turn on the oil lamp"}
              onClick={(e) => {
                e.stopPropagation();
                onToggleLamp();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  e.stopPropagation();
                  onToggleLamp();
                }
              }}
            >
              <Art lit={lampOn} />
            </div>
          ) : (
            <div className="vb-art">
              <Art />
            </div>
          )
        ) : (
          <span className="vb-decor">{seg.decor.label}</span>
        )}
      </div>
    );
  }

  if (seg.books) {
    return (
      <div className="vb-seg" style={{ width }}>
        <BookGroup cellId={`${cellId}#${index}`} books={seg.books} style={{ width: "100%" }} />
      </div>
    );
  }

  return <div className="vb-seg" style={{ width }} />;
}

function CellContents({ cellId, cell, lampOn, onToggleLamp }) {
  if (cell.content) {
    return (
      <div className="vb-row">
        {cell.content.map((seg, i) => (
          <ContentSegment
            key={i}
            cellId={cellId}
            seg={seg}
            index={i}
            lampOn={lampOn}
            onToggleLamp={onToggleLamp}
          />
        ))}
      </div>
    );
  }

  const decors = cell.decor ? (Array.isArray(cell.decor) ? cell.decor : [cell.decor]) : [];
  const full = decors.find((d) => d.side === "full");
  if (full) {
    const Art = full.art ? ART[full.art] : null;
    return Art ? (
      <div className="vb-art">
        <Art />
      </div>
    ) : (
      <span className="vb-decor vb-decor-full">{full.label}</span>
    );
  }
  if (!cell.books) return null;

  const left = decors.filter((d) => d.side === "left");
  const right = decors.filter((d) => d.side === "right");
  const mid = decors.find((d) => d.side === "mid");
  const align = cell.books.align || "left";
  const spread = cell.books.spread ?? 1;

  return (
    <div className="vb-row">
      {left.map((d, i) => (
        <DecorBlock key={`l${i}`} decor={d} />
      ))}
      <BookGroup
        cellId={cellId}
        books={cell.books}
        midDecor={mid}
        style={{
          width: `${spread * 100}%`,
          marginLeft: align === "right" && right.length === 0 ? "auto" : undefined,
        }}
      />
      {right.map((d, i) => (
        <DecorBlock key={`r${i}`} decor={d} />
      ))}
    </div>
  );
}

export default function Bookshelf({ onSelectCell }) {
  const [selected, setSelected] = useState(null);
  const [lampOn, setLampOn] = useState(false);

  const totalWidth = LAYOUT.reduce((sum, b) => sum + b.width, 0);
  const aspect = totalWidth / 1700;

  const handleSelect = (cellId, hasBooks) => {
    if (!hasBooks) return;
    const next = selected === cellId ? null : cellId;
    setSelected(next);
    onSelectCell?.(next);
  };

  return (
    <div className="vb-root">
      <style>{CSS}</style>

      <div
        className="vb-case"
        style={{ aspectRatio: `${aspect}` }}
        role="group"
        aria-label="Bookshelf"
      >
        {LAYOUT.map((bay) => (
          <div className="vb-bay" key={bay.id} style={{ flexGrow: bay.width }}>
            {bay.cells.map((cell, rowIndex) => {
              const cellId = `${bay.id}${rowIndex + 1}`;
              const isSelected = selected === cellId;
              const bookSegs = cell.content ? cell.content.filter((s) => s.books) : [];
              const hasBooks = Boolean(cell.books) || bookSegs.length > 0;
              const tally = (b) =>
                (b.count || 0) + (b.flat || 0) + (b.spines ? b.spines.length : 0);
              const approx = cell.books
                ? tally(cell.books)
                : bookSegs.reduce((n, s) => n + tally(s.books), 0);
              return (
                <div className="vb-cell-wrap" key={cellId} style={{ flexGrow: cell.height }}>
                  <button
                    type="button"
                    className={[
                      "vb-cell",
                      isSelected ? "is-selected" : "",
                      hasBooks ? "" : "is-inert",
                    ].join(" ")}
                    onClick={() => handleSelect(cellId, hasBooks)}
                    aria-pressed={isSelected}
                    aria-label={
                      hasBooks
                        ? `Shelf ${cellId}, about ${approx} books`
                        : `Shelf ${cellId}, no books`
                    }
                    disabled={!hasBooks}
                  >
                    <CellContents
                      cellId={cellId}
                      cell={cell}
                      lampOn={lampOn}
                      onToggleLamp={() => setLampOn((v) => !v)}
                    />
                    <span className="vb-id">{cellId}</span>
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="vb-base" aria-hidden="true">
        {Array.from({ length: 8 }, (_, i) => (
          <div className="vb-door" key={i} />
        ))}
      </div>
    </div>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,500&family=Inter:wght@400;500&display=swap');

.vb-root {
  --wall: #ddd9d2;
  --millwork: #fbfaf8;
  --interior: #eae7e0;
  --interior-shade: #ddd9d1;
  --ink: #2c2a27;
  --lamp: #e8a94c;
  --lamp-soft: rgba(232, 169, 76, 0.26);

  background: var(--wall);
  padding: clamp(16px, 3vw, 40px);
  font-family: 'Inter', system-ui, sans-serif;
  color: var(--ink);
}

/* --- the case --- */
.vb-case {
  display: flex;
  width: 100%;
  background: var(--millwork);
  border: 9px solid var(--millwork);
  border-top-width: 16px;
  border-bottom-width: 12px;
  box-shadow: 0 26px 54px -30px rgba(0,0,0,0.4);
}

.vb-bay {
  display: flex;
  flex-direction: column;
  flex-basis: 0;
  min-width: 0;
  border-right: 8px solid var(--millwork);
}
.vb-bay:last-child { border-right: none; }

.vb-cell-wrap {
  flex-basis: 0;
  min-height: 0;
  border-bottom: 6px solid var(--millwork);
  display: flex;
}
.vb-cell-wrap:last-child { border-bottom: none; }

.vb-cell {
  position: relative;
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: flex-end;
  padding: 0 3px;
  border: none;
  background: linear-gradient(180deg, var(--interior-shade) 0%, var(--interior) 14%, #f2f0ea 100%);
  cursor: pointer;
  transition: box-shadow 160ms ease, filter 160ms ease;
  overflow: hidden;
}

.vb-cell.is-inert { cursor: default; }

.vb-cell:not(.is-inert):hover {
  filter: brightness(1.03);
  box-shadow: inset 0 0 0 2px var(--lamp-soft);
}

.vb-cell:focus-visible {
  outline: 3px solid var(--lamp);
  outline-offset: -3px;
}

/* signature: selection reads as a lamp switching on over that shelf */
.vb-cell.is-selected {
  background:
    radial-gradient(125% 95% at 50% 0%,
      rgba(255, 231, 181, 0.98) 0%,
      rgba(247, 211, 152, 0.6) 44%,
      rgba(242, 240, 234, 0.2) 100%),
    linear-gradient(180deg, var(--interior-shade) 0%, #f2f0ea 100%);
  box-shadow:
    inset 0 0 0 2px var(--lamp),
    0 0 28px 2px var(--lamp-soft);
}

.vb-cell.is-selected .vb-spine { filter: saturate(1.12) brightness(1.1); }

/* --- contents --- */
.vb-row {
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  padding-top: 9%;
}

.vb-books {
  display: flex;
  align-items: flex-end;
  height: 100%;
  min-width: 0;
}

.vb-spines {
  display: flex;
  align-items: flex-end;
  gap: 0;
  flex: 1 1 auto;
  height: 100%;
  min-width: 0;
}

.vb-spine {
  position: relative;
  flex-shrink: 1;
  min-width: 0;
  border-radius: 1px 1px 0 0;
  transform-origin: bottom center;
  box-shadow: inset -1px 0 0 rgba(0,0,0,0.3), inset 1px 0 0 rgba(255,255,255,0.12);
}

.vb-band {
  position: absolute;
  top: 20%;
  left: 0;
  right: 0;
  height: 7%;
  background: rgba(255,255,255,0.28);
}

.vb-seg {
  align-self: stretch;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-shrink: 0;
  min-width: 0;
}

.vb-stack {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 1px;
  min-width: 24px;
  margin-left: 5px;
}

.vb-flat {
  height: 5px;
  border-radius: 1px;
  box-shadow: inset 0 -1px 0 rgba(0,0,0,0.2);
}

.vb-decor-block {
  align-self: stretch;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-shrink: 0;
}

.vb-decor {
  display: block;
  padding: 0 3px 6px;
  font-size: 9px;
  line-height: 1.2;
  text-align: center;
  letter-spacing: 0.03em;
  color: #a8a299;
  overflow: hidden;
}

.vb-decor-full {
  align-self: center;
  width: 100%;
  padding-bottom: 0;
}

.vb-art {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 4% 6% 0;
  box-sizing: border-box;
}

.vb-art svg {
  width: 100%;
  height: 100%;
  display: block;
}

.vb-lamp {
  cursor: pointer;
  border-radius: 6px;
  transition: filter 200ms ease;
}
.vb-lamp:hover { filter: brightness(1.08); }
.vb-lamp:focus-visible { outline: 2px solid var(--lamp, #c9a33c); outline-offset: 2px; }
.vb-lamp.is-lit { filter: drop-shadow(0 0 10px rgba(246, 185, 74, 0.45)); }

.vb-id {
  position: absolute;
  top: 4px;
  left: 5px;
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.1em;
  color: rgba(60, 56, 50, 0.28);
  pointer-events: none;
}

.vb-cell.is-selected .vb-id { color: rgba(90, 62, 20, 0.72); }

/* --- cabinet base, scenery only --- */
.vb-base {
  display: flex;
  gap: 3px;
  height: clamp(28px, 4vw, 54px);
  margin-top: -12px;
  padding: 0 2px;
}
.vb-door {
  flex: 1;
  background: linear-gradient(180deg, #fdfcfa, #f0eee9);
  border: 1px solid #e6e2da;
  border-radius: 2px 2px 0 0;
}

@media (max-width: 700px) {
  .vb-id { font-size: 7px; }
  .vb-decor { font-size: 7px; padding-bottom: 3px; }
  .vb-spines { gap: 1px; }
}

@media (prefers-reduced-motion: reduce) {
  .vb-cell { transition: none; }
}
`;
