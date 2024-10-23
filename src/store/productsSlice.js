import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, URL_PRODUCTS } from "../constants/apiUrls";
import { Service } from "../services";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ page = 1, limit = 30 } = {}) => {
    const url=`${URL_PRODUCTS}?skip=${(page - 1) * limit}&limit=${limit}`
    const data = await Service.send({
      baseurl: BASE_URL,
      url,
      method: "GET",

    });
    
    return {
      products: data.data.products,
      total: data.data.total,
    };
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: null,
    total: 0, 
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload.products;
        state.total = action.payload.total;
        state.status = "success";
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default productsSlice.reducer;
