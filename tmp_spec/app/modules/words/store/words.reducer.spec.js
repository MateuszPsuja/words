import { wordsReducer } from './words.reducer';
import { GET_WORD, GET_WORD_ERROR, GET_WORD_SUCCESS, DELETE_WORD, EDIT_WORD, CLEAR_DATA, TRANSLATE_WORD, TRANSLATE_WORD_ERROR, TRANSLATE_WORD_SUCCESS, } from './words.actions';
const mockInitialState = {
    isPending: false,
    isSuccess: false,
    isError: false,
    model: [],
};
const mockWordState = {
    isPending: false,
    isError: false,
    isSuccess: false,
    model: [
        {
            id: '98176',
            word: 'pedagogics',
            translation: 'pedagogika',
        },
        {
            id: '1762154',
            word: 'dirtbike',
            translation: 'motor',
        },
        {
            id: '12121212',
            word: 'space',
        },
    ],
};
const mockGetWordSuccessPayload = {
    id: '47998', word: 'destroyer',
};
const mockGetWordSuccess = {
    isPending: false,
    isSuccess: true,
    isError: false,
    model: [
        { id: '47998',
            word: 'destroyer',
        },
        {
            id: '98176',
            word: 'pedagogics',
            translation: 'pedagogika',
        },
        {
            id: '1762154',
            word: 'dirtbike',
            translation: 'motor',
        },
        {
            id: '12121212',
            word: 'space',
        },
    ],
};
describe('Words reducers', () => {
    describe('when action is dispatched', () => {
        it('should handle [Words] Get word', () => {
            const getWordReducer = wordsReducer(mockWordState, { type: GET_WORD });
            expect(getWordReducer.isPending).toBeTruthy();
        });
        it('should handle [Words] Get word success', () => {
            const getWordReducer = wordsReducer(mockWordState, { type: GET_WORD_SUCCESS, payload: mockGetWordSuccessPayload });
            const isSuccess = getWordReducer.isSuccess;
            expect(isSuccess).toBeTruthy();
            expect(getWordReducer).toEqual(mockGetWordSuccess);
        });
        it('should handle [Words] Get word error', () => {
            const getWordErrorReducer = wordsReducer(mockInitialState, { type: GET_WORD_ERROR, payload: {} });
            const isError = getWordErrorReducer.isError;
            expect(isError).toBeTruthy();
        });
        it('should handle [Words] Delete word', () => {
            const getDeleteWordReducer = wordsReducer(mockWordState, { type: DELETE_WORD, payload: '98176' }).model.length;
            expect(getDeleteWordReducer).toEqual(2);
        });
        it('should handle [Words] Edit word', () => {
            const getEditWordReducer = wordsReducer(mockWordState, { type: EDIT_WORD, payload: { id: '98176', word: 'plane' } });
            const isEdited = getEditWordReducer.model[0].word === 'plane' && getEditWordReducer.model[0].translation === '';
            expect(isEdited).toBeTruthy();
        });
        it('should handle [Words] Clear data', () => {
            const getClearWordReducer = wordsReducer(mockWordState, { type: CLEAR_DATA });
            expect(getClearWordReducer).toEqual(mockInitialState);
        });
        it('should handle [Words] Translate word', () => {
            const getTranslateWordReducer = wordsReducer(mockWordState, { type: TRANSLATE_WORD, payload: { id: '12121212', word: 'space' } });
            const isPending = getTranslateWordReducer.isPending;
            expect(isPending).toBeTruthy();
        });
        it('should handle [Words] Translate word error', () => {
            const getTranslateWordErrorReducer = wordsReducer(mockWordState, { type: TRANSLATE_WORD_ERROR, payload: {} });
            const isError = getTranslateWordErrorReducer.isError;
            expect(isError).toBeTruthy();
        });
        it('should handle [Words] Translate word success', () => {
            const getTranslateWordSuccessReducer = wordsReducer(mockWordState, { type: TRANSLATE_WORD_SUCCESS, payload: { id: '12121212', translation: 'kosmos' } });
            const isSuccess = getTranslateWordSuccessReducer.isSuccess;
            const isTranslated = getTranslateWordSuccessReducer.model[2].translation === 'kosmos';
            expect(isSuccess).toBeTruthy();
            expect(isTranslated).toBeTruthy();
        });
    });
});
//# sourceMappingURL=words.reducer.spec.js.map