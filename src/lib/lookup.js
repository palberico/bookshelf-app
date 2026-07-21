/**
 * ISBN -> book metadata. Tries Open Library first, then Google Books.
 * Both allow browser requests, so no proxy or key is needed.
 */

export function normalizeIsbn(raw) {
  return (raw || "").replace(/[^0-9Xx]/g, "").toUpperCase();
}

export function isValidIsbn(raw) {
  const isbn = normalizeIsbn(raw);
  return isbn.length === 10 || isbn.length === 13;
}

async function fromOpenLibrary(isbn) {
  const url = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const json = await res.json();
  const rec = json[`ISBN:${isbn}`];
  if (!rec) return null;
  return {
    title: rec.title || "",
    authors: (rec.authors || []).map((a) => a.name).filter(Boolean),
    coverUrl: rec.cover?.medium || rec.cover?.large || null,
    isbn,
    source: "Open Library",
  };
}

async function fromGoogleBooks(isbn) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const json = await res.json();
  const v = json.items?.[0]?.volumeInfo;
  if (!v) return null;
  return {
    title: v.title || "",
    authors: v.authors || [],
    coverUrl: (v.imageLinks?.thumbnail || "").replace(/^http:/, "https:") || null,
    isbn,
    source: "Google Books",
  };
}

export async function lookupIsbn(raw) {
  const isbn = normalizeIsbn(raw);
  if (!isValidIsbn(isbn)) throw new Error("ISBN must be 10 or 13 characters.");
  const found = (await fromOpenLibrary(isbn)) || (await fromGoogleBooks(isbn));
  if (!found) throw new Error("No match found. You can still enter it by hand.");
  return found;
}

async function summaryFromGoogleBooks(isbn) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const json = await res.json();
  return json.items?.[0]?.volumeInfo?.description || null;
}

async function summaryFromOpenLibrary(isbn) {
  const editionRes = await fetch(`https://openlibrary.org/isbn/${isbn}.json`);
  if (!editionRes.ok) return null;
  const edition = await editionRes.json();
  const workKey = edition.works?.[0]?.key;
  if (!workKey) return null;
  const workRes = await fetch(`https://openlibrary.org${workKey}.json`);
  if (!workRes.ok) return null;
  const work = await workRes.json();
  const desc = work.description;
  if (!desc) return null;
  return typeof desc === "string" ? desc : desc.value || null;
}

/** ISBN -> short description, trying Google Books then Open Library's work record. */
export async function lookupSummary(raw) {
  const isbn = normalizeIsbn(raw);
  if (!isValidIsbn(isbn)) return null;
  return (await summaryFromGoogleBooks(isbn)) || (await summaryFromOpenLibrary(isbn));
}
