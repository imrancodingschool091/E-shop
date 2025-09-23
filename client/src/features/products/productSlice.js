import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

// GET ALL PRODUCTS (with query, pagination, filters)
export const getAllProducts = createAsyncThunk(
  "products/getAll",
  async ({ 
    page = 1, 
    limit = 8, 
    search = "", 
    category = "", 
    minPrice = "", 
    maxPrice = "" 
  } = {}, thunkAPI) => {
    try {
      const queryParams = new URLSearchParams();
      
      // Add all parameters that have values
      if (page) queryParams.append('page', page);
      if (limit) queryParams.append('limit', limit);
      if (search) queryParams.append('search', search);
      if (category) queryParams.append('category', category);
      if (minPrice) queryParams.append('minPrice', minPrice);
      if (maxPrice) queryParams.append('maxPrice', maxPrice);
      
      const response = await axiosInstance.get(`/products?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

// GET PRODUCT BY ID
export const getProductById = createAsyncThunk(
  "products/getById",
  async (productId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/products/${productId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to fetch product"
      );
    }
  }
);

const initialState = {
  products: [],
  singleProduct: null,
  page: 1,
  pages: 1,
  total: 0,
  isLoading: false,
  isError: false,
  message: "",
  filters: {
    search: "",
    category: "",
    minPrice: "",
    maxPrice: ""
  }
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearError: (state) => {
      state.isError = false;
      state.message = "";
    },
    clearMessage: (state) => {
      state.message = "";
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = {
        search: "",
        category: "",
        minPrice: "",
        maxPrice: ""
      };
    },
    setPage: (state, action) => {
      state.page = action.payload;
    }
  },
  extraReducers: (builder) => {
    // GET ALL PRODUCTS
    builder.addCase(getAllProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload.products || [];
      state.page = action.payload.page || 1;
      state.pages = action.payload.totalPages || 1;
      state.total = action.payload.total || 0;
      state.message = "Products fetched successfully";
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      state.products = [];
    });

    // GET PRODUCT BY ID
    builder.addCase(getProductById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProductById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.singleProduct = action.payload.product;
      state.message = action.payload.message || "Product fetched successfully";
    });
    builder.addCase(getProductById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { clearError, clearMessage, setFilters, resetFilters, setPage } = productSlice.actions;
export default productSlice.reducer;