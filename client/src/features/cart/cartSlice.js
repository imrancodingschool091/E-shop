import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

// ➕ Add/Update Cart Item
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/cart", { productId, quantity });
      return res.data.cart;
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.response?.data?.message || "Failed to add item");
    }
  }
);

// 🛒 Get Cart
export const getCart = createAsyncThunk("cart/getCart", async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get("/cart/");
    return res.data.cart;
  } catch (err) {
    return thunkAPI.rejectWithValue(err?.response?.data?.message || "Failed to get cart");
  }
});

// ❌ Remove Cart Item
export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (productId, thunkAPI) => {
    try {
      const res = await axiosInstance.delete(`/cart/${productId}`);
      return res.data.cart;
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.response?.data?.message || "Failed to delete item");
    }
  }
);

// 🔼 Increment/Decrement Quantity
export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ productId, action }, thunkAPI) => {
    try {
      const res = await axiosInstance.patch("/cart", { productId, action });
      return res.data.cart;
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.response?.data?.message || "Failed to update quantity");
    }
  }
);

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
  isLoading: false,
  isError: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCartState: (state) => {
      state.isError = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const updateState = (state, payload) => {
      state.cartItems = payload;
      state.totalQuantity = payload.reduce((sum, i) => sum + i.quantity, 0);
      state.totalPrice = payload.reduce((sum, i) => sum + i.quantity * i.product.price, 0);
    };

    builder
      .addCase(addToCart.pending, (state) => { state.isLoading = true; state.isError = false; })
      .addCase(addToCart.fulfilled, (state, action) => { state.isLoading = false; updateState(state, action.payload); })
      .addCase(addToCart.rejected, (state, action) => { state.isLoading = false; state.isError = true; state.error = action.payload; })

      .addCase(getCart.pending, (state) => { state.isLoading = true; state.isError = false; })
      .addCase(getCart.fulfilled, (state, action) => { state.isLoading = false; updateState(state, action.payload); })
      .addCase(getCart.rejected, (state, action) => { state.isLoading = false; state.isError = true; state.error = action.payload; })

      .addCase(deleteCartItem.pending, (state) => { state.isLoading = true; state.isError = false; })
      .addCase(deleteCartItem.fulfilled, (state, action) => { state.isLoading = false; updateState(state, action.payload); })
      .addCase(deleteCartItem.rejected, (state, action) => { state.isLoading = false; state.isError = true; state.error = action.payload; })

      .addCase(updateCartQuantity.pending, (state) => { state.isLoading = true; state.isError = false; })
      .addCase(updateCartQuantity.fulfilled, (state, action) => { state.isLoading = false; updateState(state, action.payload); })
      .addCase(updateCartQuantity.rejected, (state, action) => { state.isLoading = false; state.isError = true; state.error = action.payload; });
  },
});

export const { clearCartState } = cartSlice.actions;
export default cartSlice.reducer;
