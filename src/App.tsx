import { useState } from "react";
import "./App.css";
import Counter from "./components/counter/Counter";
import WeatherDetails from "./components/Weather/Weather";
import RecipeFinder from "./components/RecipeFinder/RecipeFinder";
import GridView from "./components/GridView/GridView";
import ECommerce from "./components/ECommerce";
import Slider from "./components/Slider/Slider";
import SliderInfinite from "./components/SliderInfinite/SliderInfinite";
import {
  useAppDispatch,
  useAppSelector,
} from "./components/ECommerce/redux/hooks";
import { menuStateUpdate } from "./components/ECommerce/redux/productSlice";

function App() {
  const { menuState } = useAppSelector((state) => state.product.data);
  const dispatch = useAppDispatch();

  const handleMenuState = () => {
    dispatch(menuStateUpdate());
  };

  const views = [
    "Weather",
    "Counter",
    "RecipeFinder",
    "GridView",
    "E-commerce",
    "Slider",
    "SliderInfinite",
  ];
  const [selectedView, setSelectedView] = useState(views[4]);

  const renderViews = () => {
    switch (selectedView) {
      case "Weather":
        return <WeatherDetails />;
      case "Counter":
        return <Counter />;
      case "RecipeFinder":
        return <RecipeFinder />;
      case "GridView":
        return <GridView />;
      case "E-commerce":
        return <ECommerce />;
      case "Slider":
        return <Slider />;
      case "SliderInfinite":
        return <SliderInfinite />;
      default:
        return <span>No View Selected</span>;
    }
  };

  return (
    <>
      <div className={`menu-bar`} onClick={handleMenuState}>
        🌐
      </div>
      <div className={`head-bar ${menuState ? "head-bar-hide" : ""} `}>
        <span className="select-view-text">Select View :</span>
        <select
          onChange={(item) => {
            setSelectedView(item.target.value);
          }}
          name="views"
          value={selectedView}
          className="select-view"
        >
          {views.map((view) => (
            <option key={view} value={view}>
              {view}
            </option>
          ))}
        </select>
        <hr size="12" color="grey" className="hr" />
      </div>
      {renderViews()}
    </>
  );
}

export default App;
