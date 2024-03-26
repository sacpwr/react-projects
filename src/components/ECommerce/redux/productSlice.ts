import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { data } from "../static/json/products.json";
import { ProductType } from "../utils/types";
import { enableMapSet } from "immer";

enableMapSet();

type InitialState = {
  data: {
    productList: ProductType[];
    filterProductList: ProductType[];
    isFilterApplied: boolean;
    cartProductIds: Map<number, number>;
    cartQuantityCount: number;
    totalAmount: number;
  };
};

const initialState: InitialState = {
  data: {
    productList: data.products,
    filterProductList: [],
    isFilterApplied: false,
    cartProductIds: new Map(),
    cartQuantityCount: 0,
    totalAmount: 0,
  },
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    sizeFilter: (state, action) => {
      const selectedSizeTypes = action.payload.selectedSizeTypes as Set<string>;
      if (selectedSizeTypes.size == 0) {
        state.data = {
          ...state.data,
          filterProductList: [],
          isFilterApplied: false,
        };

        return;
      }

      const productList = [...state.data.productList];
      const filterProductMap = new Map<number, ProductType>();

      productList.forEach((product: ProductType, index) => {
        for (let i = 0; i < product.availableSizes.length; i++) {
          const size = product.availableSizes[i];
          if (selectedSizeTypes.has(size)) {
            filterProductMap.set(index, product);
            break;
          }
        }
      });

      state.data = {
        ...state.data,
        filterProductList: Array.from(filterProductMap.values()),
        isFilterApplied: true,
      };
    },
    addToCart: (state, action) => {
      const cartProductKeys = Array.from(state.data.cartProductIds.keys());
      const productId = action.payload.id;

      if (cartProductKeys.includes(productId)) {
        state.data.cartProductIds.set(
          productId,
          Number(state.data.cartProductIds.get(productId)) + 1
        );
      } else {
        state.data.cartProductIds.set(productId, 1);
      }

      state.data.cartQuantityCount++;

      manageTotalAmount(state, productId, 1, true);
    },
    increaseQuantity: (state, action) => {
      const productId = action.payload.id;

      manageTotalAmount(state, productId, 1, true);

      state.data.cartQuantityCount++;

      state.data.cartProductIds.set(
        productId,
        Number(state.data.cartProductIds.get(productId)) + 1
      );
    },
    decreaseQuantity: (state, action) => {
      const productId = action.payload.id;

      state.data.cartProductIds.set(
        productId,
        Number(state.data.cartProductIds.get(productId)) - 1
      );

      manageTotalAmount(state, productId, 1, false);

      state.data.cartQuantityCount--;
    },
    removeCartItem: (state, action) => {
      const productId = action.payload.id;

      state.data.cartQuantityCount =
        Number(state.data.cartQuantityCount) -
        Number(state.data.cartProductIds.get(productId));

      manageTotalAmount(
        state,
        productId,
        Number(state.data.cartProductIds.get(productId)),
        false
      );

      state.data.cartProductIds.delete(productId);
    },
    checkOutAllItems: (state) => {
      state.data.cartQuantityCount = 0;
      state.data.totalAmount = 0;
      state.data.cartProductIds.clear();
    },
  },
});

const manageTotalAmount = (state, productId, quantity, isAdding) => {
  const productPrice = state.data.productList.find(
    (product) => product.id == productId
  )?.price;

  if (isAdding) {
    state.data.totalAmount += Number(productPrice);
  } else {
    state.data.totalAmount -= Number(productPrice) * quantity;
  }

  state.data.totalAmount = Number(Number(state.data.totalAmount).toFixed(2));
};

export default productSlice.reducer;
export const {
  sizeFilter,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeCartItem,
  checkOutAllItems,
} = productSlice.actions;
