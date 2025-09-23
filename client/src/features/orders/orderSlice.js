// src/features/orders/orderSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

/**
 * 📦 Place New Order
 * POST /order/
 */
export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async ({ shippingAddress }, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/order/", { shippingAddress });
      return res.data.order;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || "Failed to place order"
      );
    }
  }
);

/**
 * 📦 Get All Orders for Logged-in User
 * GET /order/my-orders
 */
export const getMyOrders = createAsyncThunk(
  "order/getMyOrders",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/order/my-orders");
      return res.data.orders;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || "Failed to fetch orders"
      );
    }
  }
);

/**
 * 📦 Get Single Order by ID
 * GET /order/:id
 */
export const getOrderById = createAsyncThunk(
  "order/getOrderById",
  async (orderId, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/order/${orderId}`);
      return res.data.order;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || "Failed to fetch order"
      );
    }
  }
);

// ================= SLICE ==================
const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [], // list of all user orders
    order: null, // single order
    isLoading: false,
    isError: false,
    message: "",
  },
  reducers: {
    resetOrderState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // 👉 Place Order
      .addCase(placeOrder.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders.push(action.payload); // add new order to list
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      
      // 👉 Get My Orders
      .addCase(getMyOrders.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      
      // 👉 Get Order By ID
      .addCase(getOrderById.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

// Export actions + reducer
export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;