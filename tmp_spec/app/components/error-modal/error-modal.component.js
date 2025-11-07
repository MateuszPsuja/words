import { __decorate } from "tslib";
import { map } from 'rxjs/operators';
import { Component, ViewChild, ViewEncapsulation, } from '@angular/core';
import { CLEAR_ERROR } from './../../store/error.actions';
let ErrorModalComponent = class ErrorModalComponent {
    constructor(modalService, store) {
        this.modalService = modalService;
        this.store = store;
    }
    ngOnInit() {
        this.isErrorInit();
        this.errorDataInit();
    }
    ngOnDestroy() {
        this.isError.unsubscribe();
    }
    errorDataInit() {
        this.errorData$ = this.store
            .select('error')
            .pipe(map(state => state.error));
    }
    isErrorInit() {
        this.isError = this.store
            .select('error')
            .pipe(map(state => state.isError))
            .subscribe((errorState) => {
            if (errorState) {
                this.openModal(this.templateRef);
            }
        });
    }
    openModal(template) {
        this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    }
    closeModal() {
        this.store.dispatch({ type: CLEAR_ERROR });
        this.modalRef.hide();
    }
};
__decorate([
    ViewChild('template', { static: true })
], ErrorModalComponent.prototype, "templateRef", void 0);
ErrorModalComponent = __decorate([
    Component({
        selector: 'app-error-modal',
        templateUrl: './error-modal.component.html',
        encapsulation: ViewEncapsulation.None,
        styleUrls: ['./error-modal.component.scss'],
    })
], ErrorModalComponent);
export { ErrorModalComponent };
//# sourceMappingURL=error-modal.component.js.map