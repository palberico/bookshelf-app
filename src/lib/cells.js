/**
 * Shelf inventory.
 *
 * NOTE: this mirrors the LAYOUT constant inside components/Bookshelf.jsx.
 * Bookshelf.jsx does not export LAYOUT, so the counts live here too.
 * If you ever add or remove a shelf in Bookshelf.jsx, update CELL_COUNTS.
 * (Cleaner long-term fix: `export const LAYOUT` in Bookshelf.jsx and import it here.)
 */

export const BAYS = [
  { id: "A", label: "far-left column" },
  { id: "B", label: "second column" },
  { id: "C", label: "third column" },
  { id: "D", label: "fourth column" },
  { id: "E", label: "fifth column" },
  { id: "F", label: "sixth column" },
  { id: "G", label: "far-right column" },
];

export const CELL_COUNTS = { A: 5, B: 5, C: 4, D: 5, E: 4, F: 5, G: 5 };

/** Cells that actually hold books (the rest are decor-only and not clickable). */
export const BOOK_CELLS = [
  "A1", "A2", "A3", "A4", "A5",
  "B1", "B2", "B4", "B5",
  "C2", "C3", "C4",
  "D2", "D4", "D5",
  "E2", "E3", "E4",
  "F1", "F2", "F3", "F4", "F5",
  "G1", "G2", "G3", "G4", "G5",
];

function rowNames(n) {
  if (n === 3) return ["top", "middle", "bottom"];
  if (n === 4) return ["top", "second", "third", "bottom"];
  if (n === 5) return ["top", "second", "middle", "fourth", "bottom"];
  return Array.from({ length: n }, (_, i) => `row ${i + 1}`);
}

/** "C3" -> "middle shelf, third column" */
export function describeCell(cellId) {
  if (!cellId) return "";
  const bayId = cellId[0];
  const row = Number(cellId.slice(1));
  const bay = BAYS.find((b) => b.id === bayId);
  const names = rowNames(CELL_COUNTS[bayId] || 5);
  return `${names[row - 1] || `row ${row}`} shelf, ${bay ? bay.label : `column ${bayId}`}`;
}

export const STATUSES = [
  { value: "owned", label: "On the shelf" },
  { value: "reading", label: "Reading" },
  { value: "read", label: "Read" },
  { value: "lent", label: "Lent out" },
];
