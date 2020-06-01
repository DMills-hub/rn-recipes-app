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
} from "../types/recipe";
import * as Random from "expo-random";
import * as FileSystem from "expo-file-system";
import ENVS from "../../env";
import { AsyncStorage } from "react-native";

export const clearRecipe = () => {
  return {
    type: CLEAR_RECIPE,
  };
};

export const saveRecipe = (title, ingredients, imageUri, instructions) => {
  return async (dispatch) => {
    try {
      const imageName = imageUri.split("/").pop();
      const newImagePath = FileSystem.documentDirectory + imageName;
      await FileSystem.moveAsync({
        from: imageUri,
        to: newImagePath,
      });
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
          Authorization: token,
        },
        method: "POST",
        body: JSON.stringify({
          title: title,
          ingredients: formatIngredients,
          imageUri: newImagePath,
          instructions: formatInstructions,
          userId: userId,
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

export const addImage = (imageUri) => {
  return {
    type: ADD_IMAGE,
    imageUri: imageUri,
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
