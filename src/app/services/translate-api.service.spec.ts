import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TranslateApiService } from './translate-api.service';

describe('TranslateApiService', () => {
  let injector: TestBed;
  let service: TranslateApiService;
  let httpMock: HttpTestingController;

  const responseMock = {
    code: 200,
    lang: 'en-pl',
    text: ['czasowniki'],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ TranslateApiService ],
    });

    injector = getTestBed();
    service = injector.get(TranslateApiService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('translate()', () => {
    it('should get translation from API', () => {
      service.translate('verb', 'en|pl').subscribe((translation) => {
        expect(translation).toEqual(responseMock);
      });

      const reqMock = httpMock.expectOne(req => req.method === 'GET' && req.url === service.url).flush(responseMock);
    });

    it('should get error response', () => {
      service.translate('verb', 'en|pl').subscribe(
        () => {},
        (err) => {
          expect(err).toBeTruthy();
        });

      const reqMock = httpMock.expectOne(req => req.url === service.url).error(new ErrorEvent('ERROR'));
    });

    it('should have parameters', () => {
      service.translate('verb', 'en|pl').subscribe(() => {});

      const reqMock = httpMock.expectOne(req => req.url === service.url);
      expect(reqMock.request.params.has('q')).toBeTruthy();
      expect(reqMock.request.params.has('langpair')).toBeTruthy();
      expect(reqMock.request.params.get('q')).toEqual('verb');
      reqMock.flush({});
    });
  });
});
