import { __decorate } from "tslib";
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CLEAR_DATA } from './../words/store/words.actions';
let ConfigComponent = class ConfigComponent {
    constructor(store) {
        this.store = store;
    }
    ngOnInit() {
    }
    clearData() {
        this.store.dispatch({ type: CLEAR_DATA });
    }
};
ConfigComponent = __decorate([
    Component({
        selector: 'app-config',
        templateUrl: './config.component.html',
        styleUrls: ['./config.component.scss'],
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
], ConfigComponent);
export { ConfigComponent };
//# sourceMappingURL=config.component.js.map