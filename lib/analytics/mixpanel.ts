"use client";

import mixpanel from "mixpanel-browser";

let initialized = false;

function ensureInit(): boolean {
  if (initialized) return true;
  const token = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
  if (!token) return false;

  mixpanel.init(token, {
    track_pageview: false,
    persistence: "localStorage",
  });
  initialized = true;
  return true;
}

export function trackEvent(name: string, props?: Record<string, unknown>): void {
  if (!ensureInit()) return;
  mixpanel.track(name, props);
}

export function trackPageView(path: string): void {
  trackEvent("Page View", { path });
}
