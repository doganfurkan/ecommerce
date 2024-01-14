import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk("products/getProducts", async () => {
  const res = await axios(`./products.json`);
  return res.data;
});

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    value: [],
    loading:true
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.value = action.payload;
    })
    .addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    })
  },
});

export default productsSlice.reducer;