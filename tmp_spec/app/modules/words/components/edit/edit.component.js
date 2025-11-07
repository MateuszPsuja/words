import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, ViewChild, ChangeDetectionStrategy, } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
let EditComponent = class EditComponent {
    constructor() {
        this.wordValue = '';
        this.wordId = null;
        this.isEdit = false;
        this.changedWordValue = new EventEmitter(true);
    }
    ngOnInit() {
        this.wordInput = new UntypedFormControl(this.wordValue);
    }
    ngOnChanges(changes) {
        if (changes.isEdit && changes.isEdit.currentValue) {
            if (this.wordInputElement) {
                setTimeout(() => this.wordInputElement.nativeElement.focus(), 250);
            }
        }
        else {
            this.isEdit = false;
        }
    }
    saveWord() {
        this.changedWordValue.emit({ id: this.wordId, word: this.wordInput.value });
    }
    saveOnEnter(event) {
        if (event.key === 'Enter') {
            this.saveWord();
        }
    }
    clearField() {
        this.wordInput.reset('');
        this.wordInputElement.nativeElement.focus();
    }
};
__decorate([
    Input()
], EditComponent.prototype, "wordValue", void 0);
__decorate([
    Input()
], EditComponent.prototype, "wordId", void 0);
__decorate([
    Input()
], EditComponent.prototype, "isEdit", void 0);
__decorate([
    Output()
], EditComponent.prototype, "changedWordValue", void 0);
__decorate([
    ViewChild('word')
], EditComponent.prototype, "wordInputElement", void 0);
EditComponent = __decorate([
    Component({ selector: 'app-edit', templateUrl: './edit.component.html',
        styleUrls: ['./edit.component.scss'], changeDetection: ChangeDetectionStrategy.OnPush,
    })
], EditComponent);
export { EditComponent };
//# sourceMappingURL=edit.component.js.map