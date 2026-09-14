import Hero from "@/components/Hero";
import EventStats from "@/components/EventStats";
import Venue from "@/components/Venue";
import Drivers from "@/components/Drivers";
import LapTimeBoard from "@/components/LapTimeBoard";
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
      <LapTimeBoard />
      <PrizePool />
      <Rules />
      <Partners />
    </>
  );
}
