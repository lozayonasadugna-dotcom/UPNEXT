import type { Metadata } from "next";
import MyNextMove from "@/components/MyNextMove";

export const metadata: Metadata = { title: "My Next Move", description: "Track saved opportunities, tasks, and application status.", alternates: { canonical: "/my-next-move" } };

export default function Page() { return <MyNextMove />; }
