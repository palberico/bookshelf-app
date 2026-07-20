import { useState } from "react";
import BookForm from "./BookForm";
import LoginModal from "./LoginModal";
import AddBookModal from "./AddBookModal";
import { STATUSES, describeCell } from "../lib/cells";

const statusLabel = (v) => STATUSES.find((s) => s.value === v)?.label || v;

export default function ShelfPanel({
  cellId,
  books,
  user,
  authError,
  onSignIn,
  onAdd,
  onUpdate,
  onRemove,
}) {
  const [mode, setMode] = useState(null); // null | book id being edited
  const [modal, setModal] = useState(null); // null | "login" | "add"

  if (!cellId) {
    return (
      <section className="panel panel-empty">
        <p className="muted">
          Pick a shelf above to see what's on it, or search for a title.
        </p>
      </section>
    );
  }

  const editing = books.find((b) => b.id === mode);

  async function handleLogin(email, password) {
    const ok = await onSignIn(email, password);
    if (ok) setModal("add");
    return ok;
  }

  return (
    <section className="panel">
      <header className="panel-head">
        <div>
          <h2 className="panel-title">Shelf {cellId}</h2>
          <p className="panel-sub">{describeCell(cellId)}</p>
        </div>
        {mode === null && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setModal(user ? "add" : "login")}
          >
            Add a book
          </button>
        )}
      </header>

      {modal === "login" && (
        <LoginModal error={authError} onSubmit={handleLogin} onClose={() => setModal(null)} />
      )}

      {modal === "add" && (
        <AddBookModal
          cellId={cellId}
          onCancel={() => setModal(null)}
          onSave={async (data) => {
            await onAdd(data);
            setModal(null);
          }}
        />
      )}

      {editing && (
        <BookForm
          cellId={cellId}
          initial={editing}
          onCancel={() => setMode(null)}
          onSave={async (data) => {
            await onUpdate(editing.id, data);
            setMode(null);
          }}
        />
      )}

      {mode === null && (
        <>
          <p className="muted small">
            {books.length === 0
              ? "No books recorded here yet."
              : `${books.length} book${books.length === 1 ? "" : "s"} recorded.`}
          </p>
          <ul className="book-list">
            {books.map((b) => (
              <li key={b.id} className="book-row">
                {b.coverUrl ? (
                  <img className="cover" src={b.coverUrl} alt="" loading="lazy" />
                ) : (
                  <div className="cover cover-blank" aria-hidden="true" />
                )}
                <div className="book-meta">
                  <span className="book-title">{b.title}</span>
                  {b.authors?.length > 0 && (
                    <span className="book-author">{b.authors.join(", ")}</span>
                  )}
                  <span className="book-status">{statusLabel(b.status)}</span>
                  {b.notes && <span className="book-notes">{b.notes}</span>}
                </div>
                <div className="book-actions">
                  <button type="button" className="btn btn-small" onClick={() => setMode(b.id)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-small btn-quiet"
                    onClick={() => onRemove(b.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
