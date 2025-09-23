import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../features/products/productSlice";

function CreateProduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    color: "",
    size: "",
  });

  const [isActive, setIsActive] = useState(false);
  const [image, setImage] = useState(null);
  const {isError,isLoading,message}=useSelector((s)=>s.product);
  const dispatch=useDispatch()

  // Input change handler
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Image upload handler
  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image!");
      return;
    }

    // Create FormData
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    data.append("isActive", isActive);
    data.append("image", image);

    dispatch(createProduct(data));

    setFormData({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    color: "",
    size: "",
  })

  setIsActive(false);
  setImage(null)



   
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>

        {!isError&&message && <p style={{color:"green"}}>{message}</p>}
         {isError&&message && <p style={{color:"red"}}>{message}</p>}
        
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleInput}
          value={formData.name}
          required
        />
        <br />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleInput}
          value={formData.description}
          required
        />
        <br />

        <input
          type="text"
          name="category"
          placeholder="Category"
          onChange={handleInput}
          value={formData.category}
          required
        />
        <br />

        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleInput}
          value={formData.price}
          required
        />
        <br />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          onChange={handleInput}
          value={formData.stock}
          required
        />
        <br />

        <input
          type="text"
          name="color"
          placeholder="Color"
          onChange={handleInput}
          value={formData.color}
          required
        />
        <br />

        <input
          type="text"
          name="size"
          placeholder="Size"
          onChange={handleInput}
          value={formData.size}
          required
        />
        <br />

        <label>
          Active:
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
        </label>
        <br />

        <input type="file" accept="image/*" onChange={handleImage} required />
        {image && <p>Selected: {image.name}</p>}
        <br />

        <button type="submit">Create Product</button>
      </form>
    </div>
  );
}

export default CreateProduct;
