import { __decorate } from "tslib";
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as WordsActions from './words.actions';
let WordsEffects = class WordsEffects {
    constructor(actions$, wordsApiService, translateApiService) {
        this.actions$ = actions$;
        this.wordsApiService = wordsApiService;
        this.translateApiService = translateApiService;
        this.getWord$ = createEffect(() => this.actions$
            .pipe(ofType(WordsActions.GET_WORD), switchMap(() => this.wordsApiService.word().pipe(map(wordObject => {
            return {
                id: wordObject.id,
                word: wordObject.word,
            };
        }), map(data => new WordsActions.GetWordSuccess(data)), catchError(error => of(new WordsActions.GetWordError(error)))))));
        this.translateWord$ = createEffect(() => this.actions$
            .pipe(ofType(WordsActions.TRANSLATE_WORD), switchMap(action => this.translateApiService
            .translate(action.payload.word, 'en|pl')
            .pipe(map(response => ({
            id: action.payload.id,
            translation: response.responseData.translatedText,
        })))
            .pipe(map(word => new WordsActions.TranslateWordSuccess(word)), catchError(error => of(new WordsActions.TranslateWordError(error)))))));
    }
};
WordsEffects = __decorate([
    Injectable()
], WordsEffects);
export { WordsEffects };
//# sourceMappingURL=words.effects.js.map