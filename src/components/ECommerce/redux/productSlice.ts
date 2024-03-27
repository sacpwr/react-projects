import { createSlice } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";
import { data } from "../static/json/products.json";
import { IProduct } from "../utils/types";

enableMapSet();

type InitialState = {
  data: {
    productList: IProduct[];
    filterProductList: IProduct[];
    isFilterApplied: boolean;
    cartProductIds: Map<number, number>;
    cartQuantityCount: number;
    totalAmount: number;
    totalInstallMents: number;
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
    totalInstallMents: 0,
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
      const filterProductMap = new Map<number, IProduct>();

      productList.forEach((product: IProduct, index) => {
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
      manageTotalInstallment(state);
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
      manageTotalInstallment(state);
    },
    checkOutAllItems: (state) => {
      state.data.cartQuantityCount = 0;
      state.data.totalAmount = 0;
      state.data.cartProductIds.clear();
      manageTotalInstallment(state);
    },
  },
});

const manageTotalAmount = (state, productId, quantity, isAdding) => {
  const productDetails: IProduct = state.data.productList.find(
    (product) => product.id == productId
  );

  const { price: productPrice, installments } = productDetails;

  if (isAdding) {
    state.data.totalAmount += Number(productPrice);
  } else {
    state.data.totalAmount -= Number(productPrice) * quantity;
  }

  state.data.totalAmount = Number(Number(state.data.totalAmount).toFixed(2));
  state.data.totalInstallMents = Number(
    installments > state.data.totalInstallMents
      ? installments
      : state.data.totalInstallMents
  );
};

const manageTotalInstallment = (state) => {
  state.data.totalInstallMents = 0;
  let totalInstallMents = 0;

  state.data.cartProductIds.keys().forEach((productId) => {
    const productDetails: IProduct = state.data.productList.find(
      (product) => product.id == productId
    );
    if (totalInstallMents < productDetails.installments) {
      totalInstallMents = productDetails.installments;
    }
  });

  state.data.totalInstallMents = totalInstallMents;
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
