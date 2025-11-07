import { __decorate } from "tslib";
import { Component, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
let FilterComponent = class FilterComponent {
    constructor() {
        this.filterString = new EventEmitter();
    }
    ngOnInit() {
        this.filterInput = new UntypedFormControl('');
    }
    clearFilter() {
        this.filterInput.reset('');
        this.filterString.emit(this.filterInput.value);
    }
    filterInputHandler() {
        this.filterString.emit(this.filterInput.value);
    }
};
__decorate([
    Output()
], FilterComponent.prototype, "filterString", void 0);
FilterComponent = __decorate([
    Component({
        selector: 'app-filter',
        templateUrl: './filter.component.html',
        styleUrls: ['./filter.component.scss'],
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
], FilterComponent);
export { FilterComponent };
//# sourceMappingURL=filter.component.js.map