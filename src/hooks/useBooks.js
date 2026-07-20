import { useCallback, useEffect, useMemo, useState } from "react";
import * as store from "../lib/store";

export function useBooks(uid) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(Boolean(uid));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!uid) {
      setBooks([]);
      setLoading(false);
      return undefined;
    }
    setLoading(true);
    const unsub = store.subscribeBooks(
      uid,
      (rows) => {
        setBooks(rows);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
    return unsub;
  }, [uid]);

  /** { A1: [book, book], C3: [...] } */
  const byCell = useMemo(() => {
    const map = {};
    for (const b of books) {
      (map[b.cellId] ||= []).push(b);
    }
    return map;
  }, [books]);

  const add = useCallback((data) => store.addBook(uid, data), [uid]);
  const update = useCallback((id, patch) => store.updateBook(uid, id, patch), [uid]);
  const remove = useCallback((id) => store.deleteBook(uid, id), [uid]);

  return { books, byCell, loading, error, add, update, remove };
}

export function searchBooks(books, term) {
  const q = term.trim().toLowerCase();
  if (q.length < 2) return [];
  return books
    .filter(
      (b) =>
        (b.title || "").toLowerCase().includes(q) ||
        (b.authors || []).join(" ").toLowerCase().includes(q)
    )
    .slice(0, 20);
}
