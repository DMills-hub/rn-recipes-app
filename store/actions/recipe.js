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
  UPDATE_CATEGORY
} from "../types/recipe";
import * as Random from "expo-random";
import ENVS from "../../env";
import { AsyncStorage } from "react-native";

export const updateCategory = (category) => {
  return {
    type: UPDATE_CATEGORY,
    category: category
  }
}

export const updatePrepTime = (time) => {
  return {
    type: UPDATE_PREP_TIME,
    prepTime: time
  }
}

export const updateCookTime = (time) => {
  return {
    type: UPDATE_COOK_TIME,
    cookTime: time
  }
}

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
      if (myRecipes.error)
        return dispatch({ type: ERR_RECIPE, error: myRecipes.error });
      dispatch({
        type: GET_MY_RECIPES,
        myRecipes: myRecipes.myRecipes,
      });
    } catch (err) {
      dispatch({
        type: ERR_RECIPE,
        error: err,
      });
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
      console.log(err);
    }
  };
};

export const clearRecipe = () => {
  return {
    type: CLEAR_RECIPE,
  };
};

export const saveRecipe = (title, ingredients, base64, instructions, cookTime, prepTime, category) => {
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
          category: category
        }),
      });
      if (saveRecipe.error)
        return dispatch({
          type: ERR_RECIPE,
          error: saveRecipe.error,
        });
      dispatch({
        type: SAVE_RECIPE,
      });
    } catch (err) {
      console.log(err);
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
