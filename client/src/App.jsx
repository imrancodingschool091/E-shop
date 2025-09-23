// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken, getProfile } from "./features/auth/authSlice";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import ProductDetails from "./pages/ProductDetails";
import PageNotFound from "./pages/PageNotFound";
import Checkout from "./pages/Checkout";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Silent refresh on app load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await dispatch(refreshToken()).unwrap();
        await dispatch(getProfile()).unwrap();
      } catch (error) {
        console.log("No valid refresh token or session expired");
      }
    };
    initializeAuth();
  }, [dispatch]);

  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/profile" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/profile" replace /> : <Register />}
        />
        <Route path="/shop" element={<Product />} />
        <Route path="/shop/:id" element={<ProductDetails />} />

        {/* Protected Routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
         <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route path="/checkout" element={<Checkout />} />


        {/* 404 Fallback */}
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
      <ToastContainer/>
    </Router>
  );
}

export default App;
