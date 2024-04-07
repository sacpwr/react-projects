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
    cartOpenState: boolean;
    menuState: boolean;
    searchText: string;
    selectedSizeTypes: Set<string>;
    selectedGenders: Set<string>;
    wishlistProductIds: Array<string>;
    wishlistCount: number;
    wishlistOpenState: boolean;
  };
};

const initialState: InitialState = {
  data: {
    productList: JSON.parse(JSON.stringify(data.products)),
    filterProductList: [],
    isFilterApplied: false,
    cartProductIds: new Map<number, number>(),
    cartQuantityCount: 0,
    totalAmount: 0,
    totalInstallMents: 0,
    cartOpenState: false,
    menuState: true,
    searchText: "",
    selectedSizeTypes: new Set<string>(),
    selectedGenders: new Set<string>(),
    wishlistProductIds: [],
    wishlistCount: 0,
    wishlistOpenState: false,
  },
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    searchBarFilter: (state, action) => {
      const searchText = action.payload.searchText;
      const selectedSizeTypes = state.data.selectedSizeTypes;
      const selectedGenders = state.data.selectedGenders;
      filterProducts(state, searchText, selectedSizeTypes, selectedGenders);
    },
    sizeFilter: (state, action) => {
      const selectedSizeTypes = action.payload.selectedSizeTypes as Set<string>;
      const searchText = state.data.searchText;
      const selectedGenders = state.data.selectedGenders;
      filterProducts(state, searchText, selectedSizeTypes, selectedGenders);
    },
    genderFilter: (state, action) => {
      const selectedGenders = action.payload.selectedGenders as Set<string>;
      const searchText = state.data.searchText;
      const selectedSizeTypes = state.data.selectedSizeTypes;
      filterProducts(state, searchText, selectedSizeTypes, selectedGenders);
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
    addToWishlist: (state, action) => {
      const productId = action.payload.id;

      if (state.data.wishlistProductIds.includes(productId)) {
        state.data.wishlistProductIds.splice(
          state.data.wishlistProductIds.findIndex((id) => id == productId),
          1
        );
        state.data.wishlistCount--;
      } else {
        state.data.wishlistProductIds.push(productId);
        state.data.wishlistCount++;
      }
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
    removeWishlistItem: (state, action) => {
      const productId = action.payload.id;

      state.data.wishlistCount--;

      state.data.wishlistProductIds.splice(
        state.data.wishlistProductIds.findIndex((id) => id == productId),
        1
      );
    },
    checkOutAllItems: (state) => {
      state.data.cartQuantityCount = 0;
      state.data.totalAmount = 0;
      state.data.cartProductIds.clear();
      manageTotalInstallment(state);
    },
    cartOpenStateUpdate: (state, action) => {
      const { cartOpenState } = action.payload;
      state.data.cartOpenState = cartOpenState;
    },
    wishlistOpenStateUpdate: (state, action) => {
      const { wishlistOpenState } = action.payload;
      state.data.wishlistOpenState = wishlistOpenState;
    },
    menuStateUpdate: (state) => {
      state.data.menuState = !state.data.menuState;
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

const filterProducts = (
  state,
  searchText,
  selectedSizeTypes,
  selectedGenders
) => {
  if (!searchText && selectedSizeTypes.size == 0 && selectedGenders.size == 0) {
    state.data = {
      ...state.data,
      filterProductList: [],
      isFilterApplied: false,
      searchText: "",
      selectedSizeTypes: new Set<string>(),
      selectedGenders: new Set<string>(),
    };

    return;
  }

  const productList = [...state.data.productList];
  const filterProductMap = new Map<number, IProduct>();

  productList.forEach((product: IProduct, index) => {
    for (let i = 0; i < product.availableSizes.length; i++) {
      const title = product.title;
      const size = product.availableSizes[i];
      const gender = product.gender;
      let isTitleFound = false,
        isSizeFound = false,
        isGendersFound = false;

      if (
        selectedSizeTypes.size == 0 ||
        (selectedSizeTypes.size && selectedSizeTypes.has(size))
      ) {
        isSizeFound = true;
      }
      if (
        selectedGenders.size == 0 ||
        (selectedGenders.size && selectedGenders.has(gender))
      ) {
        isGendersFound = true;
      }
      if (
        !searchText ||
        (searchText && title.toLowerCase().includes(searchText.toLowerCase()))
      ) {
        isTitleFound = true;
      }

      if (isTitleFound && isSizeFound && isGendersFound) {
        filterProductMap.set(index, product);
        break;
      }
    }
  });
  state.data = {
    ...state.data,
    filterProductList: Array.from(filterProductMap.values()),
    isFilterApplied: true,
    searchText,
    selectedSizeTypes,
    selectedGenders,
  };
};

export default productSlice.reducer;
export const {
  searchBarFilter,
  sizeFilter,
  genderFilter,
  addToCart,
  addToWishlist,
  increaseQuantity,
  decreaseQuantity,
  removeCartItem,
  checkOutAllItems,
  cartOpenStateUpdate,
  wishlistOpenStateUpdate,
  removeWishlistItem,
  menuStateUpdate,
} = productSlice.actions;
