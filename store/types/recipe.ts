export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const UPDATE_INGREDIENT = "UPDATE_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const UPDATE_TITLE = "UPDATE_TITLE";
export const ADD_INSTRUCTION = "ADD_INSTRUCTION";
export const DELETE_INSTRUCTION = "DELETE_INSTRUCTION";
export const UPDATE_INSTRUCTION = "UPDATE_INSTRUCTON";
export const ADD_IMAGE = "ADD_IMAGE";
export const SAVE_RECIPE = "SAVE_RECIPE";
export const ERR_RECIPE = "ERR_RECIPE";
export const CLEAR_RECIPE = "CLEAR_RECIPE";
export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const GET_MY_RECIPES = "GET_MY_RECIPES";
export const LOADING = "LOADING";
export const RESET = "RESET";
export const UPDATE_COOK_TIME = "UPDATE_COOK_TIME";
export const UPDATE_PREP_TIME = "UPDATE_PREP_TIME";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const UPDATE_FAVOURITE = "UPDATE_FAVOURITE";
export const UPDATE_FAVOURITE_RECIPES = "UPDATE_FAVOURITE_RECIPES";
export const DELETE_RECIPE = "DELETE_RECIPE";
export const UPDATE_IMAGE = "UPDATE_IMAGE";
export const CLEAR_IMAGE = "CLEAR_IMAGE";
export const SAVE_REVIEW = "SAVE_REVIEW";
export const GET_REVIEWS = "GET_REVIEWS";
export const UPDATE_SERVES = "UPDATE_SERVES";
export const CLEAR_ERROR = "CLEAR_ERROR";
export const SEARCH_RECIPES = "SEARCH_RECIPES";
export const SEARCH_MY_RECIPES = "SEARCH_MY_RECIPES";
import { Recipe, Review } from '../reducers/recipe';

interface AddIngredient {
  type: typeof ADD_INGREDIENT;
  id: Uint8Array;
}

interface UpdateIngredient {
  type: typeof UPDATE_INGREDIENT;
  ingData: {
    index: number;
    text: string;
  };
}

interface DeleteIngredient {
  type: typeof DELETE_INGREDIENT;
  id: number | string;
}

interface UpdateTitle {
  type: typeof UPDATE_TITLE;
  title: string;
}

interface AddInstruction {
  type: typeof ADD_INSTRUCTION;
  id: Uint8Array;
}

interface DeleteInstruction {
  type: typeof DELETE_INSTRUCTION;
  id: number | string;
}

interface UpdateInstruction {
  type: typeof UPDATE_INSTRUCTION;
  insData: {
    insText: string;
    index: number;
  };
}

interface AddImage {
  type: typeof ADD_IMAGE;
  imageUri: string;
  base64: string | undefined;
}

interface SaveRecipe {
  type: typeof SAVE_RECIPE;
}

interface ErrRecipe {
  type: typeof ERR_RECIPE;
  error: string;
}

interface ClearRecipe {
  type: typeof CLEAR_RECIPE;
}

interface GetAllRecipes {
  type: typeof GET_ALL_RECIPES;
  recipes: Recipe[];
}

interface GetMyRecipes {
    type: typeof GET_MY_RECIPES,
    myRecipes: Recipe[]
}

interface Loading {
    type: typeof LOADING,
    loading: boolean
}

interface Reset {
    type: typeof RESET
}

interface UpdateCookTime {
    type: typeof UPDATE_COOK_TIME,
    cookTime: string
}

interface UpdatePrepTime {
    type: typeof UPDATE_PREP_TIME,
    prepTime: string
}

interface UpdateCategory {
    type: typeof UPDATE_CATEGORY,
    category: string
}

interface UpdateFavourite {
    type: typeof UPDATE_FAVOURITE,
    fav: boolean
}

interface UpdateFavouriteRecipes {
    type: typeof UPDATE_FAVOURITE_RECIPES,
    myFavourites: Recipe[]
}

interface DeleteRecipe {
    type: typeof DELETE_RECIPE,
    recipeId: number | string
}

interface UpdateImage {
    type: typeof UPDATE_IMAGE,
    uri: string,
    base64: string | undefined
}

interface ClearImage {
    type: typeof CLEAR_IMAGE
}

interface SaveReview {
    type: typeof SAVE_REVIEW,
    review: string,
    rating: number,
    title: string,
    username: string
}

interface GetReviews {
    type: typeof GET_REVIEWS,
    reviews: Review[] 
}

interface UpdateServes {
    type: typeof UPDATE_SERVES,
    serves: string
}

interface ClearError {
    type: typeof CLEAR_ERROR
}

interface SearchRecipes {
    type: typeof SEARCH_RECIPES,
    recipes: Recipe[]
}

interface SearchMyRecipes {
    type: typeof SEARCH_MY_RECIPES,
    myRecipes: Recipe[]
}

export type RecipeTypes =
  | AddIngredient
  | UpdateIngredient
  | DeleteIngredient
  | UpdateTitle
  | AddInstruction
  | DeleteInstruction
  | UpdateInstruction
  | AddImage
  | SaveRecipe
  | ErrRecipe
  | ClearRecipe
  | GetAllRecipes
  | GetMyRecipes
  | Loading
  | Reset
  | UpdateCookTime
  | UpdateFavourite
  | UpdateFavouriteRecipes
  | DeleteRecipe
  | UpdateImage
  | ClearImage
  | SaveReview
  | GetReviews
  | UpdateServes
  | ClearError
  | SearchRecipes
  | SearchMyRecipes
  | UpdateCategory
  | UpdatePrepTime;
