"use client";

import type { ComponentPropsWithoutRef } from "react";
import { trackEvent, type AnalyticsEventName } from "@/lib/analytics";

type TrackedLinkProps = ComponentPropsWithoutRef<"a"> & {
  eventName: AnalyticsEventName;
  eventTarget: string;
  eventSource: string;
};

export function TrackedLink({
  eventName,
  eventTarget,
  eventSource,
  href,
  children,
  onClick,
  ...props
}: TrackedLinkProps) {
  return (
    <a
      {...props}
      href={href}
      onClick={(event) => {
        trackEvent(eventName, { target: eventTarget, source: eventSource });
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
