import React from "react";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-600 text-white px-6 relative">
      <h1 className="text-9xl font-extrabold tracking-widest drop-shadow-lg">404</h1>
      <div className="bg-white px-3 py-1 text-sm rounded rotate-12 absolute shadow-md text-blue-600 font-semibold">
        Page Not Found
      </div>

      <p className="mt-8 text-lg md:text-xl text-center max-w-lg text-blue-100">
        Oops! The page you’re looking for doesn’t exist or may have been moved.
      </p>

      <button
        onClick={() => navigate("/")}
        className="mt-10 px-6 py-3 bg-white text-blue-600 font-semibold text-lg rounded-xl shadow-lg hover:bg-blue-100 transition duration-300"
      >
        Go Home
      </button>
    </div>
  );
}

export default PageNotFound;
