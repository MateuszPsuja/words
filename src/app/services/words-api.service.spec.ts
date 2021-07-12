import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { WordsApiService } from './words-api.service';

describe('WordsApiService', () => {
  let injector: TestBed;
  let service: WordsApiService;
  let httpMock: HttpTestingController;

  const responseMock = {
    id: 244721,
    word: 'plane',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ WordsApiService ],
    });

    injector = getTestBed();
    service = injector.inject(WordsApiService);
    httpMock = injector.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('word()', () => {

    it('should get word from API', () => {
      service.word().subscribe((word) => {
        expect(word).toEqual(responseMock);
      });

      const reqMock = httpMock.expectOne(req => req.method === 'GET' && req.url === service.url).flush(responseMock);
    });

    it('should get error response', () => {
      service.word().subscribe(
        () => {},
        (err) => {
          expect(err).toBeTruthy();
        });

      const reqMock = httpMock.expectOne(req => req.url === service.url).error(new ErrorEvent('ERROR'));
    });

    it('should have parameters', () => {
      service.word().subscribe(() => {});

      const reqMock = httpMock.expectOne(req => req.url === service.url);
      expect(reqMock.request.params.has('api_key')).toBeTruthy();
      reqMock.flush({});
    });
  });
});
