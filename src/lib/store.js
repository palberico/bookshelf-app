import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db, isConfigured } from "./firebase";
import * as local from "./localStore";

/**
 * Data model
 *   users/{uid}/books/{bookId}
 *     title      string
 *     authors    string[]
 *     isbn       string | null
 *     coverUrl   string | null
 *     cellId     string   e.g. "C3"
 *     status     "owned" | "reading" | "read" | "lent"
 *     notes      string
 *     addedAt    timestamp
 *
 * Shelves are not stored — they come from the LAYOUT in Bookshelf.jsx.
 */

const booksRef = (uid) => collection(db, "users", uid, "books");

export function subscribeBooks(uid, cb, onError) {
  if (!isConfigured) return local.subscribeBooks(uid, cb);
  const q = query(booksRef(uid), orderBy("title"));
  return onSnapshot(
    q,
    (snap) => cb(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
    (err) => onError?.(err)
  );
}

export async function addBook(uid, data) {
  if (!isConfigured) return local.addBook(uid, data);
  const ref = await addDoc(booksRef(uid), { ...data, addedAt: serverTimestamp() });
  return ref.id;
}

export async function updateBook(uid, id, patch) {
  if (!isConfigured) return local.updateBook(uid, id, patch);
  return updateDoc(doc(db, "users", uid, "books", id), patch);
}

export async function deleteBook(uid, id) {
  if (!isConfigured) return local.deleteBook(uid, id);
  return deleteDoc(doc(db, "users", uid, "books", id));
}
