import React from "react";
import "./styles.css";

class GridView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherDataByLocation: null,
      isDataFetched: false,
    };
  }

  render(): React.ReactNode {
    return (
      <>
        <div className="container">
          <div className="item item1">Header</div>
          <div className="item item2">NavBar</div>
          <div className="item item3">SideBar</div>
          <div className="item item4">Body</div>
          <div className="item item5">Footer</div>
          {/* <div className="item item6">item6</div> */}
        </div>
      </>
    );
  }
}

export default GridView;
