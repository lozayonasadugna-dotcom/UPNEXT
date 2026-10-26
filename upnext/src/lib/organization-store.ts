"use client";

import { useSyncExternalStore } from "react";
import { demoOrganization, type OrganizationProfile } from "@/lib/demo-workspace";

const KEY = "upnext-org-demo";
const CHANGE_EVENT = "upnext:organization-profile-changed";

function subscribe(listener: () => void) {
  window.addEventListener("storage", listener);
  window.addEventListener(CHANGE_EVENT, listener);
  return () => {
    window.removeEventListener("storage", listener);
    window.removeEventListener(CHANGE_EVENT, listener);
  };
}

function getSnapshot() {
  return window.localStorage.getItem(KEY);
}

function getServerSnapshot() {
  return null;
}

export function useOrganizationProfile(): OrganizationProfile {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  if (!raw) return demoOrganization;
  try {
    return { ...demoOrganization, ...JSON.parse(raw) };
  } catch (error) {
    console.error("Could not read the demo organization profile.", error);
    return demoOrganization;
  }
}

export function saveOrganizationProfile(profile: OrganizationProfile) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(profile));
  } catch (error) {
    console.error("Could not save the demo organization profile.", error);
    throw new Error("Your organization profile could not be saved in this browser.");
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}
