import {By} from '@angular/platform-browser';
import {of} from 'rxjs';
import {Store} from '@ngrx/store';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {
  Component,
  ViewChild,
  NO_ERRORS_SCHEMA,
  ViewContainerRef,
} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';

import {ErrorModalComponent} from './error-modal.component';

const mockStoreData = {
  isError: true,
  error: {
    code: 404,
    codeText: 'Page not found',
    errorMessage: 'Page not found',
  },
};

const mockModalService = {
  show: jasmine
    .createSpy('show')
    .and.returnValue({hide: jasmine.createSpy('hide')}),
};

const mockStore = {
  select: jasmine
    .createSpy('select')
    .and.returnValue(of(mockStoreData)),
  dispatch: jasmine.createSpy('dispatch'),
};

@Component({
             template: `
               <app-error-modal></app-error-modal>`,
           })
class TestHostComponent {
  @ViewChild(ErrorModalComponent, /* TODO: add static flag */ <any>{})
  public errorModalComponent: ErrorModalComponent;

  @ViewChild(ErrorModalComponent, /* TODO: add static flag */ <any>{read: ViewContainerRef})
  vcr: ViewContainerRef;

  constructor(public view: ViewContainerRef) {
  }
}

describe('ErrorModalComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
                                     declarations: [TestHostComponent, ErrorModalComponent],
                                     providers: [
                                       {provide: Store, useValue: mockStore},
                                       {provide: BsModalService, useValue: mockModalService},
                                     ],
                                     schemas: [NO_ERRORS_SCHEMA],
                                   }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal on errors', () => {
    expect(mockStore.select).toHaveBeenCalledWith('error');
    expect(mockModalService.show).toHaveBeenCalled();
  });

  it('should display error code and message', () => {
    component.vcr.createEmbeddedView(component.errorModalComponent.templateRef);
    fixture.detectChanges();
    const modalTitle = fixture.debugElement.query(By.css('.modal-title'))
      .nativeElement.innerText;
    const modalBody = fixture.debugElement.query(By.css('.modal-body'))
      .nativeElement.innerText;
    expect(modalTitle).toContain('404 Page not found');
    expect(modalTitle).toContain('Page not found');
  });

  it('should close modal on close button click', () => {
    component.vcr.createEmbeddedView(component.errorModalComponent.templateRef);
    fixture.debugElement
      .query(By.css('.close'))
      .triggerEventHandler('click', new Event('click'));
    fixture.detectChanges();
    expect(mockStore.dispatch).toHaveBeenCalledWith({
                                                      type: '[Error] Clear error',
                                                    });
    expect(component.errorModalComponent.modalRef.hide).toHaveBeenCalled();
  });
});
