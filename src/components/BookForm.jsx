import { useState } from "react";
import { lookupIsbn } from "../lib/lookup";
import { BOOK_CELLS, STATUSES, describeCell } from "../lib/cells";

const EMPTY = {
  title: "",
  authors: "",
  isbn: "",
  coverUrl: "",
  status: "owned",
  notes: "",
};

export default function BookForm({ cellId, initial, onSave, onCancel }) {
  const [form, setForm] = useState(
    initial
      ? {
          ...EMPTY,
          ...initial,
          authors: (initial.authors || []).join(", "),
          isbn: initial.isbn || "",
          coverUrl: initial.coverUrl || "",
        }
      : EMPTY
  );
  const [targetCell, setTargetCell] = useState(initial?.cellId || cellId);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState(null);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function handleLookup() {
    setBusy(true);
    setNote(null);
    try {
      const found = await lookupIsbn(form.isbn);
      setForm((f) => ({
        ...f,
        title: found.title || f.title,
        authors: found.authors.length ? found.authors.join(", ") : f.authors,
        coverUrl: found.coverUrl || f.coverUrl,
        isbn: found.isbn,
      }));
      setNote(`Found via ${found.source}.`);
    } catch (e) {
      setNote(e.message);
    } finally {
      setBusy(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSave({
      title: form.title.trim(),
      authors: form.authors
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      isbn: form.isbn.trim() || null,
      coverUrl: form.coverUrl.trim() || null,
      status: form.status,
      notes: form.notes.trim(),
      cellId: targetCell,
    });
  }

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <div className="field-row">
        <label className="field grow">
          <span>ISBN</span>
          <input
            value={form.isbn}
            onChange={set("isbn")}
            placeholder="9780141439518"
            inputMode="numeric"
          />
        </label>
        <button type="button" className="btn" onClick={handleLookup} disabled={busy}>
          {busy ? "Looking…" : "Look up"}
        </button>
      </div>
      {note && <p className="muted small">{note}</p>}

      <label className="field">
        <span>Title</span>
        <input value={form.title} onChange={set("title")} required />
      </label>

      <label className="field">
        <span>Author(s)</span>
        <input
          value={form.authors}
          onChange={set("authors")}
          placeholder="Separate multiple with commas"
        />
      </label>

      <div className="field-row">
        <label className="field grow">
          <span>Shelf</span>
          <select value={targetCell} onChange={(e) => setTargetCell(e.target.value)}>
            {BOOK_CELLS.map((c) => (
              <option key={c} value={c}>
                {c} — {describeCell(c)}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Status</span>
          <select value={form.status} onChange={set("status")}>
            {STATUSES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="field">
        <span>Notes</span>
        <input value={form.notes} onChange={set("notes")} placeholder="Optional" />
      </label>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {initial ? "Save changes" : "Add to shelf"}
        </button>
        <button type="button" className="btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
