import React from "react";
import "./style.css";
import RecipeCard from "./RecipeCard/RecipeCard";

type Recipe = {
  type: string;
  likes: number;
  image: string;
  name: string;
};

class RecipeFinder extends React.Component {
  state = {
    recipes: [] as Array<Recipe>,
    isTextEntered: false,
    searchText: "",
    filteredRecipes: [] as Array<Recipe>,
  };

  constructor(props) {
    super(props);
    this.state = {
      recipes: [
        {
          type: "Dessert",
          likes: 277,
          image:
            "https://bakerbynature.com/wp-content/uploads/2016/08/untitled-4-of-34-2.jpg",
          name: "Delicious Cake With Pistachio and Raspberries",
        },
        {
          type: "Dessert",
          likes: 102,
          image:
            "https://ediblebloglive.wpengine.com/wp-content/uploads/2023/05/Chocolate-Cake-min-300x200.jpg",
          name: "Chocolate Cake",
        },
        {
          type: "Dessert",
          likes: 277,
          image:
            "https://ediblebloglive.wpengine.com/wp-content/uploads/2023/05/Vanilla-Cake-min-300x225.jpg",
          name: "Vanilla Cake",
        },
        {
          type: "Dessert",
          likes: 277,
          image:
            "https://ediblebloglive.wpengine.com/wp-content/uploads/2023/05/Red-Velvet-CAke-min-300x200.jpg",
          name: "Red Velvet Cake",
        },
        {
          type: "Dessert",
          likes: 277,
          image:
            "https://ediblebloglive.wpengine.com/wp-content/uploads/2023/05/Carrot-Cake-min-300x212.jpg",
          name: "Carrot Cake",
        },
        {
          type: "Dessert",
          likes: 277,
          image:
            "https://ediblebloglive.wpengine.com/wp-content/uploads/2023/05/Lemon-Cake-min-300x225.jpg",
          name: "Lemon Cake",
        },
        {
          type: "Dessert",
          likes: 277,
          image:
            "https://ediblebloglive.wpengine.com/wp-content/uploads/2023/05/Strawberry-Cake-min-300x200.jpg",
          name: "Strawberry Cake",
        },
        {
          type: "Dessert",
          likes: 277,
          image:
            "https://ediblebloglive.wpengine.com/wp-content/uploads/2023/05/Coconut-Cake-min-300x236.jpg",
          name: "Coconut Cake",
        },
        {
          type: "Dessert",
          likes: 277,
          image:
            "https://ediblebloglive.wpengine.com/wp-content/uploads/2023/05/Black-Forest-Cake-min-300x185.jpg",
          name: "Black Forest Cakes",
        },
      ] as Array<Recipe>,
      isTextEntered: false,
      searchText: "",
      filteredRecipes: [] as Array<Recipe>,
    };
  }

  searchRecipes = () => {
    let isTextEntered = false,
      filteredRecipes: Array<Recipe> = [];
    if (this.state.searchText) {
      isTextEntered = true;
      filteredRecipes = this.state.recipes.filter((o) =>
        o.name.toLowerCase().includes(this.state.searchText.toLowerCase())
      );
    }
    this.setState({ ...this.state, isTextEntered, filteredRecipes });
  };

  render(): React.ReactNode {
    return (
      <>
        <div className="search-bar">
          <input
            className="recipe-text"
            placeholder="Search recipe's here"
            type="text"
            value={this.state.searchText}
            onChange={(e) =>
              this.setState({ ...this.state, searchText: e.target.value })
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                this.searchRecipes();
              }
            }}
          />
          <button onClick={this.searchRecipes} className="search-button">
            Search
          </button>
        </div>
        <div className="recipe-cards">
          <RecipeCard
            recipes={
              this.state.isTextEntered
                ? this.state.filteredRecipes
                : this.state.recipes
            }
          />
        </div>
      </>
    );
  }
}

export default RecipeFinder;
