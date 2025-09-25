import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProfile, logoutUser, clearError } from "../features/auth/authSlice";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  // Fetch profile when authenticated but no user data
  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(getProfile());
    }
  }, [dispatch, isAuthenticated, user]);

  // Clear errors on mount
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/login");
    } catch (err) {
      navigate("/login");
    }
  };

  // --- Conditional Rendering ---

  // Show loading while fetching
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full animate-pulse bg-gray-500"></div>
          <div className="w-4 h-4 rounded-full animate-pulse bg-gray-500 delay-100"></div>
          <div className="w-4 h-4 rounded-full animate-pulse bg-gray-500 delay-200"></div>
          <p className="text-gray-600 text-lg ml-3">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Redirect only if NOT authenticated
  if (!isAuthenticated && !isLoading) {
    navigate("/login");
    return null;
  }

  // Show error if exists
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="max-w-lg w-full bg-white shadow-lg rounded-xl p-6 text-center">
          <div className="bg-red-100 text-red-700 border border-red-400 rounded-md p-4 mb-4">
            Error: {error}
          </div>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => dispatch(getProfile())}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Retry
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  console.log("User:",user)

  // Render user data
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          My Profile
        </h1>
        <div className="space-y-4">
          <div>
            <span className="font-semibold text-gray-700">Username: </span>
            <span className="text-gray-900">{user?.user.username || "N/A"}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Email: </span>
            <span className="text-gray-900">{user?.user.email || "N/A"}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">User ID: </span>
            <span className="text-gray-900 break-all">{user.user._id || "N/A"}</span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full mt-8 px-4 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
