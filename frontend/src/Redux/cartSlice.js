import { createSlice } from "@reduxjs/toolkit";

const sendtoLS = (keyName, value) => {
  window.localStorage.setItem(keyName, JSON.stringify(value));
};
const check = (keyName) => {
  if (localStorage.getItem(keyName) !== null) {
    return true;
  } else {
    return false;
  }
};
const getFromLS = (keyName) => {
  return JSON.parse(localStorage.getItem(keyName));
};
const initialState = {
  selectedProducts: check("selectedProducts")
    ? getFromLS("selectedProducts")
    : [],
  selectedProductsID: check("selectedProductsID")
    ? getFromLS("selectedProductsID")
    : []
};

export const counterSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.selectedProducts.push({ ...action.payload, quantity: 1 });
      state.selectedProductsID.push(action.payload.id);
      sendtoLS("selectedProducts", state.selectedProducts);
      sendtoLS("selectedProductsID", state.selectedProductsID);
    },
    increaseQuantity: (state, action) => {
      const addedProduct = state.selectedProducts.find((el) => {
        return el.id === action.payload.id;
      });
      addedProduct.quantity += 1;
      sendtoLS("selectedProducts", state.selectedProducts);
    },
    decreaseQuantity: (state, action) => {
      const addedProduct = state.selectedProducts.find((el) => {
        return el.id === action.payload.id;
      });
      addedProduct.quantity -= 1;
      sendtoLS("selectedProducts", state.selectedProducts);
      if (addedProduct.quantity < 1) {
        const newArray = state.selectedProducts.filter((el) => {
          return el.id !== action.payload.id;
        });
        const newArray2 = state.selectedProductsID.filter((el) => {
          return el !== action.payload.id;
        });
        state.selectedProductsID = newArray2;
        sendtoLS("selectedProductsID", newArray2);
        state.selectedProducts = newArray;
        sendtoLS("selectedProducts", newArray);
      }
    },
    deleteProduct: (state, action) => {
      const newArray = state.selectedProducts.filter((el) => {
        return el.id !== action.payload.id;
      });
      const newArray2 = state.selectedProductsID.filter((el) => {
        return el !== action.payload.id;
      });
      state.selectedProducts = newArray;
      sendtoLS("selectedProducts", newArray);
      state.selectedProductsID = newArray2;
      sendtoLS("selectedProductsID", newArray2);
    }
  }
});

// Action creators are generated for each case reducer function
export const { addToCart, increaseQuantity, decreaseQuantity, deleteProduct } =
  counterSlice.actions;

export default counterSlice.reducer;
