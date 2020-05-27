import { ADD_INGREDIENT } from "../types/recipe";

const initialState = {
  title: "",
  ingredients: [],
  image: "",
  directions: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT:
      const number = state.ingredients.length + 1;
      const stringNumber = number.toString();
      return {
        ...state,
        ingredients: state.ingredients.concat({
          ing: "",
          number: stringNumber,
        }),
      };
    default:
      return state;
  }
};

export default reducer;
