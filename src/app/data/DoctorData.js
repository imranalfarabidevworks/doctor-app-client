
export const getTopDoctors = async () => {
  const res= await fetch("http://localhost:5000/doctors");
  const doctors = await res.json();
  return doctors;
}