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
  SEARCH_MY_RECIPES,
  RecipeTypes
} from "../types/recipe";
import * as Random from "expo-random";
import ENVS from "../../env";
import { AsyncStorage } from "react-native";
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { AnyAction } from "redux";

export const searchMyRecipes = (title: string): ThunkAction<Promise<void>, {}, {}, RecipeTypes> => {
  return async (dispatch: ThunkDispatch<Promise<void>, {}, RecipeTypes>) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("userId");
      const config: Object = {
        headers: {
          "Authorization": token,
          'Content-Type': 'application/json'
        }
      }
      const attemptSearchMyRecipes = await fetch(`${ENVS.url}/recipes/search/myRecipes/${userId}/${title}`, config)
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


export const searchRecipes = (category: string, title: string): ThunkAction<Promise<void>, {}, {}, RecipeTypes> => {
  return async (dispatch: ThunkDispatch<Promise<void>, {}, RecipeTypes>) => {
    const token = await AsyncStorage.getItem("token");
    const config: Object = {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": token
      }
    }
    const attemptSearchRecipes = await fetch(`${ENVS.url}/recipes/search/${category}/${title}`, config)
    const searchedRecipes = await attemptSearchRecipes.json();
    dispatch({
      type: SEARCH_RECIPES,
      recipes: searchedRecipes.recipes
    })
  }
}

export const getAllReviews = (recipeId: number | string): ThunkAction<Promise<void>, {}, {}, RecipeTypes> => {
  return async (dispatch: ThunkDispatch<Promise<void>, {}, RecipeTypes>) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const config: Object = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      }
      const reviews = await fetch(`${ENVS.url}/recipes/reviews/${recipeId}`, config);
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

export const saveReview = (recipeId: string | number, review: string, rating: number | string, title: string): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<Promise<void>, {}, AnyAction>) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("userId");
      const username = await AsyncStorage.getItem("username");
      const config: Object = {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": token
        },
        method: 'POST',
        body: JSON.stringify({recipeId: recipeId, userId: userId, review: review, rating: rating, title: title})
      }
      const attemptSave = await fetch(`${ENVS.url}/recipes/addReview`, config)
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

export const updateImage = (recipeId: string | number, uri: string, base64: string | undefined): ThunkAction<Promise<void>, {}, {}, RecipeTypes> => {
  return async (dispatch: ThunkDispatch<Promise<void>, {}, RecipeTypes>) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const config: Object = {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": token
        },
        body: JSON.stringify({recipeId: recipeId, base64: base64}),
        method: 'POST'
      }
      const attemptUpate = await fetch(`${ENVS.url}/recipes/updateImage`, config)
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

export const deleteRecipe = (id: string | number): ThunkAction<Promise<void>, {}, {}, RecipeTypes> => {
  return async (dispatch: ThunkDispatch<Promise<void>, {}, RecipeTypes>) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const config: Object = {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": token
        },
        body: JSON.stringify({recipeId: id}),
        method: 'POST'
      }
      const attemptDelete = await fetch(`${ENVS.url}/recipes/deleteRecipe`, config)
      const deleteRecipe = await attemptDelete.json();
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

export const getFavouriteRecipes = (): ThunkAction<Promise<void>, {}, {}, RecipeTypes> => {
  return async (dispatch: ThunkDispatch<Promise<void>, {}, RecipeTypes>) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("userId");
      const config: Object = {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": token
        }
      }
      const getFavouriteRecipes = await fetch(`${ENVS.url}/recipes/myFavourites/${userId}`, config)
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

export const updateFavourite = (fav: boolean, recipeId: number | string | null): ThunkAction<Promise<void>, {}, {}, RecipeTypes> => {
  return async (dispatch: ThunkDispatch<Promise<void>, {}, RecipeTypes>) => {
    try {
      if (recipeId === null) {
        dispatch({ type: UPDATE_FAVOURITE, fav: fav});
        return
      }
      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("userId");
      const config: Object =  {
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
        body: JSON.stringify({ userId: userId, recipeId: recipeId }),
        method: "POST",
      }
      const attemptUpdateFavourite = await fetch(`${ENVS.url}/recipes/${fav ? "addFavourite" : "deleteFavourite"}`,config);
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

export const updateCategory = (category: string): RecipeTypes => {
  return {
    type: UPDATE_CATEGORY,
    category: category,
  };
};

export const updateServes = (serves: string): RecipeTypes => {
  return {
    type: UPDATE_SERVES,
    serves: serves
  }
}

export const updatePrepTime = (time: string): RecipeTypes => {
  return {
    type: UPDATE_PREP_TIME,
    prepTime: time,
  };
};

export const updateCookTime = (time: string): RecipeTypes => {
  return {
    type: UPDATE_COOK_TIME,
    cookTime: time,
  };
};

export const reset = (): RecipeTypes => {
  return {
    type: RESET,
  };
};

export const loading = (loading: boolean): RecipeTypes => {
  return {
    type: LOADING,
    loading: loading,
  };
};

export const getMyRecipes = (): ThunkAction<Promise<void>, {}, {}, RecipeTypes> => {
  return async (dispatch: ThunkDispatch<Promise<void>, {}, RecipeTypes>) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("userId");
      const config: Object = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
      }
      const result = await fetch(`${ENVS.url}/recipes/myRecipes/${userId}`, config);
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

export const getAllRecipes = (category: string): ThunkAction<Promise<void>, {}, {}, RecipeTypes> => {
  return async (dispatch: ThunkDispatch<Promise<void>, {}, RecipeTypes>) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const config: Object = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
      }
      const result = await fetch(`${ENVS.url}/recipes/allRecipes/${category}`, config);
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

export const clearRecipe = (): RecipeTypes => {
  return {
    type: CLEAR_RECIPE,
  };
};

export const saveRecipe = (
  title: string,
  ingredients: {id: Uint8Array, ingredient: string}[],
  base64: string,
  instructions: {id: Uint8Array, instruction: string}[],
  cookTime: string,
  prepTime: string,
  category: string,
  serves: string,
  publishable: boolean
): ThunkAction<Promise<void>, {}, {}, RecipeTypes> => {
  return async (dispatch: ThunkDispatch<Promise<void>, {}, RecipeTypes>) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("userId");
      console.log(ingredients);
      const formatIngredients = Object.keys(ingredients).map((ing: any) => {
        return [ingredients[ing].ingredient];
      });
      const formatInstructions = Object.keys(instructions).map((ins: any) => {
        return [instructions[ins].instruction];
      });
      const config: Object = {
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
      }
      const attemptSaveRecipe = await fetch(`${ENVS.url}/recipes/save`, config);
      const saveRecipe = await attemptSaveRecipe.json();
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

export const addImage = (imageUri: string, base64: string | undefined): RecipeTypes => {
  return {
    type: ADD_IMAGE,
    imageUri: imageUri,
    base64: base64,
  };
};

export const updateInstruction = (insText: string, index: number): RecipeTypes => {
  return {
    type: UPDATE_INSTRUCTION,
    insData: {
      insText: insText,
      index: index,
    },
  };
};

export const deleteInstruction = (id: number | string): RecipeTypes => {
  return {
    type: DELETE_INSTRUCTION,
    id: id,
  };
};

export const addInstruction = (): ThunkAction<Promise<void>, {}, {}, RecipeTypes> => {
  return async (dispatch: ThunkDispatch<Promise<void>, {}, RecipeTypes>) => {
    const id = await Random.getRandomBytesAsync(16);
    dispatch({
      type: ADD_INSTRUCTION,
      id: id,
    });
  };
};

export const addIngredient = (): ThunkAction<Promise<void>, {}, {}, RecipeTypes> => {
  return async (dispatch: ThunkDispatch<Promise<void>, {}, RecipeTypes>) => {
    const id = await Random.getRandomBytesAsync(16);
    dispatch({
      type: ADD_INGREDIENT,
      id: id,
    });
  };
};

export const updateIngredient = (index: number, ingredientText: string): RecipeTypes => {
  return {
    type: UPDATE_INGREDIENT,
    ingData: {
      index: index,
      text: ingredientText,
    },
  };
};

export const deleteIngredient = (id: number | string): RecipeTypes => {
  return {
    type: DELETE_INGREDIENT,
    id: id,
  };
};

export const updateTitle = (title: string): RecipeTypes => {
  return {
    type: UPDATE_TITLE,
    title: title,
  };
};

export const setError = (err: string): RecipeTypes => {
  return {
    type: ERR_RECIPE,
    error: err
  }
}

export const clearError = (): RecipeTypes => {
  return {
    type: CLEAR_ERROR
  }
}
