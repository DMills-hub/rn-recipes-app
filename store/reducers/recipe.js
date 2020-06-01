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
} from "../types/recipe";

const initialState = {
  title: "",
  ingredients: [],
  imageUri: null,
  instructions: [],
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT:
      return addIngredient(state, action.id);
    case UPDATE_INGREDIENT:
      return updateIngredient(state, action.ingData);
    case DELETE_INGREDIENT:
      return deleteIngredient(state, action.id);
    case UPDATE_TITLE:
      return updateTitle(state, action.title);
    case ADD_INSTRUCTION:
      return addInstruction(state, action.id);
    case DELETE_INSTRUCTION:
      return deleteInstruction(state, action.id);
    case UPDATE_INSTRUCTION:
      return updateInstruction(state, action.insData);
    case ADD_IMAGE:
      return addImage(state, action.imageUri);
    case SAVE_RECIPE:
      return initialState;
    case ERR_RECIPE:
      return errorRecipe(state, action.error);
    default:
      return state;
  }
};

const errorRecipe = (state, error) => {
  return {
    ...state,
    error: error,
  };
};

const addImage = (state, imageUri) => {
  return {
    ...state,
    imageUri: imageUri,
  };
};

const updateInstruction = (state, data) => {
  const newInstructionArray = [...state.instructions];
  const newInstrucion = {
    ...state.instructions[data.index],
    instruction: data.insText,
  };
  newInstructionArray[data.index] = newInstrucion;
  return {
    ...state,
    instructions: newInstructionArray,
  };
};

const deleteInstruction = (state, id) => {
  const newInstructions = state.instructions.filter((ins) => ins.id !== id);
  return {
    ...state,
    instructions: newInstructions,
  };
};

const addInstruction = (state, id) => {
  return {
    ...state,
    instructions: state.instructions.concat({
      instruction: "",
      id: id,
    }),
  };
};

const updateTitle = (state, title) => {
  return {
    ...state,
    title: title,
  };
};

const deleteIngredient = (state, id) => {
  const newIngredients = state.ingredients.filter((ing) => ing.id !== id);
  return {
    ...state,
    ingredients: newIngredients,
  };
};

const updateIngredient = (state, ingData) => {
  const updateIngredient = {
    ...state.ingredients[ingData.index],
    ing: ingData.text,
  };
  const newIngredients = [...state.ingredients];
  newIngredients[ingData.index] = updateIngredient;
  return {
    ...state,
    ingredients: newIngredients,
  };
};

const addIngredient = (state, id) => {
  return {
    ...state,
    ingredients: state.ingredients.concat({
      ing: "",
      id: id,
    }),
  };
};

export default reducer;