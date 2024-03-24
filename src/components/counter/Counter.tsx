import React from "react";
import "./counter.css";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1000,
    };
  }

  incrementCount = () => {
    this.setState({
      count: ++this.state.count,
    });
  };

  decrementCount = () => {
    if (this.state.count == 0) return;
    this.setState({
      count: --this.state.count,
    });
  };

  render(): React.ReactNode {
    return (
      <>
        <div className="main">
          <div className="counter">
            <button className="button-plus" onClick={this.incrementCount}>
              ➕
            </button>
            <span className="count">{this.state.count}</span>
            <button className="button-minus" onClick={this.decrementCount}>
              ➖
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default Counter;
