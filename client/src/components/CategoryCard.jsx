// components/CategoryCard.jsx
import { Link } from "react-router-dom";

function CategoryCard({ title, image }) {
  return (
    <Link 
      to={`/shop`} 
      className="block group"
    >
      <div className="cursor-pointer rounded-2xl shadow-md overflow-hidden bg-white transform transition duration-300 hover:scale-105 hover:shadow-xl">
        <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:opacity-90 transition"
          />
        </div>
        <h3 className="text-center text-xl font-semibold py-4 text-gray-800 group-hover:text-blue-600 transition">
          {title}
        </h3>
      </div>
    </Link>
  );
}

export default CategoryCard;
