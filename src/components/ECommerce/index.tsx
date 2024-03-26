import { Provider } from "react-redux";
import BaseGrid from "./BaseGrid/BaseGrid";
import Cart from "./Cart/Cart";
import "./styles.css";
import store from "./redux/store.ts";

export default function ECommerce() {
  return (
    <Provider store={store}>
      <div className="app">
        <Cart />
        <BaseGrid />
      </div>
    </Provider>
  );
}
