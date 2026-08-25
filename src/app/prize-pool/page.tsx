import type { Metadata } from "next";
import { EVENT } from "@/lib/data";
import PrizePool from "@/components/PrizePool";

export const metadata: Metadata = {
  title: `奖池 | ${EVENT.name}`,
};

export default function PrizePoolPage() {
  return <PrizePool />;
}
