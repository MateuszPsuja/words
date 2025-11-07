import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
let WordFilterPipe = class WordFilterPipe {
    transform(value, key, term) {
        const filteredArray = term !== ''
            ? value.filter(item => (item[key].indexOf(term) > -1))
            : value;
        return filteredArray.length > 0
            ? filteredArray
            : [-1];
    }
};
WordFilterPipe = __decorate([
    Pipe({
        name: 'wordFilter',
    })
], WordFilterPipe);
export { WordFilterPipe };
//# sourceMappingURL=word-filter.pipe.js.map