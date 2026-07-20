import { useMemo, useState } from "react";
import Bookshelf from "./components/Bookshelf";
import SearchBar from "./components/SearchBar";
import ShelfPanel from "./components/ShelfPanel";
import { useAuth } from "./hooks/useAuth";
import { useBooks, searchBooks } from "./hooks/useBooks";
import { focusShelf } from "./lib/shelfFocus";
import { isConfigured } from "./lib/firebase";

// The whole family shares one library, regardless of which family member is
// signed in — book documents live under this fixed id, not the auth uid.
const HOUSEHOLD_ID = "family";

export default function App() {
  const { user, ready, error: authError, signIn } = useAuth();
  const { byCell, books, loading, add, update, remove } = useBooks(HOUSEHOLD_ID);

  const [selectedCell, setSelectedCell] = useState(null);
  const [term, setTerm] = useState("");

  const results = useMemo(() => searchBooks(books, term), [books, term]);

  if (!ready) return <div className="boot">Loading…</div>;

  function handlePickResult(book) {
    focusShelf(book.cellId, selectedCell);
    setSelectedCell(book.cellId);
  }

  return (
    <div className="app">
      {!isConfigured && (
        <div className="banner">
          Local demo mode — books are saved to this browser only. Add your Firebase keys
          to <code>.env</code> to sync properly.
        </div>
      )}

      <header className="app-head">
        <h1 className="app-title">The Shelf</h1>
        <SearchBar value={term} onChange={setTerm} results={results} onPick={handlePickResult} />
      </header>

      <main>
        <Bookshelf onSelectCell={setSelectedCell} />

        {loading ? (
          <section className="panel panel-empty">
            <p className="muted">Loading your books…</p>
          </section>
        ) : (
          <ShelfPanel
            cellId={selectedCell}
            books={byCell[selectedCell] || []}
            user={user}
            authError={authError}
            onSignIn={signIn}
            onAdd={add}
            onUpdate={update}
            onRemove={remove}
          />
        )}
      </main>
    </div>
  );
}
