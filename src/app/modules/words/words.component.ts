import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import {Store} from '@ngrx/store';
import {Subject, Subscription, Observable, BehaviorSubject} from 'rxjs';
import {switchMap, map, filter, pluck, debounceTime} from 'rxjs/operators';

import {WordFilterPipe} from './../../pipes/word-filter.pipe';
import {
  GET_WORD,
  DELETE_WORD,
  EDIT_WORD,
  TRANSLATE_WORD,
} from './store/words.actions';
import {AppState} from './../../interfaces/appState.interface';
import {WordTableRow} from './interfaces/wordTableRow.interface';
import {PageChangedEvent} from 'ngx-bootstrap/pagination/pagination.component';
import {WordData} from './components/table/table.component';

@Component({
             selector: 'app-words',
             templateUrl: './words.component.html',
             styleUrls: ['./words.component.scss'],
             changeDetection: ChangeDetectionStrategy.OnPush,
           })
export class WordsComponent implements OnInit, OnDestroy {
  public wordsTablePaginated$: Observable<WordTableRow[]>;
  public currentPage = 1;
  public collectionSize: number;
  public pageSize = 10;
  public searchInput = '';
  public totalItems = 0;

  private searchObs$: Subject<string>;
  private paginationObs$: Subject<number>;
  private wordsTable$: Observable<WordTableRow[] | number[]>;
  private subscription: Subscription;

  constructor(
    private store: Store<AppState>,
    private wordFilter: WordFilterPipe,
  ) {
  }

  public ngOnInit() {
    this.paginationObs$ = new BehaviorSubject(1);
    this.searchObs$ = new BehaviorSubject('');
    this.wordsTable$ = this.initWordTable;
    this.wordsTablePaginated$ = this.initWordPaginateTable;
    this.setTotalItems();
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public changeCurrentPage(page: PageChangedEvent) {
    this.currentPage = page.page;
    this.paginationObs$.next();
  }

  public deleteWord(wordId: number): void {
    this.store.dispatch({type: DELETE_WORD, payload: wordId});
  }

  public addWord(): void {
    this.store.dispatch({type: GET_WORD});
  }

  public translate(event: WordData): void {
    const wordToTranslate = {id: event.id, word: event.word};
    this.store.dispatch({type: TRANSLATE_WORD, payload: wordToTranslate});
  }

  public searchStringChanged(searchString: string): void {
    this.searchObs$.next(searchString);
    this.searchInput = searchString;
  }

  public wordChanged(word): void {
    word.word === ''
      ? this.store.dispatch({type: DELETE_WORD, payload: word.id})
      : this.store.dispatch({type: EDIT_WORD, payload: word});
  }

  private get initWordPaginateTable(): Observable<WordTableRow[]> {
    return this.paginationObs$.pipe(
      switchMap(item => this.wordsTable$),
      filter(Boolean),
      map((table: WordTableRow[]) => {
        return table.slice(
          (this.currentPage - 1) * this.pageSize,
          this.currentPage * this.pageSize,
        );
      }),
    );
  }

  private get initWordTable(): Observable<WordTableRow[] | number[]> {
    return this.store
      .select('words')
      .pipe(
        pluck('model'),
        switchMap(value =>
                    this.searchObs$.pipe(
                      debounceTime(500),
                      map((item: string) =>
                            this.wordFilter.transform(value, 'word', item),
                      ),
                    ),
        ),
      );
  }

  private setTotalItems(): void {
    this.subscription = this.wordsTable$
      .pipe(
        map(item => item.length),
      )
      .subscribe(numberOfItems => this.totalItems = numberOfItems);
  }
}
