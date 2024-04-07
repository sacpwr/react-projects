import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  cartOpenStateUpdate,
  searchBarFilter,
  wishlistOpenStateUpdate,
} from "../redux/productSlice";
import "./styles.css";

export default function Header() {
  const [searchText, setSearchText] = useState("");
  const { cartOpenState, cartQuantityCount, wishlistCount, wishlistOpenState } =
    useAppSelector((state) => state.product.data);
  const dispatch = useAppDispatch();

  const handleCartOpenState = () => {
    dispatch(cartOpenStateUpdate({ cartOpenState: !cartOpenState }));
  };

  const handleWishlistOpenState = () => {
    dispatch(
      wishlistOpenStateUpdate({ wishlistOpenState: !wishlistOpenState })
    );
  };

  const handleSearch = (e) => {
    dispatch(searchBarFilter({ searchText: e.target.value }));
  };

  const clearSearchText = () => {
    setSearchText("");
    dispatch(searchBarFilter({ searchText: "" }));
  };

  return (
    <div className="header-bar">
      <div className="log-place">
        <img className="logo" src="clothing-logo2.png" alt="Clothing" />
      </div>
      <div className="search-bar-place">
        <img className="search-logo" src="search.png" alt="" />
        <input
          type="text"
          className="search-bar"
          placeholder="Search products here..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyUp={handleSearch}
        />
        {searchText && (
          <button className="search-bar-clear" onClick={clearSearchText}>
            X
          </button>
        )}
      </div>
      <div className="right-side-bar">
        <div className="wishlist-place" onClick={handleWishlistOpenState}>
          <div className="header-wishlist-count">{wishlistCount}</div>
        </div>
        <div className="cart-place" onClick={handleCartOpenState}>
          <div className="header-cart-count">{cartQuantityCount}</div>
        </div>
        <div className="profile-place">
          <img className="profile" src="profile.png" alt="Profile" />
        </div>
      </div>
    </div>
  );
}
