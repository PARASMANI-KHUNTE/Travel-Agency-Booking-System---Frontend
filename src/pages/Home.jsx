import { useState, useEffect } from "react";
import API from "../services/api";
import PackageCard from "../components/PackageCard";

const Home = () => {
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await API.get("/packages");
                setPackages(response.data);
            } catch (err) {
                console.error("Error fetching packages");
            }
        };

        fetchPackages();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {packages.map((pkg) => (
                <PackageCard key={pkg._id} packageData={pkg} />
            ))}
        </div>
    );
};

export default Home;
