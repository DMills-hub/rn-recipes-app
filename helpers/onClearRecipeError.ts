import { clearError } from '../store/actions/recipe';

const onClearRecipeError = (dispatch: any) => {
  dispatch(clearError());
}

export default onClearRecipeError;