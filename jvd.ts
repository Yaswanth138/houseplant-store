import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import LandingPage from "./pages/LandingPage";
import ProductListing from "./pages/ProductListing";
import ShoppingCart from "./pages/ShoppingCart";
import Header from "./components/Header";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/cart" element={<ShoppingCart />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;

// Redux Store (store.js)
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import productReducer from "./productSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
  },
});

export default store;

// Redux - Cart Slice (cartSlice.js)
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const item = state.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity++;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    incrementQuantity: (state, action) => {
      const item = state.find((item) => item.id === action.payload);
      if (item) item.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item = state.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity--;
      }
    },
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;

// Redux - Product Slice (productSlice.js)
import { createSlice } from "@reduxjs/toolkit";

const initialProducts = [
  { id: 1, name: "Aloe Vera", price: 10, category: "Succulents", image: "aloe.jpg" },
  { id: 2, name: "Snake Plant", price: 15, category: "Indoor", image: "snake.jpg" },
  { id: 3, name: "Cactus", price: 12, category: "Succulents", image: "cactus.jpg" },
  { id: 4, name: "Money Plant", price: 8, category: "Indoor", image: "money.jpg" },
  { id: 5, name: "Spider Plant", price: 14, category: "Air Purifying", image: "spider.jpg" },
  { id: 6, name: "Bamboo", price: 20, category: "Indoor", image: "bamboo.jpg" },
];

const productSlice = createSlice({
  name: "products",
  initialState: initialProducts,
  reducers: {},
});

export default productSlice.reducer;
