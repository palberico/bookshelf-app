import { useState } from "react";
import Modal from "./Modal";
import { describeCell } from "../lib/cells";

export default function AddBookModal({ cellId, onSave, onCancel }) {
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    setBusy(true);
    await onSave({
      title: title.trim(),
      authors: authors
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      isbn: null,
      coverUrl: null,
      status: "owned",
      notes: "",
      cellId,
    });
    setBusy(false);
  }

  return (
    <Modal title={`Add a book — Shelf ${cellId}`} onClose={onCancel}>
      <p className="muted small">{describeCell(cellId)}</p>
      <form className="book-form" onSubmit={handleSubmit}>
        <label className="field">
          <span>Title</span>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required autoFocus />
        </label>
        <label className="field">
          <span>Author(s)</span>
          <input
            value={authors}
            onChange={(e) => setAuthors(e.target.value)}
            placeholder="Separate multiple with commas"
          />
        </label>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={busy}>
            {busy ? "Adding…" : "Add to shelf"}
          </button>
          <button type="button" className="btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}
