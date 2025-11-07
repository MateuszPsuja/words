import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
let WordsApiService = class WordsApiService {
    constructor(http) {
        this.http = http;
        this.apiKey = environment.wordsApiKey;
        this.url = environment.wordsApiUrl;
    }
    word() {
        let params = new HttpParams();
        params = params.append('api_key', this.apiKey);
        params = params.append('includePartOfSpeech', 'noun');
        params = params.append('hasDictionaryDef', 'true');
        params = params.append('minDictionaryCount', '1');
        return this.http.get(this.url, { params });
    }
};
WordsApiService = __decorate([
    Injectable()
], WordsApiService);
export { WordsApiService };
//# sourceMappingURL=words-api.service.js.map