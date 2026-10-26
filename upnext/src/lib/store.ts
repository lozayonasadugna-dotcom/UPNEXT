"use client";
import { useSyncExternalStore } from "react";
import type { AppStatus } from "./types";

export interface Task { id: string; slug: string; title: string; due: string | null; done: boolean }
export interface Tracked { slug: string; status: AppStatus; note: string; updatedAt: number }
export interface State { saved: string[]; tracked: Record<string, Tracked>; tasks: Task[] }

const KEY = "upnext:v1";
const EMPTY: State = { saved: [], tracked: {}, tasks: [] };
let cache: State | null = null;
const listeners = new Set<() => void>();

function load(): State {
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(KEY);
    cache = raw ? { ...EMPTY, ...JSON.parse(raw) } : EMPTY;
  } catch {
    cache = EMPTY;
  }
  return cache as State;
}

function commit(next: State) {
  cache = next;
  try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* storage full or blocked */ }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => { listeners.delete(cb); };
}

export function useStore(): State {
  return useSyncExternalStore(subscribe, load, () => EMPTY);
}

export function toggleSave(slug: string) {
  const s = load();
  commit({ ...s, saved: s.saved.includes(slug) ? s.saved.filter((x) => x !== slug) : [...s.saved, slug] });
}

export function trackOpportunity(slug: string) {
  const s = load();
  if (s.tracked[slug]) return;
  commit({ ...s, tracked: { ...s.tracked, [slug]: { slug, status: "Interested", note: "", updatedAt: Date.now() } } });
}

export function untrack(slug: string) {
  const s = load();
  const tracked = { ...s.tracked };
  delete tracked[slug];
  commit({ ...s, tracked, tasks: s.tasks.filter((t) => t.slug !== slug) });
}

export function updateTracked(slug: string, patch: Partial<Pick<Tracked, "status" | "note">>) {
  const s = load();
  const cur = s.tracked[slug];
  if (!cur) return;
  commit({ ...s, tracked: { ...s.tracked, [slug]: { ...cur, ...patch, updatedAt: Date.now() } } });
}

export function addTask(slug: string, title: string, due: string | null) {
  const s = load();
  const task: Task = { id: Math.random().toString(36).slice(2) + Date.now().toString(36), slug, title, due, done: false };
  commit({ ...s, tasks: [...s.tasks, task] });
}

export function toggleTask(id: string) {
  const s = load();
  commit({ ...s, tasks: s.tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)) });
}

export function deleteTask(id: string) {
  const s = load();
  commit({ ...s, tasks: s.tasks.filter((t) => t.id !== id) });
}
