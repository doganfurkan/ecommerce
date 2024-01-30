import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk("products/getProducts", async () => {
  const res = await axios(`../../products.json`);
  return res.data;
});

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    value: [],
    cart: [],
    totalPrice:0,
    loading:true
  },
  reducers:{
    addToCart: (state, action) => {
      state.totalPrice = 0;
      let addedProduct = state.value.find(item => item.id === action.payload);
      let alreadyExists = state.cart.find(item => item.product.id === action.payload);
      console.log(alreadyExists);
      alreadyExists ? alreadyExists.count++ : state.cart.push({count: 1,product: addedProduct})
      state.cart.forEach((item) => state.totalPrice += item.count*item.product.currentPrice);
      state.totalPrice < 1500 && (state.totalPrice = state.totalPrice + 29.99)
    },
    removeFromCart: (state, action) => {
      state.totalPrice = 0;
      let itemToRemove = state.cart.find(item => item.product.id === action.payload);
      itemToRemove ? itemToRemove.count > 1 ? itemToRemove.count-- : state.cart = state.cart.filter(item => item.product.id !== itemToRemove.product.id) : console.log("Sepette böyle bir öge bulunmamakta")
      state.cart.forEach((item) => state.totalPrice += item.count*item.product.currentPrice)
      state.totalPrice < 1500 && (state.totalPrice = state.totalPrice + 29.99)
    }
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

export const { addToCart, removeFromCart } = productsSlice.actions;

export default productsSlice.reducer;