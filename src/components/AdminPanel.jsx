import { useState, useEffect } from "react";
import API from "../services/api";

const AdminPanel = () => {
    const [packages, setPackages] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [newPackage, setNewPackage] = useState({
        title: "",
        description: "",
        price: "",
        availableDates: "",
        image: ""
    });
    const [selectedPackage, setSelectedPackage] = useState(null);

    // Fetch all packages
    const fetchPackages = async () => {
        try {
            const response = await API.get("/packages");
            setPackages(response.data);
        } catch (err) {
            console.error("Error fetching packages");
        }
    };

    // Fetch all bookings
    const fetchBookings = async () => {
        try {
            const response = await API.get("/admin/bookings");
            setBookings(response.data);
        } catch (err) {
            console.error("Error fetching bookings");
        }
    };

    // Add new package
    const handleAddPackage = async (e) => {
        e.preventDefault();
        try {
            await API.post("/admin/packages", newPackage);
            fetchPackages();
            setNewPackage({ title: "", description: "", price: "", availableDates: "", image: "" });
        } catch (err) {
            console.error("Error adding package");
        }
    };

    // Update an existing package
    const handleUpdatePackage = async (e) => {
        e.preventDefault();
        try {
            if (selectedPackage) {
                await API.put(`/admin/packages/${selectedPackage._id}`, selectedPackage);
                fetchPackages();
                setSelectedPackage(null); // Reset after update
            }
        } catch (err) {
            console.error("Error updating package");
        }
    };

    // Delete a package
    const deletePackage = async (id) => {
        if (window.confirm("Are you sure you want to delete this package?")) {
            try {
                await API.delete(`/admin/packages/${id}`);
                fetchPackages();
            } catch (err) {
                alert("Failed to delete package.");
            }
        }
    };

    useEffect(() => {
        fetchPackages();
        fetchBookings();
    }, []);

    const handlePackageChange = (e) => {
        const { name, value } = e.target;
        if (selectedPackage) {
            setSelectedPackage({ ...selectedPackage, [name]: value });
        } else {
            setNewPackage({ ...newPackage, [name]: value });
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Admin Panel</h1>

            {/* Add/Update Package Form */}
            <div className="bg-white p-4 rounded shadow-md mb-8">
                <h2 className="text-2xl font-semibold mb-4">{selectedPackage ? 'Update Package' : 'Add New Package'}</h2>
                <form onSubmit={selectedPackage ? handleUpdatePackage : handleAddPackage} className="space-y-4">
                    <input
                        type="text"
                        name="title"
                        placeholder="Package Title"
                        value={selectedPackage ? selectedPackage.title : newPackage.title}
                        onChange={handlePackageChange}
                        className="input w-full"
                    />
                    <textarea
                        name="description"
                        placeholder="Package Description"
                        value={selectedPackage ? selectedPackage.description : newPackage.description}
                        onChange={handlePackageChange}
                        className="input w-full"
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={selectedPackage ? selectedPackage.price : newPackage.price}
                        onChange={handlePackageChange}
                        className="input w-full"
                    />
                    <input
                        type="text"
                        name="availableDates"
                        placeholder="Available Dates"
                        value={selectedPackage ? selectedPackage.availableDates : newPackage.availableDates}
                        onChange={handlePackageChange}
                        className="input w-full"
                    />
                    <input
                        type="text"
                        name="image"
                        placeholder="Image URL"
                        value={selectedPackage ? selectedPackage.image : newPackage.image}
                        onChange={handlePackageChange}
                        className="input w-full"
                    />
                    <button type="submit" className="btn-primary w-full">{selectedPackage ? 'Update Package' : 'Add Package'}</button>
                </form>
            </div>

            {/* Packages Table */}
            <h2 className="text-2xl font-semibold mb-4">Packages</h2>
            <table className="table-auto w-full mb-8 border-collapse">
                <thead>
                    <tr>
                        <th className="border-b px-4 py-2">Title</th>
                        <th className="border-b px-4 py-2">Price</th>
                        <th className="border-b px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {packages.map((pkg) => (
                        <tr key={pkg._id}>
                            <td className="border-b px-4 py-2">{pkg.title}</td>
                            <td className="border-b px-4 py-2">${pkg.price}</td>
                            <td className="border-b px-4 py-2">
                                <button onClick={() => deletePackage(pkg._id)} className="btn-danger">Delete</button>
                                <button onClick={() => setSelectedPackage(pkg)} className="btn-warning ml-2">Update</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Bookings Table */}
            <h2 className="text-2xl font-semibold mb-4">Bookings</h2>
<table className="table-auto w-full border-collapse">
    <thead>
        <tr>
            <th className="border-b px-4 py-2">Booking ID</th>
            <th className="border-b px-4 py-2">User</th>
            <th className="border-b px-4 py-2">Package</th>
            <th className="border-b px-4 py-2">Travelers</th>
            <th className="border-b px-4 py-2">Special Requests</th>
            <th className="border-b px-4 py-2">Total Price</th>
        </tr>
    </thead>
    <tbody>
        {bookings.map((booking) => (
            <tr key={booking._id}>
                <td className="border-b px-4 py-2">{booking._id}</td>
                <td className="border-b px-4 py-2">
                    {booking.userId ? booking.userId.name : 'Unknown User'}
                </td>
                <td className="border-b px-4 py-2">{booking.packageId ? booking.packageId.title : 'N/A'}</td>

                <td className="border-b px-4 py-2">{booking.numTravelers}</td>
                <td className="border-b px-4 py-2">{booking.specialRequests || 'N/A'}</td>
                <td className="border-b px-4 py-2">${booking.totalPrice}</td>
            </tr>
        ))}
    </tbody>
</table>
        </div>
    );
};

export default AdminPanel;
