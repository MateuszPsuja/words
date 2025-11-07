import { __decorate } from "tslib";
import { Component, ChangeDetectionStrategy, } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { switchMap, map, filter, pluck, debounceTime } from 'rxjs/operators';
import { GET_WORD, DELETE_WORD, EDIT_WORD, TRANSLATE_WORD, } from './store/words.actions';
let WordsComponent = class WordsComponent {
    constructor(store, wordFilter) {
        this.store = store;
        this.wordFilter = wordFilter;
        this.currentPage = 1;
        this.pageSize = 10;
        this.searchInput = '';
        this.totalItems = 0;
    }
    ngOnInit() {
        this.paginationObs$ = new BehaviorSubject(1);
        this.searchObs$ = new BehaviorSubject('');
        this.wordsTable$ = this.initWordTable;
        this.wordsTablePaginated$ = this.initWordPaginateTable;
        this.setTotalItems();
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    changeCurrentPage(page) {
        this.currentPage = page.page;
        this.paginationObs$.next(this.currentPage);
    }
    deleteWord(wordId) {
        this.store.dispatch({ type: DELETE_WORD, payload: wordId });
    }
    addWord() {
        this.store.dispatch({ type: GET_WORD });
    }
    translate(event) {
        const wordToTranslate = { id: event.id, word: event.word };
        this.store.dispatch({ type: TRANSLATE_WORD, payload: wordToTranslate });
    }
    searchStringChanged(searchString) {
        this.searchObs$.next(searchString);
        this.searchInput = searchString;
    }
    wordChanged(word) {
        word.word === ''
            ? this.store.dispatch({ type: DELETE_WORD, payload: word.id })
            : this.store.dispatch({ type: EDIT_WORD, payload: word });
    }
    get initWordPaginateTable() {
        return this.paginationObs$.pipe(switchMap(item => this.wordsTable$), filter(Boolean), map((table) => {
            return table.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
        }));
    }
    get initWordTable() {
        return this.store
            .select('words')
            .pipe(pluck('model'), switchMap(value => this.searchObs$.pipe(debounceTime(500), map((item) => this.wordFilter.transform(value, 'word', item)))));
    }
    setTotalItems() {
        this.subscription = this.wordsTable$
            .pipe(map(item => item.length))
            .subscribe(numberOfItems => this.totalItems = numberOfItems);
    }
};
WordsComponent = __decorate([
    Component({
        selector: 'app-words',
        templateUrl: './words.component.html',
        styleUrls: ['./words.component.scss'],
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
], WordsComponent);
export { WordsComponent };
//# sourceMappingURL=words.component.js.map