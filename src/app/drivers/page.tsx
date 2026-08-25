import type { Metadata } from "next";
import { EVENT } from "@/lib/data";
import Drivers from "@/components/Drivers";

export const metadata: Metadata = {
  title: `参赛车手 | ${EVENT.name}`,
};

export default function DriversPage() {
  return <Drivers />;
}
