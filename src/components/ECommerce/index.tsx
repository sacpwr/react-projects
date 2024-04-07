import BaseGrid from "./BaseGrid/BaseGrid";
import Cart from "./Cart/Cart";
import WIshlist from "./Wishlist/Wishlist";
import "./styles.css";

export default function ECommerce() {
  return (
    <div className="app">
      <Cart />
      <WIshlist />
      <BaseGrid />
    </div>
  );
}
