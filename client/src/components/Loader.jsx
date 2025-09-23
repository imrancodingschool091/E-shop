import React from "react";

function Loader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
      <p className="mt-4 text-blue-600 font-semibold text-lg">Loading...</p>
    </div>
  );
}

export default Loader;
