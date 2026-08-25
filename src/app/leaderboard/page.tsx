import type { Metadata } from "next";
import { EVENT } from "@/lib/data";
import LapTimeBoard from "@/components/LapTimeBoard";

export const metadata: Metadata = {
  title: `圈速榜 | ${EVENT.name}`,
};

export default function LeaderboardPage() {
  return <LapTimeBoard />;
}
