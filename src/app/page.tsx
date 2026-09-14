import Hero from "@/components/Hero";
import EventStats from "@/components/EventStats";
import Venue from "@/components/Venue";
import Drivers from "@/components/Drivers";
import PrizePool from "@/components/PrizePool";
import Rules from "@/components/Rules";
import Partners from "@/components/Partners";

export default function Home() {
  return (
    <>
      <Hero />
      <EventStats />
      <Venue />
      <Drivers />
      <PrizePool />
      <Rules />
      <Partners />
    </>
  );
}
