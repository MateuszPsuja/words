import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/';

import {environment} from '../../environments/environment';

@Injectable()
export class WordsApiService {

  readonly apiKey = environment.wordsApiKey;
  readonly url = environment.wordsApiUrl;

  constructor(private http: HttpClient) {
  }

  public word(): Observable<any> {
    let params = new HttpParams();
    params = params.append('api_key', this.apiKey);
    params = params.append('includePartOfSpeech', 'noun');
    params = params.append('hasDictionaryDef', 'true');
    params = params.append('minDictionaryCount', '1');
    return this.http.get(this.url, {params});
  }
}
