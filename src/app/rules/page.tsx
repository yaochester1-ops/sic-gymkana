import type { Metadata } from "next";
import { EVENT } from "@/lib/data";
import Rules from "@/components/Rules";

export const metadata: Metadata = {
  title: `赛事规则 | ${EVENT.name}`,
};

export default function RulesPage() {
  return <Rules />;
}
