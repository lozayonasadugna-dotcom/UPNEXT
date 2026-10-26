"use client";
import { useSyncExternalStore } from "react";
import type { Opportunity } from "./types";
import { deadlineLabel, isClosed } from "./format";

function subscribe(callback: () => void) {
  const interval = window.setInterval(callback, 60_000);
  return () => window.clearInterval(interval);
}

export function useDeadline(opportunity: Opportunity) {
  return useSyncExternalStore(
    subscribe,
    () => (isClosed(opportunity) ? "closed" : "open") + ":" + deadlineLabel(opportunity),
    () => "pending",
  );
}
