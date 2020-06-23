import {
  ADD_INGREDIENT,
  UPDATE_INGREDIENT,
  DELETE_INGREDIENT,
  UPDATE_TITLE,
  ADD_INSTRUCTION,
  DELETE_INSTRUCTION,
  UPDATE_INSTRUCTION,
  ADD_IMAGE,
  SAVE_RECIPE,
  ERR_RECIPE,
  CLEAR_RECIPE,
  GET_ALL_RECIPES,
  GET_MY_RECIPES,
  LOADING,
  RESET,
  UPDATE_COOK_TIME,
  UPDATE_PREP_TIME,
  UPDATE_CATEGORY,
  UPDATE_FAVOURITE,
  UPDATE_FAVOURITE_RECIPES,
  DELETE_RECIPE,
  UPDATE_IMAGE,
  CLEAR_IMAGE,
  SAVE_REVIEW,
  GET_REVIEWS,
  UPDATE_SERVES,
  CLEAR_ERROR,
  SEARCH_RECIPES,
  SEARCH_MY_RECIPES
} from "../types/recipe";
import * as Random from "expo-random";
import ENVS from "../../env";
import { AsyncStorage } from "react-native";

export const searchMyRecipes = (title) => {
  return async dispatch => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("userId");
      const attemptSearchMyRecipes = await fetch(`${ENVS.url}/recipes/search/myRecipes/${userId}/${title}`, {
        headers: {
          "Authorization": token,
          'Content-Type': 'application/json'
        }
      })
      const searchMyRecipes = await attemptSearchMyRecipes.json();
      dispatch({
        type: SEARCH_MY_RECIPES,
        myRecipes: searchMyRecipes.myRecipes
      })
    } catch (err) {
      if (err) return;
    }
  }
}


export const searchRecipes = (category, title) => {
  return async dispatch => {
    const token = await AsyncStorage.getItem("token");
    const attemptSearchRecipes = await fetch(`${ENVS.url}/recipes/search/${category}/${title}`, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": token
      }
    })
    const searchedRecipes = await attemptSearchRecipes.json();
    dispatch({
      type: SEARCH_RECIPES,
      recipes: searchedRecipes.recipes
    })
  }
}

export const getAllReviews = (recipeId) => {
  return async dispatch => {
    try {
      const token = await AsyncStorage.getItem("token");
      const reviews = await fetch(`${ENVS.url}/recipes/reviews/${recipeId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      });
      const recipeReviews = await reviews.json();
      if (recipeReviews.error) return
      dispatch({
        type: GET_REVIEWS,
        reviews: recipeReviews.reviews
      })
    } catch (err) {
      if (err)
      dispatch({
        type: ERR_RECIPE,
        error: "Sorry we couldn't get the reviews for this recipe."
      })
    }
  }
}

export const saveReview = (recipeId, review, rating, title) => {
  return async dispatch => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("userId");
      const username = await AsyncStorage.getItem("username");
      const attemptSave = await fetch(`${ENVS.url}/recipes/addReview`, {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": token
        },
        method: 'POST',
        body: JSON.stringify({recipeId: recipeId, userId: userId, review: review, rating: rating, title: title})
      })
      const saveReview = await attemptSave.json();
      if (saveReview.error) return
      dispatch({
        type: SAVE_REVIEW,
        review: review,
        rating: rating,
        title: title,
        username: username
      });
    } catch (err) {
      if (err)
      dispatch({
        type: ERR_RECIPE,
        error: "Sorry we couldn't save the review for this recipe."
      })
    }
  };
}

export const clearImage = () => {
  return {
    type: CLEAR_IMAGE
  }
}

export const updateImage = (recipeId, uri, base64) => {
  return async dispatch => {
    try {
      const token = await AsyncStorage.getItem("token");
      const attemptUpate = await fetch(`${ENVS.url}/recipes/updateImage`, {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": token
        },
        body: JSON.stringify({recipeId: recipeId, base64: base64}),
        method: 'POST'
      })
      const updateImage = await attemptUpate.json();
      if (updateImage.error) return
      dispatch({
        type: UPDATE_IMAGE,
        uri: uri, 
        base64: base64
      })
    } catch (err) {
      if (err)
      dispatch({
        type: ERR_RECIPE,
        error: "Sorry we couldn't update the image for this recipe."
      })
    }
  }
}

export const deleteRecipe = (id) => {
  return async dispatch => {
    try {
      const token = await AsyncStorage.getItem("token");
      const attemptDelete = await fetch(`${ENVS.url}/recipes/deleteRecipe`, {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": token
        },
        body: JSON.stringify({recipeId: id}),
        method: 'POST'
      })
      const deleteRecipe = attemptDelete.json();
      if (deleteRecipe.error) return
      dispatch({
        type: DELETE_RECIPE,
        recipeId: id
      })
    } catch (err) {
      if (err)
      dispatch({
        type: ERR_RECIPE,
        error: "Sorry we couldn't delete this recipe."
      })
    }
  }
}

export const getFavouriteRecipes = () => {
  return async dispatch => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("userId");
      const getFavouriteRecipes = await fetch(`${ENVS.url}/recipes/myFavourites/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": token
        }
      })
      const myFavourites = await getFavouriteRecipes.json();
      if (myFavourites.error) return
      dispatch({
        type: UPDATE_FAVOURITE_RECIPES,
        myFavourites: myFavourites.myFavourites
      })
    } catch (err) {
      if (err)
      dispatch({
        type: ERR_RECIPE,
        error: "Sorry we couldn't get your favourite recipes."
      })
    }
  }
};

export const updateFavourite = (fav, recipeId) => {
  return async (dispatch) => {
    try {
      if (recipeId === null) return dispatch({ type: UPDATE_FAVOURITE, fav: fav}); 
      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("userId");
      const attemptUpdateFavourite = await fetch(
        `${ENVS.url}/recipes/${fav ? "addFavourite" : "deleteFavourite"}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": token,
          },
          body: JSON.stringify({ userId: userId, recipeId: recipeId }),
          method: "POST",
        }
      );
      const updateFavourite = await attemptUpdateFavourite.json();
      if (updateFavourite.error) return
      dispatch({
        type: UPDATE_FAVOURITE,
        fav: fav,
      }); 
    } catch (err) {
      if (err)
      dispatch({
        type: ERR_RECIPE,
        error: "Sorry we couldn't update your favourite status for this recipe."
      })
    }
  };
};

export const updateCategory = (category) => {
  return {
    type: UPDATE_CATEGORY,
    category: category,
  };
};

export const updateServes = (serves) => {
  return {
    type: UPDATE_SERVES,
    serves: serves
  }
}

export const updatePrepTime = (time) => {
  return {
    type: UPDATE_PREP_TIME,
    prepTime: time,
  };
};

export const updateCookTime = (time) => {
  return {
    type: UPDATE_COOK_TIME,
    cookTime: time,
  };
};

export const reset = () => {
  return {
    type: RESET,
  };
};

export const loading = (loading) => {
  return {
    type: LOADING,
    loading: loading,
  };
};

export const getMyRecipes = () => {
  return async (dispatch) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("userId");
      const result = await fetch(`${ENVS.url}/recipes/myRecipes/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
      });
      const myRecipes = await result.json();
      if (myRecipes.error) return
      dispatch({
        type: GET_MY_RECIPES,
        myRecipes: myRecipes.myRecipes,
      });
    } catch (err) {
      if (err)
      dispatch({
        type: ERR_RECIPE,
        error: "Sorry we couldn't get your recipes."
      })
    }
  };
};

export const getAllRecipes = (category) => {
  return async (dispatch) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const result = await fetch(`${ENVS.url}/recipes/allRecipes/${category}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
      });
      const recipes = await result.json();
      dispatch({
        type: GET_ALL_RECIPES,
        recipes: recipes.recipes,
      });
    } catch (err) {
      if (err)
      dispatch({
        type: ERR_RECIPE,
        error: "Sorry we couldn't get recipes for this category."
      })
    }
  };
};

export const clearRecipe = () => {
  return {
    type: CLEAR_RECIPE,
  };
};

export const saveRecipe = (
  title,
  ingredients,
  base64,
  instructions,
  cookTime,
  prepTime,
  category,
  serves,
  publishable
) => {
  return async (dispatch) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("userId");
      const formatIngredients = Object.keys(ingredients).map((ing) => {
        return [ingredients[ing].ing];
      });
      const formatInstructions = Object.keys(instructions).map((ins) => {
        return [instructions[ins].instruction];
      });
      const saveRecipe = await fetch(`${ENVS.url}/recipes/save`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
        method: "POST",
        body: JSON.stringify({
          title: title,
          ingredients: formatIngredients,
          base64: base64,
          instructions: formatInstructions,
          userId: userId,
          cookTime: cookTime,
          prepTime: prepTime,
          serves: serves,
          category: category,
          publishable: publishable
        }),
      });
      if (saveRecipe.error) return
      dispatch({
        type: SAVE_RECIPE,
      });
    } catch (err) {
      if (err)
      dispatch({
        type: ERR_RECIPE,
        error: "Sorry we couldn't save this recipe."
      })
    }
  };
};

export const addImage = (imageUri, base64) => {
  return {
    type: ADD_IMAGE,
    imageUri: imageUri,
    base64: base64,
  };
};

export const updateInstruction = (insText, index) => {
  return {
    type: UPDATE_INSTRUCTION,
    insData: {
      insText: insText,
      index: index,
    },
  };
};

export const deleteInstruction = (id) => {
  return {
    type: DELETE_INSTRUCTION,
    id: id,
  };
};

export const addInstruction = () => {
  return async (dispatch) => {
    const id = await Random.getRandomBytesAsync(16);
    dispatch({
      type: ADD_INSTRUCTION,
      id: id,
    });
  };
};

export const addIngredient = () => {
  return async (dispatch) => {
    const id = await Random.getRandomBytesAsync(16);
    dispatch({
      type: ADD_INGREDIENT,
      id: id,
    });
  };
};

export const updateIngredient = (index, ingredientText) => {
  return {
    type: UPDATE_INGREDIENT,
    ingData: {
      index: index,
      text: ingredientText,
    },
  };
};

export const deleteIngredient = (id) => {
  return {
    type: DELETE_INGREDIENT,
    id: id,
  };
};

export const updateTitle = (title) => {
  return {
    type: UPDATE_TITLE,
    title: title,
  };
};

export const setError = (err) => {
  return {
    type: ERR_RECIPE,
    error: err
  }
}

export const clearError = () => {
  return {
    type: CLEAR_ERROR
  }
}
