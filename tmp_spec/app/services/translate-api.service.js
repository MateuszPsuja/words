import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
let TranslateApiService = class TranslateApiService {
    constructor(http) {
        this.http = http;
        this.url = environment.translateUrl;
    }
    translate(wordToTranslate, language) {
        let params = new HttpParams();
        params = params.append('q', wordToTranslate);
        params = params.append('langpair', language);
        return this.http.get(this.url, { params });
    }
};
TranslateApiService = __decorate([
    Injectable()
], TranslateApiService);
export { TranslateApiService };
//# sourceMappingURL=translate-api.service.js.map