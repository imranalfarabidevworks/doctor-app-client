import Banner from "./components/Banner";
import TopDoctors from "./components/TopDoctors";
import StatsSection from "./components/StatsSection";
import WhyChooseUs from "./components/WhyChooseUs";
export default function Home() {
  return (
    <>
      <Banner />
      <StatsSection />
      <TopDoctors />
      <WhyChooseUs />
      {/* এর নিচে বাকি দুটো এডিশনাল সেকশন আসবে */}
    </>
  );
}