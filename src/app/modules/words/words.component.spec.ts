import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {Store} from '@ngrx/store';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs';

import {WordsComponent} from './words.component';
import {WordsApiService} from './../../services/words-api.service';
import {WordFilterPipe} from './../../pipes/word-filter.pipe';
import {WordData} from './components/table/table.component';

const mockStoreData = {
  isPending: false,
  isError: false,
  isSuccess: true,
  model: [
    {
      id: 276963,
      word: 'fraternalism',
    },
    {
      id: 4387407,
      word: 'spokesdog',
    },
    {
      id: 2781169,
      word: 'pace-setters',
      translation: 'tempo-setery',
    },
  ],
};

const expectedData = [
  {
    id: 276963,
    word: 'fraternalism',
  },
  {
    id: 4387407,
    word: 'spokesdog',
  },
  {
    id: 2781169,
    word: 'pace-setters',
    translation: 'tempo-setery',
  },
];

const mockWordsApiService = {
  word: () => of([{}]),
};

const mockStore = {
  select: jasmine.createSpy('select').and.returnValue(of(mockStoreData)),
  dispatch: jasmine.createSpy('dispatch'),
};

const translateEventMock = {
  id: 1212,
  word: 'lorem',
};

const translateExpected = {
  type: '[Words] Translate word',
  payload: {id: 1212, word: 'lorem'},
};

const deleteExpected = {
  type: '[Words] Delete word',
  payload: 1212,
};

const changedDeleteExpected = {
  type: '[Words] Delete word',
  payload: 1212,
};

const changedEditExpected = {
  type: '[Words] Edit word',
  payload: {
    word: 'lorem',
    id: 1212,
  },
};

const addWordExpected = {
  type: '[Words] Get word',
};

describe('WordsComponent', () => {
  let component: WordsComponent;
  let fixture: ComponentFixture<WordsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
                                     declarations: [WordsComponent],
                                     schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
                                     providers: [
                                       {provide: WordsApiService, useValue: mockWordsApiService},
                                       {provide: Store, useValue: mockStore},
                                       WordFilterPipe,
                                     ],
                                   })
      .compileComponents();
    fixture = TestBed.createComponent(WordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });

  it('should dispatch action TRANSLATE_WORD with payload after translateAction event', (): void => {
    component.translate(translateEventMock as unknown as WordData);
    expect(mockStore.dispatch).toHaveBeenCalledWith(translateExpected);
  });

  it('should dispatch action DELETE_WORD with payload after deleteAction event', (): void => {
    component.deleteWord(1212);
    expect(mockStore.dispatch).toHaveBeenCalledWith(deleteExpected);
  });

  it('should dispatch action DELETE_WORD with payload after changedAction event', (): void => {
    component.wordChanged({word: '', id: 1212});
    expect(mockStore.dispatch).toHaveBeenCalledWith(changedDeleteExpected);
  });

  it('should dispatch action EDIT_WORD with payload after changedAction event', (): void => {
    component.wordChanged({word: 'lorem', id: 1212});
    expect(mockStore.dispatch).toHaveBeenCalledWith(changedEditExpected);
  });

  it('should dispatch ADD_WORD after add button click', (): void => {
    fixture.debugElement.query(By.css('.add-button')).triggerEventHandler('click', new Event('click'));
    expect(mockStore.dispatch).toHaveBeenCalledWith(addWordExpected);
  });

  it('should set searchInput property after filterString event', (): void => {
    component.searchStringChanged('lorem ipsum');
    expect(component.searchInput).toEqual('lorem ipsum');
  });

  it('should set searchInput property after pageChanged event', (): void => {
    component.changeCurrentPage({itemsPerPage: 1, page: 2});
    expect(component.currentPage).toEqual(2);
  });

  it('should init wordsTablePaginated$ stream with data', (done: DoneFn) => {
    component.wordsTablePaginated$.subscribe((item) => {
      expect(item).toEqual(expectedData);
      done();
    });
  });
});
