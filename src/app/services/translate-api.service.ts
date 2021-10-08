import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/';

@Injectable()
export class TranslateApiService {

  public url = environment.translateUrl;

  constructor(private http: HttpClient) { }

  public translate(wordToTranslate: string, language: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('q', wordToTranslate);
    params = params.append('langpair', language);
    return this.http.get(this.url, { params });
  }
}
