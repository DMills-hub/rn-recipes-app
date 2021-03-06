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
  RecipeTypes,
} from "../types/recipe";

export interface Recipe {
  id: any, title: string, image: string, category: string, serving: string, cooktime: string, preptime: string, publishable: boolean, user_id: number | string
}

export interface Review {
  title: string,
  review: string,
  rating: number,
  username: string
}

interface RecipeState {
  title: string,
  ingredients: {id: any, ingredient: string}[],
  image: {
    uri: any,
    base64: any,
  },
  instructions: {id: any, instruction: string}[],
  cookTime: string,
  prepTime: string,
  serves: string,
  error: any,
  recipes: Recipe[],
  myRecipes: Recipe[],
  favouriteRecipes: Recipe[],
  category: string,
  isFavourite: boolean,
  loading: boolean,
  reviews: { title: string, review: string, rating: number, username: string}[]
}

const initialState: RecipeState = {
  title: "",
  ingredients: [],
  image: {
    uri: null,
    base64: null
  },
  instructions: [],
  cookTime: "",
  prepTime: "",
  serves: "",
  error: null,
  recipes: [],
  myRecipes: [],
  favouriteRecipes: [],
  category: "starter",
  isFavourite: false,
  loading: false,
  reviews: []
};

const reducer = (state = initialState, action: RecipeTypes): RecipeState => {
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
        favouriteRecipes: state.favouriteRecipes,
      };
    case ERR_RECIPE:
      return errorRecipe(state, action.error);
    case CLEAR_RECIPE:
      return {
        ...initialState,
        recipes: state.recipes,
        myRecipes: state.myRecipes,
        favouriteRecipes: state.favouriteRecipes,
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
    case UPDATE_SERVES:
      return { ...state, serves: action.serves }
    case UPDATE_CATEGORY:
      return { ...state, category: action.category };
    case UPDATE_FAVOURITE:
      return { ...state, isFavourite: action.fav };
    case UPDATE_FAVOURITE_RECIPES:
      return { ...state, favouriteRecipes: action.myFavourites };
    case DELETE_RECIPE:
      return {
        ...state,
        myRecipes: state.myRecipes.filter(
          (recipe) => recipe.id !== Number(action.recipeId)
        ),
      };
    case UPDATE_IMAGE:
      return { ...state, image: { uri: action.uri, base64: action.base64 } };
    case CLEAR_IMAGE:
      return { ...state, image: { uri: null, base64: null } };
    case SAVE_REVIEW:
      return { ...state, reviews: state.reviews.concat({ title: action.title, review: action.review, rating: action.rating, username: action.username }) };
    case GET_REVIEWS:
      return { ...state, reviews: action.reviews }
    case CLEAR_ERROR:
      return { ...state, error: null }
    case SEARCH_RECIPES:
      return { ...state, recipes: action.recipes }
    case SEARCH_MY_RECIPES:
      return { ...state, myRecipes: action.myRecipes }
    default:
      return state;
  }
};

const getMyRecipes = (state: RecipeState, myRecipes: Recipe[]) => {
  return {
    ...state,
    myRecipes: myRecipes,
  };
};

const getAllRecipes = (state: RecipeState, recipes: Recipe[]) => {
  return {
    ...state,
    recipes: recipes,
  };
};

const errorRecipe = (state: RecipeState, error: string) => {
  return {
    ...state,
    error: error,
  };
};

const addImage = (state: RecipeState, imageUri: string, base64: string | undefined) => {
  return {
    ...state,
    image: {
      uri: imageUri,
      base64: base64,
    },
  };
};

const updateInstruction = (state: RecipeState, data: { index: number, insText: string }) => {
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

const deleteInstruction = (state: RecipeState, id: number | string) => {
  const newInstructions = state.instructions.filter((ins) => ins.id !== id);
  return {
    ...state,
    instructions: newInstructions,
  };
};

const addInstruction = (state: RecipeState, id: Uint8Array) => {
  return {
    ...state,
    instructions: state.instructions.concat({
      instruction: "",
      id: id,
    }),
  };
};

const updateTitle = (state: RecipeState, title: string) => {
  return {
    ...state,
    title: title,
  };
};

const deleteIngredient = (state: RecipeState, id: number | string) => {
  const newIngredients = state.ingredients.filter((ing) => ing.id !== id);
  return {
    ...state,
    ingredients: newIngredients,
  };
};

const updateIngredient = (state: RecipeState, ingData: { index: number, text: string }) => {
  const updateIngredient = {
    ...state.ingredients[ingData.index],
    ingredient: ingData.text,
  };
  const newIngredients = [...state.ingredients];
  newIngredients[ingData.index] = updateIngredient;
  return {
    ...state,
    ingredients: newIngredients,
  };
};

const addIngredient = (state: RecipeState, id: Uint8Array) => {
  return {
    ...state,
    ingredients: state.ingredients.concat({
      ingredient: "",
      id: id,
    }),
  };
};

export default reducer;
