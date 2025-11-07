import * as wordsActions from './words.actions';
const initialState = {
    isPending: false,
    isSuccess: false,
    isError: false,
    model: [],
};
export function wordsReducer(state = initialState, action) {
    switch (action.type) {
        case wordsActions.GET_WORD: {
            return {
                isPending: true,
                isSuccess: false,
                isError: false,
                model: state.model,
            };
        }
        case wordsActions.GET_WORD_SUCCESS: {
            const randomId = action.payload.id.toString() === '0'
                ? Math.random()
                    .toString(36)
                    .substr(2, 6)
                : action.payload.id;
            const wordPayload = {
                id: randomId,
                word: action.payload.word,
            };
            return {
                isPending: false,
                isSuccess: true,
                isError: false,
                model: [wordPayload, ...state.model],
            };
        }
        case wordsActions.GET_WORD_ERROR: {
            return {
                isPending: false,
                isSuccess: false,
                isError: true,
                model: state.model,
            };
        }
        case wordsActions.DELETE_WORD: {
            return {
                isPending: false,
                isError: false,
                isSuccess: false,
                model: state.model.filter((item) => item.id !== action.payload),
            };
        }
        case wordsActions.EDIT_WORD: {
            const newModel = state.model.map((item) => {
                return item.id === action.payload.id
                    ? { ...item, word: action.payload.word, translation: '' }
                    : item;
            });
            return {
                isPending: false,
                isError: false,
                isSuccess: false,
                model: newModel,
            };
        }
        case wordsActions.TRANSLATE_WORD: {
            return {
                isPending: true,
                isError: false,
                isSuccess: false,
                model: state.model,
            };
        }
        case wordsActions.TRANSLATE_WORD_ERROR: {
            return {
                isPending: false,
                isError: true,
                isSuccess: false,
                model: state.model,
            };
        }
        case wordsActions.TRANSLATE_WORD_SUCCESS: {
            const wordTranslatePayload = state.model.map((item) => {
                return item.id === action.payload.id
                    ? { ...item, translation: action.payload.translation }
                    : item;
            });
            return {
                isPending: false,
                isError: false,
                isSuccess: true,
                model: wordTranslatePayload,
            };
        }
        case wordsActions.CLEAR_DATA: {
            return {
                isPending: false,
                isError: false,
                isSuccess: false,
                model: [],
            };
        }
        default: {
            return state;
        }
    }
}
//# sourceMappingURL=words.reducer.js.map