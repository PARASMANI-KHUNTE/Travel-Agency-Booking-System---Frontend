import { Link } from "react-router-dom";

const PackageCard = ({ packageData }) => {
    const { _id, title, description, price, image } = packageData;

    return (
        <div className="border rounded-lg p-4 shadow-lg">
            <img src={image} alt={title} className="rounded-md mb-4 w-full h-48 object-cover" />
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-sm text-gray-600 mt-2">{description}</p>
            <p className="font-bold text-lg mt-4">Price: ${price}</p>
            <Link to={`/packages/${_id}`} className="block bg-blue-600 text-white text-center mt-4 py-2 rounded-md">
                View Details
            </Link>
        </div>
    );
};

export default PackageCard;
