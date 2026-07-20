import { describeCell } from "../lib/cells";

export default function SearchBar({ value, onChange, results, onPick }) {
  return (
    <div className="search">
      <input
        className="search-input"
        type="search"
        value={value}
        placeholder="Find a book by title or author…"
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search books"
      />

      {value.trim().length >= 2 && (
        <div className="search-results">
          {results.length === 0 ? (
            <p className="muted small">Nothing on the shelves matches that.</p>
          ) : (
            <ul className="result-list">
              {results.map((b) => (
                <li key={b.id}>
                  <button type="button" className="result" onClick={() => onPick(b)}>
                    <span className="result-title">{b.title}</span>
                    {b.authors?.length > 0 && (
                      <span className="result-author">{b.authors.join(", ")}</span>
                    )}
                    <span className="result-where">
                      <strong>{b.cellId}</strong> · {describeCell(b.cellId)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
