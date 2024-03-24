import { useState } from "react";
import "./styles.css";

export default function Product({ product }) {
  const [onMouseHover, setOnMouseHover] = useState(false);

  const handleMouseOver = () => {
    setOnMouseHover(true);
  };

  const handleMouseOut = () => {
    setOnMouseHover(false);
  };

  const productImageStyle = {
    backgroundImage: `url(${
      !onMouseHover
        ? `/products/${product.sku}-1-product.webp`
        : `/products/${product.sku}-2-product.webp`
    })`,
  };

  return (
    <div className="ecom-product-card">
      {product.isFreeShipping ? (
        <div className="product-free-shipping">Free shipping</div>
      ) : (
        ""
      )}
      <div
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        style={productImageStyle}
        className="ecom-product-image"
      ></div>
      <p className="ecom-product-title">
        Black Batman T-shirt
        <hr className="ecom-product-dash" />
      </p>
      <div className="ecom-product-prices">
        <p className="product-value">
          <small>$</small>
          <b>10</b>
          <span>.0</span>
        </p>
        <p className="ecom-product-installment">
          <span>or 9 x</span>
          <b>$1.21</b>
        </p>
        <button tabIndex="-1" class="ecom-product-add-button">
          Add to cart
        </button>
      </div>
    </div>
  );
}
