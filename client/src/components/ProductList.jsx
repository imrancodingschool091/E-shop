import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import ProductCard from "./ProductCard";
import { getAllProducts, setPage } from "../features/products/productSlice";

function ProductList() {
  const dispatch = useDispatch();
  const { 
    isLoading, 
    products, 
    isError, 
    message, 
    pages, 
    page, 
    total,
    filters 
  } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProducts({ page, ...filters }));
  }, [dispatch, page]);

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  if (isLoading) return <Loader />;
  
  if (isError) {
    return (
      <div className="text-red-500 font-semibold p-4">
        Error: {message || "Something went wrong"}
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Product List</h2>
        <span className="text-sm text-gray-500">
          Showing {products.length} of {total} products
        </span>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600 text-lg">No products found.</p>
          <p className="text-gray-500 text-sm">Try adjusting your filters.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {pages > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition"
              >
                Previous
              </button>
              
              {[...Array(pages)].map((_, index) => {
                const pageNumber = index + 1;
                // Show limited page numbers with ellipsis for many pages
                if (
                  pageNumber === 1 || 
                  pageNumber === pages || 
                  (pageNumber >= page - 1 && pageNumber <= page + 1)
                ) {
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`px-4 py-2 rounded ${
                        page === pageNumber
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                } else if (
                  pageNumber === page - 2 ||
                  pageNumber === page + 2
                ) {
                  return <span key={pageNumber} className="px-2">...</span>;
                }
                return null;
              })}
              
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === pages}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ProductList;