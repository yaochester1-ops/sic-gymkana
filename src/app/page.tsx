import Hero from "@/components/Hero";
import EventIntroduction from "@/components/EventIntroduction";
import Venue from "@/components/Venue";
import PrizePool from "@/components/PrizePool";
import Partners from "@/components/Partners";

export default function Home() {
  return (
    <>
      <Hero />
      <EventIntroduction />
      <PrizePool />
      <Venue />
      <Partners />
    </>
  );
}
