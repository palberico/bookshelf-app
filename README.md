# The Shelf

A virtual copy of the bookshelf, plus a record of which books sit on which shelf.

React + Vite on the front, Firebase (Auth + Firestore) on the back.

## Run it

```bash
npm install
npm run dev
```

That's it — it boots at http://localhost:5173 with no configuration.

Without Firebase credentials the app runs in **local demo mode**: it signs you in
as a stub user and saves books to `localStorage`. Good enough to click around,
add a few books, and see the search work. Nothing syncs anywhere.

## Connect Firebase

1. Create a project at https://console.firebase.google.com
2. **Build → Authentication → Sign-in method** → enable **Email/Password**
3. **Build → Authentication → Users** → add one user per family member (this
   app has no self-serve signup — accounts are created here, by hand)
4. **Build → Firestore Database** → create a database
5. **Project settings → General → Your apps** → add a Web app, copy the config
6. `cp .env.example .env` and paste the values in
7. Restart `npm run dev`

The banner disappears and you get real Firestore sync. The shelf itself is
viewable without signing in; clicking **Add a book** prompts for one of the
email/password accounts created above. Every family member's account writes
to the same shared library — there's no per-user data split.

To push the security rules:

```bash
npm install -g firebase-tools
firebase login
firebase use --add          # pick your project
firebase deploy --only firestore:rules
```

## Data model

Shelves are **not** stored in the database — they come from the `LAYOUT`
constant inside `src/components/Bookshelf.jsx`. Only books are persisted:

```
users/family/books/{bookId}
  title     string        "The Complete Sherlock Holmes"
  authors   string[]      ["Sir Arthur Conan Doyle"]
  isbn      string|null   "9780385416283"
  coverUrl  string|null
  cellId    string        "C3"
  status    string        owned | reading | read | lent
  notes     string
  addedAt   timestamp
```

`{uid}` is always the fixed string `"family"`, not the signed-in account's own
auth uid — every family member's login writes to the same shared library
(see `App.jsx`'s `HOUSEHOLD_ID`).

A flat collection with a `cellId` field, rather than books nested under
shelves — because most queries are across the whole collection (search,
"what's unread"), and re-shelving a book is then a one-field update.

## Layout

```
src/
  App.jsx                  wires auth, books, selection, search
  components/
    Bookshelf.jsx          the shelf itself (see note below)
    SearchBar.jsx          title/author search + jump to shelf
    ShelfPanel.jsx         books on the selected shelf
    BookForm.jsx           edit an existing book, with ISBN lookup
    AddBookModal.jsx       quick add (title + author) tied to the open shelf
    LoginModal.jsx         email/password prompt, shown before an add
    Modal.jsx              shared overlay/dialog shell
  hooks/
    useAuth.js
    useBooks.js            live subscription + byCell index
  lib/
    firebase.js            init; exports isConfigured
    store.js               Firestore repository
    localStore.js          localStorage fallback (demo mode)
    lookup.js              ISBN -> metadata (Open Library, then Google Books)
    cells.js               shelf inventory and labels
    shelfFocus.js          search-result -> shelf highlight bridge
```

## Two known seams

**1. `cells.js` duplicates the shelf inventory.** `Bookshelf.jsx` doesn't export
its `LAYOUT`, so the list of shelves and which ones hold books lives in
`src/lib/cells.js` as well. If you add or remove a shelf, update both. The clean
fix is one word in `Bookshelf.jsx`:

```diff
-const LAYOUT = [
+export const LAYOUT = [
```

then import it in `cells.js` and derive `BOOK_CELLS` from it.

**2. `shelfFocus.js` clicks a DOM node.** `Bookshelf` owns its `selected` state
and takes no controlled prop, so making a search result light up its shelf is
done by finding the button via its `aria-label` and clicking it. Works, but it's
a stopgap. The clean fix is a `selected` prop on `Bookshelf`; then delete
`shelfFocus.js` and pass state down.

Both were left alone deliberately — `Bookshelf.jsx` is otherwise untouched.

## Next

- Barcode scanning from a phone camera (ZXing or the Barcode Detection API)
  feeding straight into `lookupIsbn` — this is what makes cataloguing a few
  hundred books tolerable.
- Batch entry: pick a shelf once, then scan repeatedly without re-selecting.
- Vision-model spine reading for the older volumes with no ISBN.


# Project context: The Shelf

Drop this at the repo root. It's a knowledge transfer document, not a task list —
it describes what this project is, what has already been decided, and where the
unresolved parts are.

---

## What we're building

A web app that reproduces a specific physical bookshelf on screen, and records
which books are on it and where each one sits.

Two jobs, in order of how much they'll actually get used:

1. **Do I own this / have I read it?** — searchable catalog with read/unread/lent state.
2. **Where is it?** — search a title, the matching shelf lights up on the virtual shelf.

There's a third, unstated job: it should be a pleasant object to look at. The
visual fidelity of the bookshelf is not decoration on top of the app; it's half
the reason the app exists.

**Who uses it:** one person — the owner's wife. Single-user, personal. Not a
product, no multi-tenant concerns, no growth story.

---

## The physical object

A white built-in wall unit, seven columns ("bays"). The far-left and far-right
bays are roughly double the width of the middle five.

It is **not a grid.** Row counts and shelf heights vary per bay:

| Bay | Cells | Notes |
|-----|-------|-------|
| A | 5 | widest bay |
| B | 5 | |
| C | 4 | tall top opening for a branch vase, plus a short "half shelf" |
| D | 5 | |
| E | 4 | same shape as C — tall vase opening + half shelf |
| F | 5 | densest bay; every cell is books, no decor |
| G | 5 | widest bay on the right |

Shelf lines **do** align across all seven bays at two heights (row 4 and row 5
tops). Above that, they don't. Every bay normalizes to the same 1700-unit total
height, so the two aligned lines land at 1000 and 1370 in every bay.

28 of the 33 cells hold books. The rest hold decor only and are non-selectable.

Several cells hold books *and* objects, in sequence — e.g. G3 reads: books,
book nook, books, one book, rose dome, books. This is why the cell schema is an
ordered list rather than a left/right split.

---

## Current state

**Done and verified:**

- The visual bookshelf component, matched cell-by-cell against close-up photos
  of every shelf. Every decor object is hand-drawn inline SVG except one small
  egg in F5, which is still a text label.
- Vite + React + Firebase scaffold. `npm install && npm run dev` boots with no
  configuration.
- Local demo mode: with no Firebase credentials, the app stubs a user and
  persists to `localStorage` so it's usable immediately.
- Firebase Auth (email/password, accounts added by hand in the console),
  Firestore repository, security rules, composite index. Viewing the shelf
  needs no sign-in; adding a book prompts for a login.
- Add/edit/remove books on a selected shelf.
- ISBN lookup: Open Library first, Google Books as fallback. No key, no proxy.
- Title/author search; clicking a result highlights that shelf.

**Not done:** any real book data. The database is empty. Everything above is
plumbing waiting for content.

---

## Architecture

```
src/
  App.jsx                  auth + books + selection + search wiring
  components/
    Bookshelf.jsx          the shelf itself — see "Rules of engagement"
    SearchBar.jsx
    ShelfPanel.jsx         books on the selected shelf
    BookForm.jsx           edit an existing book, with ISBN lookup
    AddBookModal.jsx       quick add (title + author) tied to the open shelf
    LoginModal.jsx         email/password prompt, shown before an add
    Modal.jsx              shared overlay/dialog shell
  hooks/
    useAuth.js
    useBooks.js            live subscription + byCell index + searchBooks()
  lib/
    firebase.js            init; exports isConfigured
    store.js               Firestore repository
    localStore.js          localStorage fallback used when isConfigured is false
    lookup.js              ISBN -> metadata
    cells.js               shelf inventory, labels, BOOK_CELLS
    shelfFocus.js          search result -> shelf highlight bridge
```

### Data model

```
users/family/books/{bookId}
  title     string
  authors   string[]
  isbn      string | null
  coverUrl  string | null
  cellId    string        "C3"
  status    "owned" | "reading" | "read" | "lent"
  notes     string
  addedAt   timestamp
```

**Shelves are not in the database.** They come from the `LAYOUT` constant inside
`Bookshelf.jsx`. The shelf is a fixed physical object; storing it would mean
keeping two representations in sync for no benefit.

Books are a **flat collection with a `cellId` field**, not nested under shelves.
Most queries are collection-wide (search, "what's unread"), and re-shelving a
book becomes a one-field update.

---

## Decisions already made, and why

**Cell contents are an ordered array, not a left/right split.** An earlier
schema had `decor: { side: "left" | "mid" | "right" }` and it couldn't express
shelves that alternate books and objects more than once. The `content: [...]`
array — where each segment is a book run, an object, or a spacer, with a width
fraction — replaced it. This is also the shape the shelf data naturally has:
a sequence, read left to right.

**Spine widths are relative weights, not pixels.** They were pixels once, and
book runs overflowed their segment and rendered *underneath* neighbouring
objects. `SpineRun` now sums the weights and assigns each spine a percentage.
Overflow is structurally impossible at any container size.

**Small shelves use explicit spines, not generated ones.** Under about five
books, generated widths/colors/heights look wrong and, more importantly, encode
a guess. Where photos show legible spines, the books are listed explicitly with
real colors and heights.

**Decor is drawn, not labeled.** Every object is inline SVG in an `ART` registry,
keyed from the layout by an `art:` field. Objects that aren't drawn fall back to
a text label automatically. Cost of this choice: each drawn object is a piece of
the shelf that can only be updated by editing SVG, not config.

**Selection reads as a lamp switching on** over the chosen cell rather than a
border or a highlight color. The room has Edison bulbs hanging in front of the
real shelf; finding a book should feel like light falling on the right spot.
Cell IDs (`A1`, `C3`) render small and faint — they're for debugging and for
verifying the map, not for wayfinding. A human-readable location string
("middle shelf, third column") does the actual communicating.

---

## Rules of engagement

**`Bookshelf.jsx` is signed off visually.** Don't restyle it, don't adjust the
layout numbers, don't redraw the artwork, don't "improve" the color palettes.
It was built by iterating against photographs of every individual shelf and it
matches. Functional changes (props, event handling) are fair game; appearance
is not.

One functional change was already made to it: cells using the `content` model
weren't selectable, because `hasBooks` only checked `cell.books`. Twelve shelves
— most of the books on the wall — were rendering disabled. Fixed by also
checking content segments. Zero visual change.

---

## Known seams

**1. `cells.js` duplicates the shelf inventory.** `Bookshelf.jsx` doesn't export
`LAYOUT`, so the bay list, cell counts, and the 28-entry `BOOK_CELLS` array are
restated in `src/lib/cells.js`. Verified to match exactly at time of writing;
it will drift the moment a shelf is edited. The one-word fix is
`export const LAYOUT` and deriving `BOOK_CELLS` from it.

**2. `shelfFocus.js` clicks a DOM node.** `Bookshelf` owns its `selected` state
and takes no controlled prop, so lighting up a shelf from a search result is
done by finding the button via `aria-label` and calling `.click()`. Isolated to
one file. The clean replacement is a `selected` prop on `Bookshelf`.

Both were left in deliberately to avoid touching the shelf component.

---

## Unresolved problems

**Data entry is the whole project.** Roughly 300–400 books. The visual is done;
the app is empty. Nothing else matters until books are in it, and nothing about
the entry flow has been built beyond a one-book-at-a-time form.

**A large fraction of these books have no ISBN.** The collection is heavy on
leather-bound sets, Franklin/Easton editions, Nelson Doubleday reprints, and
pre-1970 hardcovers. Barcode scanning covers maybe half the wall. The half it
misses is the half that's most distinctive.

**The shelf physically rearranges.** Between the first wide photograph and the
close-ups — roughly a week — A5's contents were entirely replaced and an antler
moved from A5 to A1. Any location data will go stale unless re-shelving is
cheaper than ignoring it.

**Book counts were consistently over-estimated during the build.** Two shelves
were modeled with more books than they hold (B2: 8 vs 3 actual; C3: 8 vs 6).
Where a photo shows the spines, trust the photo over any earlier estimate.

---

## Where truth lives

- **Shelf geometry and contents:** the `LAYOUT` constant in `Bookshelf.jsx`,
  which was built directly from photographs. Not this document.
- **What the shelf actually looks like right now:** the photographs, and after
  that, the physical object. Both outrank the code.
- **Book data:** Firestore, once it exists. Nothing is seeded.