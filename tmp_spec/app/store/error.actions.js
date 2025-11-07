export const SET_ERROR = '[Error] Set error';
export const CLEAR_ERROR = '[Error] Clear error';
export class SetError {
    constructor(payload) {
        this.payload = payload;
        this.type = SET_ERROR;
    }
}
export class ClearError {
    constructor() {
        this.type = CLEAR_ERROR;
    }
}
//# sourceMappingURL=error.actions.js.map