"use client";
import { useSyncExternalStore } from "react";

export interface Profile {
  username: string;
  avatar: string | null;
}

const KEY = "upnext:profile:v1";
const EMPTY: Profile = { username: "", avatar: null };
let cache: Profile | null = null;
const listeners = new Set<() => void>();

function load(): Profile {
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(KEY);
    const value: unknown = raw ? JSON.parse(raw) : EMPTY;
    if (value && typeof value === "object" && "username" in value && "avatar" in value) {
      const profile = value as Profile;
      cache = {
        username: typeof profile.username === "string" ? profile.username : "",
        avatar: typeof profile.avatar === "string" ? profile.avatar : null,
      };
    } else {
      cache = EMPTY;
    }
  } catch (error) {
    console.error("Could not load your saved profile.", error);
    cache = EMPTY;
  }
  return cache;
}

export function useProfile(): Profile {
  return useSyncExternalStore(subscribe, load, () => EMPTY);
}

export function updateProfile(patch: Partial<Profile>) {
  const next = { ...load(), ...patch };
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch (error) {
    console.error("Could not save your profile in this browser.", error);
    throw new Error("Your profile could not be saved. Check your browser storage and try again.");
  }
  cache = next;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}
