"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackPageView as trackMixpanelPageView } from "@/lib/analytics/mixpanel";
import { trackPageView as trackGaPageView } from "@/lib/analytics/ga";

export default function AnalyticsPageView() {
  const pathname = usePathname();

  useEffect(() => {
    trackMixpanelPageView(pathname);
    trackGaPageView(pathname);
  }, [pathname]);

  return null;
}
