import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { wishlistOpenStateUpdate } from "../redux/productSlice";
import WishlistProduct from "./WishlistProduct/WishlistProduct";
import "./styles.css";

export default function WIshlist() {
  const { wishlistCount, wishlistProductIds, wishlistOpenState } =
    useAppSelector((state) => state.product.data);
  const dispatch = useAppDispatch();

  const handleOpenState = () => {
    dispatch(wishlistOpenStateUpdate(!wishlistOpenState));
  };

  return (
    <div className="all-wishlist">
      <div
        className={`open-wishlist ${wishlistOpenState ? "" : "close-wishlist"}`}
      >
        <button className={`open-wishlist-close`} onClick={handleOpenState}>
          <span>X</span>
        </button>
        <div className="open-wishlist-heading">
          <div className="open-wishlist-symbol">
            <div
              title="Products in wishlist quantity"
              className="open-wishlist-count"
            >
              {wishlistCount}
            </div>
          </div>
          <span className="open-wishlist-heading-name">WishList</span>
        </div>

        <div className="wishlist-items">
          <p
            className={
              wishlistCount == 0
                ? "wishlist-item-empty"
                : "wishlist-item-empty-hide"
            }
          >
            Add some products in the wishlist <br />
            😑
          </p>
          {[...wishlistProductIds].map((productId) => (
            <WishlistProduct
              key={productId}
              productId={productId}
              quantity={0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
