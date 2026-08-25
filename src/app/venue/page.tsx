import type { Metadata } from "next";
import { EVENT } from "@/lib/data";
import Venue from "@/components/Venue";

export const metadata: Metadata = {
  title: `赛事地点 | ${EVENT.name}`,
};

export default function VenuePage() {
  return <Venue />;
}
