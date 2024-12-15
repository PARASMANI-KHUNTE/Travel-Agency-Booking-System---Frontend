import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import BookingForm from "../components/BookingForm";

const PackageDetails = () => {
    const { id } = useParams();
    const [packageData, setPackageData] = useState(null);

    useEffect(() => {
        const fetchPackage = async () => {
            try {
                const response = await API.get(`/packages/${id}`);
                setPackageData(response.data);
            } catch (err) {
                console.error("Error fetching package details");
            }
        };

        fetchPackage();
    }, [id]);

    if (!packageData) return <p>Loading...</p>;

    return (
        <div className="space-y-4">
            <img src={packageData.image} alt={packageData.title} className="rounded-md w-full h-64 object-cover" />
            <h1 className="text-3xl font-bold">{packageData.title}</h1>
            <p className="text-gray-700">{packageData.description}</p>
            <p className="font-bold text-xl">Price: ${packageData.price}</p>
            <h2 className="text-2xl font-semibold mt-6">Book this Package</h2>
            <BookingForm packageId={id} onSuccess={() => alert("Booking successful!")} />
        </div>
    );
};

export default PackageDetails;
