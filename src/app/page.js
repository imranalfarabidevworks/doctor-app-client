import Banner from "./components/Banner";
import TopDoctors from "./components/TopDoctors";
import StatsSection from "./components/StatsSection";
import WhyChooseUs from "./components/WhyChooseUs";
export default async function Home() {
  const res = await fetch("http://localhost:5000/doctors");
const data = await res.json();

const doctors = data.data;

  return (
    <>
      <Banner />
      <StatsSection />
      
<TopDoctors doctors={doctors} />
      <WhyChooseUs />
      {/* এর নিচে বাকি দুটো এডিশনাল সেকশন আসবে */}
    </>
  );
}