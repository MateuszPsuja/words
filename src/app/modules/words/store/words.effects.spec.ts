import { BehaviorSubject, Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jasmine-marbles';

import { TranslateApiService } from './../../../services/translate-api.service';
import { WordsApiService } from './../../../services/words-api.service';
import { WordsEffects } from './words.effects';
import * as WordsActions from './words.actions';

const mockWordPayload = { id: '98798', word: 'Shift' };

const mockTranslatePayload = {
  id: '123123',
  translation: 'zielony',
};

const mockTranslateServiceResponse = {
  text: ['zielony'],
};

const mockWordToTranslate = {
  id: '123123',
  word: 'green',
};

const mockWordsApiService = {
  word: jasmine.createSpy('word'),
};

const mockTranslateApiService = {
  translate: jasmine.createSpy('translate'),
};

describe('Words effects', () => {
  let effects: WordsEffects;
  let actions: Observable<any>;
  let responseWord: BehaviorSubject<any>;
  let responseTranslate: BehaviorSubject<any>;

  beforeEach(() => {
    responseWord = new BehaviorSubject(mockWordPayload);
    mockWordsApiService.word.and.returnValue(responseWord);

    responseTranslate = new BehaviorSubject(mockTranslateServiceResponse);
    mockTranslateApiService.translate.and.returnValue(responseTranslate);

    TestBed.configureTestingModule({
      providers: [
        WordsEffects,
        provideMockActions(() => actions),
        { provide: WordsApiService, useValue: mockWordsApiService },
        { provide: TranslateApiService, useValue: mockTranslateApiService },
      ],
    });

    effects = TestBed.inject(WordsEffects);
  });

  describe('when getWord$ effect api response is without errors', () => {
    it('should return GetWordsSuccess with payload', () => {
      const action = new WordsActions.GetWord();
      const completion = new WordsActions.GetWordSuccess(mockWordPayload);

      actions = hot('--a-', { a: action });
      const expected = cold('--b', { b: completion });

      expect(effects.getWord$).toBeObservable(expected);
      expect(mockWordsApiService.word).toHaveBeenCalled();
    });
  });

  describe('when getWord$ effect api response is with errors', () => {
    beforeEach(() => {
      responseWord.error('error message');
    });

    it('should return GetWordsError with error payload', () => {
      const action = new WordsActions.GetWord();
      const completion = new WordsActions.GetWordError('error message');

      actions = hot('--a-', { a: action });
      const expected = cold('--b', { b: completion });

      expect(effects.getWord$).toBeObservable(expected);
      expect(mockWordsApiService.word).toHaveBeenCalled();
    });
  });

  describe('when translateWord$ effect api response is without errors', () => {
    it('should return TranslateWordsSuccess with payload', () => {
      const action = new WordsActions.TranslateWord(mockWordToTranslate);
      const completion = new WordsActions.TranslateWordSuccess(
        mockTranslatePayload,
      );

      actions = hot('--a-', { a: action });
      const expected = cold('--b', { b: completion });

      expect(effects.translateWord$).toBeObservable(expected);
      expect(mockTranslateApiService.translate).toHaveBeenCalled();
    });
  });

  describe('when translateWord$ effect api response is with errors', () => {
    beforeEach(() => {
      responseTranslate.error('error message');
    });

    it('should return TranslateWordsError with error payload', () => {
      const action = new WordsActions.TranslateWord(mockWordToTranslate);
      const completion = new WordsActions.TranslateWordError('error message');

      actions = hot('--a-', { a: action });
      const expected = cold('--b', { b: completion });

      expect(effects.translateWord$).toBeObservable(expected);
      expect(mockTranslateApiService.translate).toHaveBeenCalled();
    });
  });
});
