import {Subscription, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
  OnDestroy,
} from '@angular/core';
import {Store} from '@ngrx/store';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';

import {CLEAR_ERROR} from './../../store/error.actions';
import {AppState} from './../../interfaces/appState.interface';

@Component({
             selector: 'app-error-modal',
             templateUrl: './error-modal.component.html',
             encapsulation: ViewEncapsulation.None,
             styleUrls: ['./error-modal.component.scss'],
           })
export class ErrorModalComponent implements OnInit, OnDestroy {
  @ViewChild('template', {static: true}) public templateRef: TemplateRef<any>;

  public modalRef: BsModalRef;
  public isError: Subscription;
  public errorData$: Observable<any>;

  constructor(
    private modalService: BsModalService,
    private store: Store<AppState>,
  ) {
  }

  public ngOnInit() {
    this.isErrorInit();
    this.errorDataInit();
  }

  public ngOnDestroy() {
    this.isError.unsubscribe();
  }

  private errorDataInit(): void {
    this.errorData$ = this.store
      .select('error')
      .pipe(map(state => state.error));
  }

  private isErrorInit(): void {
    this.isError = this.store
      .select('error')
      .pipe(map(state => state.isError))
      .subscribe((errorState: boolean) => {
        if (errorState) {
          this.openModal(this.templateRef);
        }
      });
  }

  private openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  public closeModal(): void {
    this.store.dispatch({type: CLEAR_ERROR});
    this.modalRef.hide();
  }
}
