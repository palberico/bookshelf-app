/**
 * localStorage-backed stand-in for Firestore so `npm run dev` works
 * before you have credentials. Same API shape as store.js.
 */
const KEY = (uid) => `bookshelf:books:${uid}`;
const listeners = new Map();

function read(uid) {
  try {
    return JSON.parse(localStorage.getItem(KEY(uid)) || "[]");
  } catch {
    return [];
  }
}

function write(uid, rows) {
  localStorage.setItem(KEY(uid), JSON.stringify(rows));
  (listeners.get(uid) || []).forEach((cb) => cb(sorted(rows)));
}

const sorted = (rows) =>
  [...rows].sort((a, b) => (a.title || "").localeCompare(b.title || ""));

export function subscribeBooks(uid, cb) {
  const list = listeners.get(uid) || [];
  listeners.set(uid, [...list, cb]);
  cb(sorted(read(uid)));
  return () => {
    listeners.set(uid, (listeners.get(uid) || []).filter((f) => f !== cb));
  };
}

export async function addBook(uid, data) {
  const rows = read(uid);
  const id = `local_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  rows.push({ id, ...data, addedAt: new Date().toISOString() });
  write(uid, rows);
  return id;
}

export async function updateBook(uid, id, patch) {
  write(
    uid,
    read(uid).map((r) => (r.id === id ? { ...r, ...patch } : r))
  );
}

export async function deleteBook(uid, id) {
  write(
    uid,
    read(uid).filter((r) => r.id !== id)
  );
}
