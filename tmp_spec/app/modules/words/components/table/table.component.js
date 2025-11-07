import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
let TableComponent = class TableComponent {
    constructor() {
        this.translateAction = new EventEmitter();
        this.deleteAction = new EventEmitter();
        this.changedAction = new EventEmitter();
        this.isEdit = false;
    }
    translate(wordIdData, wordData) {
        this.translateAction.emit({
            id: wordIdData,
            word: wordData,
        });
    }
    delete(event) {
        this.deleteAction.emit(event);
    }
    edit(wordId) {
        this.isEdit = wordId;
    }
    isEdited(wordId) {
        return this.isEdit === wordId;
    }
    changed(event) {
        this.isEdit = null;
        this.changedAction.emit(event);
    }
    trackByFn(index, item) {
        return item.id;
    }
};
__decorate([
    Input()
], TableComponent.prototype, "wordsTablePaginated$", void 0);
__decorate([
    Output()
], TableComponent.prototype, "translateAction", void 0);
__decorate([
    Output()
], TableComponent.prototype, "deleteAction", void 0);
__decorate([
    Output()
], TableComponent.prototype, "changedAction", void 0);
TableComponent = __decorate([
    Component({
        selector: 'app-table',
        templateUrl: './table.component.html',
        styleUrls: ['./table.component.scss'],
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
], TableComponent);
export { TableComponent };
//# sourceMappingURL=table.component.js.map