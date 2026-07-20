/**
 * Temporary bridge for "search a title -> light up its shelf".
 *
 * Bookshelf.jsx owns its own `selected` state and takes no controlled prop,
 * so there is no clean way to drive the highlight from outside. Rather than
 * edit that file, this finds the shelf button by its aria-label and clicks it.
 *
 * When you want the clean version, add a `selected` prop to Bookshelf and
 * delete this file. Everything else keeps working.
 */
export function focusShelf(cellId, currentlySelected) {
  if (!cellId || cellId === currentlySelected) return false;
  const el = document.querySelector(`button[aria-label^="Shelf ${cellId},"]`);
  if (!el || el.disabled) return false;
  el.click();
  el.scrollIntoView({ block: "nearest", behavior: "smooth" });
  return true;
}
