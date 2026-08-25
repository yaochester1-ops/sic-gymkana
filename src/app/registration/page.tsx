import type { Metadata } from "next";
import { EVENT } from "@/lib/data";
import Registration from "@/components/Registration";

export const metadata: Metadata = {
  title: `报名通道 | ${EVENT.name}`,
};

export default function RegistrationPage() {
  return <Registration />;
}
