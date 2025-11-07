export const GET_WORD = '[Words] Get word';
export const GET_WORD_SUCCESS = '[Words] Get word success';
export const GET_WORD_ERROR = '[Words] Get word error';
export const DELETE_WORD = '[Words] Delete word';
export const EDIT_WORD = '[Words] Edit word';
export const CLEAR_DATA = '[Words] Clear data';
export const TRANSLATE_WORD = '[Words] Translate word';
export const TRANSLATE_WORD_ERROR = '[Words] Translate word error';
export const TRANSLATE_WORD_SUCCESS = '[Words] Translate word success';
export class GetWord {
    constructor() {
        this.type = GET_WORD;
    }
}
export class GetWordSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = GET_WORD_SUCCESS;
    }
}
export class GetWordError {
    constructor(payload) {
        this.payload = payload;
        this.type = GET_WORD_ERROR;
    }
}
export class DeleteWord {
    constructor(payload) {
        this.payload = payload;
        this.type = DELETE_WORD;
    }
}
export class EditWord {
    constructor(payload) {
        this.payload = payload;
        this.type = EDIT_WORD;
    }
}
export class ClearData {
    constructor() {
        this.type = CLEAR_DATA;
    }
}
export class TranslateWord {
    constructor(payload) {
        this.payload = payload;
        this.type = TRANSLATE_WORD;
    }
}
export class TranslateWordError {
    constructor(payload) {
        this.payload = payload;
        this.type = TRANSLATE_WORD_ERROR;
    }
}
export class TranslateWordSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = TRANSLATE_WORD_SUCCESS;
    }
}
//# sourceMappingURL=words.actions.js.map