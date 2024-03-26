import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import "../styles.css";
import {
  decreaseQuantity,
  increaseQuantity,
  removeCartItem,
} from "../../redux/productSlice";

export default function CartProduct({ productId, quantity }) {
  const [productDetails, setProductDetails] = useState(null);
  const productList = useAppSelector((state) => state.product.data.productList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const product = productList.find((product) => product.id == productId);
    setProductDetails(product);
    return () => {};
  }, [productId, productList]);

  const handleIncreaseQuantity = () => {
    dispatch(increaseQuantity({ id: productDetails.id }));
  };

  const handleDecreaseQuantity = () => {
    quantity >= 1 && dispatch(decreaseQuantity({ id: productDetails.id }));
  };

  const handleRemoveCartItem = () => {
    dispatch(removeCartItem({ id: productDetails.id }));
  };

  return (
    productDetails && (
      <div className="cart-item-details">
        <button
          title="remove product from cart"
          className="cart-item-remove"
          onClick={handleRemoveCartItem}
        ></button>
        <img
          src={`/products/${productDetails.sku}-1-cart.webp`}
          alt={productDetails.title}
          className="cart-item-image"
        />
        <div className="cart-item-info">
          <p className="cart-item-name">{productDetails.title}</p>
          <p className="cart-item-type-quantity">
            {productDetails.availableSizes[0]} | {productDetails.style} <br />
            Quantity: {quantity}
          </p>
        </div>
        <div className="cart-item-price">
          <p>$ {productDetails.price}</p>
          <div>
            <button
              disabled={quantity <= 1}
              className="cart-item-change-quantity"
              onClick={handleDecreaseQuantity}
            >
              -
            </button>
            <button
              className="cart-item-change-quantity"
              onClick={handleIncreaseQuantity}
            >
              +
            </button>
          </div>
        </div>
      </div>
    )
  );
}
