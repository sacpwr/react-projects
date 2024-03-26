import { useState } from "react";
import "./styles.css";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import CartProduct from "./CartProduct/CartProduct";
import { checkOutAllItems } from "../redux/productSlice";

export default function Cart() {
  const [openState, setOpenState] = useState(false);
  const { cartQuantityCount, cartProductIds, totalAmount } = useAppSelector(
    (state) => state.product.data
  );
  const dispatch = useAppDispatch();

  const handleOpenState = () => {
    setOpenState(!openState);
  };

  const handleCheckout = () => {
    dispatch(checkOutAllItems());
    alert(`You successfully checkout all items`);
  };

  return (
    <div className="all-cart">
      <div
        className={`cart-symbol ${openState ? "cart-symbol-hide" : ""}`}
        onClick={handleOpenState}
      >
        <div title="Products in cart quantity" className="cart-count">
          {cartQuantityCount}
        </div>
      </div>
      <div className={`open-cart ${openState ? "" : "close-cart"}`}>
        <button
          className={`open-cart-close ${
            openState ? "" : "open-cart-close-hide"
          }`}
          onClick={handleOpenState}
        >
          <span>X</span>
        </button>
        <div className="open-cart-heading">
          <div className="open-cart-symbol">
            <div title="Products in cart quantity" className="open-cart-count">
              {cartQuantityCount}
            </div>
          </div>
          <span className="open-cart-heading-name">Cart</span>
        </div>

        <div className="cart-items">
          <p
            className={
              cartQuantityCount == 0
                ? "cart-item-empty"
                : "cart-item-empty-hide"
            }
          >
            Add some products in the cart <br />
            😑
          </p>
          {[...cartProductIds.keys()].map((productId) =>
            [cartProductIds.get(productId)].map((quantity) => (
              <CartProduct
                key={productId}
                productId={productId}
                quantity={quantity}
              />
            ))
          )}
        </div>

        <div className="cart-total">
          <div className="cart-subtotal-text">SUBTOTAL</div>
          <div className="cart-subtotal-amount">$ {totalAmount}</div>
          <div className="checkout-button" onClick={handleCheckout}>
            CHECKOUT
          </div>
        </div>
      </div>
    </div>
  );
}
