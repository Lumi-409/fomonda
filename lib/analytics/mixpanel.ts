"use client";

import mixpanel from "mixpanel-browser";

let initialized = false;

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

function captureUtmParams(): void {
  const params = new URLSearchParams(window.location.search);
  const utmProps: Record<string, string> = {};
  UTM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) utmProps[key] = value;
  });
  if (Object.keys(utmProps).length > 0) {
    mixpanel.register(utmProps);
  }
}

function ensureInit(): boolean {
  if (initialized) return true;
  const token = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
  if (!token) return false;

  mixpanel.init(token, {
    track_pageview: false,
    persistence: "localStorage",
  });
  captureUtmParams();
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
