const FEEDBACK_MODAL_SEEN_KEY = "fomonda_feedback_modal_seen";

export function hasSeenFeedbackModal(): boolean {
  return window.localStorage.getItem(FEEDBACK_MODAL_SEEN_KEY) !== null;
}

export function markFeedbackModalSeen(): void {
  window.localStorage.setItem(FEEDBACK_MODAL_SEEN_KEY, "true");
}
