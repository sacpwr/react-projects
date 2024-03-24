import { useState } from "react";
import "./styles.css";

export default function Cart() {
  const [openState, setOpenState] = useState(false);

  const handleOpenState = () => {
    setOpenState(!openState);
  };

  return (
    <div className="all-cart">
      <div
        className={`cart-symbol ${openState ? "cart-symbol-hide" : ""}`}
        onClick={handleOpenState}
      >
        <div title="Products in cart quantity" className="cart-count">
          0
        </div>
      </div>
      <div className={`open-cart ${openState ? "" : "close-cart"}`}>
        <button className={`open-cart-close`} onClick={handleOpenState}>
          <span>X</span>
        </button>
        <div className="open-cart-heading">
          <div className="open-cart-symbol">
            <div title="Products in cart quantity" className="open-cart-count">
              0
            </div>
          </div>
          <span className="open-cart-heading-name">Cart</span>
        </div>

        <div className="cart-items">
          {/*  <p className="cart-item-empty">
            Add some products in the cart <br />
            😑
          </p> */}
          <div className="cart-item-details">
            <button
              title="remove product from cart"
              className="cart-item-remove"
            ></button>
            <img
              src="/products/9197907543445676-1-cart.webp"
              alt="Skater Black Sweatshirt"
              className="cart-item-image"
            />
            <div className="cart-item-info">
              <p className="cart-item-name">Skater Black Sweatshirt</p>
              <p className="cart-item-type-quantity">
                XL | Tony Hawk <br />
                Quantity: 1
              </p>
            </div>
            <div className="cart-item-price">
              <p>$ 25.90</p>
              <div>
                <button disabled="" className="cart-item-change-quantity">
                  -
                </button>
                <button className="cart-item-change-quantity">+</button>
              </div>
            </div>
          </div>
        </div>

        <div className="cart-total">
          <div className="cart-subtotal-text cart-total-ite">SUBTOTAL</div>
          <div className="cart-subtotal-amount">$ 10.0</div>
          <div className="checkout-button">CHECKOUT</div>
        </div>
      </div>
    </div>
  );
}
