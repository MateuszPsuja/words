import {errorReducer} from './error.reducer';
import {SET_ERROR, CLEAR_ERROR} from './error.actions';

const mockErrorState = {
  isError: false,
  error: {
    code: null,
    codeText: '',
    errorMessage: '',
  },
};

const mockErrorDataState = {
  isError: true,
  error: {
    code: 404,
    codeText: 'Not Found',
    errorMessage: 'Page not Found',
  },
};

const setErrorPayload = {
  code: 400,
  codeText: 'Bad Request',
  errorMessage: 'Bad url',
};

const expectedErrorState = {
  isError: true,
  error: {
    code: 400,
    codeText: 'Bad Request',
    errorMessage: 'Bad url',
  },
};

describe('Errors reducers', () => {
  describe('when action is dispatched', () => {
    it('should handle [Error] Set Error', () => {
      const setErrorReducer = errorReducer(
        mockErrorState,
        {type: SET_ERROR, payload: setErrorPayload},
      );
      expect(setErrorReducer).toEqual(expectedErrorState);
    });

    it('should handle [Error] Clear Error', () => {
      const clearErrorReducer = errorReducer(
        mockErrorDataState,
        {type: CLEAR_ERROR},
      );
      expect(clearErrorReducer).toEqual(mockErrorState);
    });
  });
});
