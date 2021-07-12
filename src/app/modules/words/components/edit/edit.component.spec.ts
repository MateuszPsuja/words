import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, ViewChild, Component } from '@angular/core';
import { EditComponent } from './edit.component';
import { By } from '@angular/platform-browser';

const expectedValue = { id: '123', word: 'Test' };

describe('EditComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  @Component({
    template: `<app-edit (changedWordValue)="getOutput($event)"
      wordValue='lorem ipsum'
      wordId='123'
      [isEdit]='isEdit'
      ></app-edit>`,
  })
  class TestHostComponent {
    @ViewChild(EditComponent, /* TODO: add static flag */ <any>{})
    public editComponent: EditComponent;
    public outputValue: any;
    public isEdit: any = 123;
    public getOutput(event) {
      this.outputValue = event;
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ TestHostComponent, EditComponent ],
      schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear input on click on clear button', () => {
    fixture.debugElement.query(By.css('.clear')).triggerEventHandler('click', new Event('click'));
    fixture.detectChanges();
    const fixtureValue = component.editComponent.wordInput.value;
    expect(fixtureValue).toEqual('');
  });

  it('should emit output value on edit enter key', fakeAsync(() => {
    component.editComponent.wordInput.setValue('Test');
    fixture.debugElement.query(By.css('#word'))
      .triggerEventHandler('keydown', new KeyboardEvent('keydown', { key: 'Enter' }));
    tick();
    expect(component.outputValue).toEqual(expectedValue);
  }));

  it('should emit output value on click on save button', fakeAsync(() => {
    component.editComponent.wordInput.setValue('Test');
    fixture.debugElement.query(By.css('.save-word'))
      .triggerEventHandler('click', new Event('click'));
    tick();
    expect(component.outputValue).toEqual(expectedValue);
  }));

  it('should display wordValue if isEdit is false', () => {
    component.isEdit = false;
    fixture.detectChanges();
    const doesItDisplayWord = fixture.debugElement.query(By.css('.word-value')).nativeElement.textContent;
    expect(doesItDisplayWord).toEqual('lorem ipsum');
  });

  it('should display input if isEdit is wordId', () => {
    expect(fixture.debugElement.query(By.css('#word'))).toBeTruthy();
  });

  it('should display wordValue after enter key', () => {
    fixture.debugElement.query(By.css('#word'))
      .triggerEventHandler('keydown', new KeyboardEvent('keydown', { key: 'Enter' }));
    component.isEdit = false;
    fixture.detectChanges();
    const doesItDisplayWord = fixture.debugElement.query(By.css('.word-value')).nativeElement.textContent;
    expect(doesItDisplayWord).toEqual('lorem ipsum');
  });

  it('should display wordValue after save button click', () => {
    fixture.debugElement.query(By.css('.save-word')).triggerEventHandler('click', new Event('click'));
    component.isEdit = false;
    fixture.detectChanges();
    const doesItDisplayWord = fixture.debugElement.query(By.css('.word-value')).nativeElement.textContent;
    expect(doesItDisplayWord).toEqual('lorem ipsum');
  });
});
