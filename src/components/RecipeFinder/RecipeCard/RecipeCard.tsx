import React from "react";
import "./styles.css";
class RecipeCard extends React.Component {
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
        <div className="cards">
          {this.props.recipes.map((recipe) => (
            <div className="card">
              <div
                className="image"
                style={{
                  backgroundImage: `url('${recipe.image}')`,
                }}
              ></div>
              <div className="details">
                <div className="type-likes">
                  <span className="type-chip">{recipe.type}</span>
                  <span className="likes">🤍 {recipe.likes}</span>
                </div>
                <span className="name">{recipe.name}</span>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default RecipeCard;
