import { clearError } from '../store/actions/recipe';

const onClearRecipeError = (dispatch) => {
  dispatch(clearError());
}

export default onClearRecipeError;