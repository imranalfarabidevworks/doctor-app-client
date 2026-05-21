import Banner from "./components/Banner";
import TopDoctors from "./components/TopDoctors";
import StatsSection from "./components/StatsSection";
import WhyChooseUs from "./components/WhyChooseUs";

export default async function Home() {
  let doctors = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors`, {
      cache: "no-store",
    });
    const data = await res.json();
    doctors = data.data || [];
  } catch (error) {
    console.error("Failed to fetch doctors:", error);
  }

  return (
    <>
      <Banner />
      <StatsSection />
      <TopDoctors doctors={doctors} />
      <WhyChooseUs />
    </>
  );
}