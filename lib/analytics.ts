export type AnalyticsEventName = "resume_download" | "project_open" | "contact_click";

type AnalyticsPayload = {
  target: string;
  source: string;
};

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function trackEvent(eventName: AnalyticsEventName, payload: AnalyticsPayload) {
  const event = {
    event: eventName,
    ...payload,
    path: window.location.pathname,
    timestamp: new Date().toISOString(),
  };

  window.dataLayer?.push(event);
  window.dispatchEvent(new CustomEvent("pes:analytics", { detail: event }));
}
