import { clearErr } from '../store/actions/auth';

const onClearAuthError = (dispatch) => {
  dispatch(clearErr());
}

export default onClearAuthError;