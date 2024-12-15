import { useState, useEffect } from "react";
import { Link } from "react-router-dom";  // Import Link from React Router
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
        <div>
            {/* Admin Button */}
            <div className="text-center mb-4">
                <Link to="/admin">
                    <button className="btn-primary">Go to Admin Panel</button>
                </Link>
            </div>

            {/* Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {packages.map((pkg) => (
                    <PackageCard key={pkg._id} packageData={pkg} />
                ))}
            </div>
        </div>
    );
};

export default Home;
