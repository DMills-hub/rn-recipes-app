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
} from "../types/recipe";

const initialState = {
  title: "",
  ingredients: [],
  image: {
    uri: null,
    base64: null,
  },
  instructions: [],
  cookTime: "",
  prepTime: "",
  error: null,
  recipes: [],
  myRecipes: [],
  loading: false,
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
      return addImage(state, action.imageUri, action.base64);
    case SAVE_RECIPE:
      return {
        ...initialState,
        recipes: state.recipes,
        myRecipes: state.myRecipes,
      };
    case ERR_RECIPE:
      return errorRecipe(state, action.error);
    case CLEAR_RECIPE:
      return {
        ...initialState,
        recipes: state.recipes,
        myRecipes: state.myRecipes,
      };
    case GET_ALL_RECIPES:
      return getAllRecipes(state, action.recipes);
    case GET_MY_RECIPES:
      return getMyRecipes(state, action.myRecipes);
    case LOADING:
      return { ...state, loading: action.loading };
    case RESET:
      return { ...initialState };
    case UPDATE_COOK_TIME:
      return { ...state, cookTime: action.cookTime };
    case UPDATE_PREP_TIME:
      return { ...state, prepTime: action.prepTime };
    default:
      return state;
  }
};

const getMyRecipes = (state, myRecipes) => {
  return {
    ...state,
    myRecipes: myRecipes,
  };
};

const getAllRecipes = (state, recipes) => {
  return {
    ...state,
    recipes: recipes,
  };
};

const errorRecipe = (state, error) => {
  return {
    ...state,
    error: error,
  };
};

const addImage = (state, imageUri, base64) => {
  return {
    ...state,
    image: {
      uri: imageUri,
      base64: base64,
    },
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
