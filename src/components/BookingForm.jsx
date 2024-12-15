import { useState } from "react";
import API from "../services/api";

const BookingForm = ({ packageId, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        travelers: 1,
        specialRequests: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post("/bookings", { ...formData, packageId });
            alert(response.data.message);
            onSuccess();
        } catch (err) {
            alert("Failed to create booking. Please try again.");
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
    <input className="input" type="text" name="name" placeholder="Name" required onChange={handleChange} />
    <input className="input" type="email" name="email" placeholder="Email" required onChange={handleChange} />
    <input className="input" type="tel" name="phone" placeholder="Phone" required onChange={handleChange} />
    <input className="input" type="number" name="travelers" placeholder="Travelers" required min="1" onChange={handleChange} />
    <textarea name="specialRequests" placeholder="Special Requests" onChange={handleChange} className="input"></textarea>
    <button type="submit" className="btn-primary">Book Now</button>
</form>

    );
};

export default BookingForm;
