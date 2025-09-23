import React, { useEffect } from "react";
import HeroSection from "../components/HeroSection";
import CategoryCard from "../components/CategoryCard";
import PromotionBanner from "../components/PromotionBanner";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../features/cart/cartSlice";

function Home() {
  const categories = [
    { title: "Men", image: "/Men.png", subtitle: "Trendy outfits & accessories" },
    { title: "Women", image: "/Women.png", subtitle: "Latest fashion for her" },
    { title: "Kids", image: "/Kids.png", subtitle: "Cool styles for kids" },
  ];

  const dispatch=useDispatch()
  const {cartItems}=useSelector((s)=>s.cart)

  console.log("cartItemsFromHome",cartItems)

  useEffect(()=>{
    dispatch(getCart())

  },[dispatch])
  return (
    <div>
      <HeroSection />

      {/* Category Section */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        {/* Heading + Caption */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-gray-800 tracking-tight">
            Shop by Category
          </h2>
          <p className="text-gray-600 mt-3 text-lg">
            Discover collections for Men, Women, and Kids — find your style today!
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <CategoryCard key={cat.title} {...cat} />
          ))}
        </div>
      </section>
      <PromotionBanner/>
      <Footer/>


    </div>
  );
}

export default Home;
