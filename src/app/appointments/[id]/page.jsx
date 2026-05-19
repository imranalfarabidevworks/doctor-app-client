const DoctorDetails = async ({params}) => {
const { id } =await params; // Get the doctor ID from the URL parameters
console.log("Doctor ID:", id); // Log the doctor ID to verify it's being received
        return (
            <div>
                <h1>Doctor Details</h1>
            </div>  
        );
    }
export default DoctorDetails;