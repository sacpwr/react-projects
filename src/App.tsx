import { useState } from "react";
import "./App.css";
import Counter from "./components/counter/Counter";
import WeatherDetails from "./components/Weather/Weather";
import RecipeFinder from "./components/RecipeFinder/RecipeFinder";
import GridView from "./components/GridView/GridView";
import ECommerce from "./components/ECommerce";
import Slider from "./components/Slider/Slider";

function App() {
  const views = [
    "Weather",
    "Counter",
    "RecipeFinder",
    "GridView",
    "E-commerce",
    "Slider",
  ];
  const [selectedView, setSelectedView] = useState(views[5]);

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
      default:
        return <span>No View Selected</span>;
    }
  };

  return (
    <>
      <div className="head-bar">
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
