import { clearErr } from '../store/actions/auth';
import { AuthTypes } from '../store/types/auth';
import { Dispatch } from 'react';

const onClearAuthError = (dispatch: Dispatch<AuthTypes>): void => {
  dispatch(clearErr());
}

export default onClearAuthError;