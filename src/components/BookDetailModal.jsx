import { useEffect, useState } from "react";
import Modal from "./Modal";
import { lookupSummary } from "../lib/lookup";

export default function BookDetailModal({ book, onClose }) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!book?.isbn) {
      setSummary(null);
      return;
    }
    let cancelled = false;
    setLoading(true);
    lookupSummary(book.isbn)
      .then((s) => !cancelled && setSummary(s))
      .catch(() => !cancelled && setSummary(null))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [book?.isbn]);

  return (
    <Modal title={book.title} onClose={onClose}>
      <div className="book-detail">
        {book.coverUrl ? (
          <img className="book-detail-cover" src={book.coverUrl} alt="" />
        ) : (
          <div className="book-detail-cover cover-blank" aria-hidden="true" />
        )}
        <div className="book-detail-meta">
          {book.authors?.length > 0 && (
            <p className="book-detail-authors">{book.authors.join(", ")}</p>
          )}
          {book.isbn && <p className="muted small">ISBN {book.isbn}</p>}
        </div>
      </div>
      <div className="book-detail-summary">
        {loading ? (
          <p className="muted small">Looking up a summary…</p>
        ) : summary ? (
          <p>{summary}</p>
        ) : (
          <p className="muted small">No summary available.</p>
        )}
      </div>
    </Modal>
  );
}
