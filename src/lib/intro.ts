const INTRO_DONE_EVENT = "mf:intro-done";
export { INTRO_STORAGE_KEY } from "./storage";

// The intro is pending while its overlay is in the DOM and has not finished.
export function isIntroPending(): boolean {
  if (typeof document === "undefined") return false;
  return (
    document.documentElement.dataset.intro !== "done" &&
    document.querySelector("[data-intro-overlay]") !== null
  );
}

export function markIntroDone(): void {
  document.documentElement.dataset.intro = "done";
  window.dispatchEvent(new Event(INTRO_DONE_EVENT));
}

export function onIntroDone(callback: () => void): () => void {
  if (!isIntroPending()) {
    callback();
    return () => {};
  }
  window.addEventListener(INTRO_DONE_EVENT, callback, { once: true });
  return () => window.removeEventListener(INTRO_DONE_EVENT, callback);
}
