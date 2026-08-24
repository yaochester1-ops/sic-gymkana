import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Drivers from "@/components/Drivers";
import Venue from "@/components/Venue";
import PrizePool from "@/components/PrizePool";
import LapTimeBoard from "@/components/LapTimeBoard";
import Rules from "@/components/Rules";
import Registration from "@/components/Registration";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Venue />
        <PrizePool />
        <LapTimeBoard />
        <Rules />
        <Drivers />
        <Registration />
      </main>
      <Footer />
    </>
  );
}
