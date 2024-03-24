import BaseGrid from "./BaseGrid/BaseGrid";
import Cart from "./Cart/Cart";
import "./styles.css";

export default function ECommerce() {
  return (
    <div className="app">
      <Cart />
      <BaseGrid />
    </div>
  );
}
