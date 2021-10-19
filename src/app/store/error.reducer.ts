import {ErrorState} from './error.interfaces';
import * as appActions from './error.actions';

const initialState: ErrorState = {
  isError: false,
  error: {
    code: null,
    codeText: '',
    errorMessage: '',
  },
};

export function errorReducer(
  state = initialState,
  action: appActions.ErrorActions,
): ErrorState {
  switch (action.type) {
    case appActions.SET_ERROR: {
      return {
        isError: true,
        error: {...action.payload},
      };
    }

    case appActions.CLEAR_ERROR: {
      return {
        isError: false,
        error: {
          code: null,
          codeText: '',
          errorMessage: '',
        },
      };
    }

    default: {
      return state;
    }
  }
}
