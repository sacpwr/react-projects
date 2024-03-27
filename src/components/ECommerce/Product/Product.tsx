import { useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { addToCart } from "../redux/productSlice";
import { formatPrice } from "../utils/functions";
import "./styles.css";

export default function Product({ product }) {
  const [onMouseHover, setOnMouseHover] = useState(false);
  const dispatch = useAppDispatch();

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

  const addProductToCart = () => {
    dispatch(addToCart({ id: product.id }));
  };

  const formattedPrice = formatPrice(product.price, product.currencyId);

  return (
    <div className="ecom-product-card" key={product.title}>
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
      <p className="ecom-product-title">{product.title}</p>
      <div className="ecom-product-prices">
        <p className="product-value">
          <small>{product.currencyFormat}</small>
          <b>{formattedPrice.substring(0, formattedPrice.length - 3)}</b>
          <span>{formattedPrice.substring(formattedPrice.length - 3)}</span>
        </p>
        <p className="ecom-product-installment">
          <span>or {product.installments} x</span>
          <b>
            {product.currencyFormat}
            {formatPrice(
              product.price / product.installments,
              product.currencyId
            )}
          </b>
        </p>
        <button onClick={addProductToCart} className="ecom-product-add-button">
          Add to cart
        </button>
      </div>
    </div>
  );
}
