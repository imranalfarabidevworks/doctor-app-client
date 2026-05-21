
export const getTopDoctors = async () => {
  const res= await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors`, { cache: "no-store" });
  const doctors = await res.json();
  return doctors;
}