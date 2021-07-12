import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Component, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';

import { FilterComponent } from './filter.component';

describe('FilterComponent', () => {
  const expectedValue = 'string';
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  @Component({
    template: `<app-filter (filterString)="getOutput($event)"></app-filter>`,
  })
  class TestHostComponent {
    @ViewChild(FilterComponent, /* TODO: add static flag */ <any>{})
    public filterComponent: FilterComponent;
    public filterStringOutput = 'none';

    public getOutput(event) {
      this.filterStringOutput = event;
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ TestHostComponent, FilterComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
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

  it('should clear form on click on clear button', () => {
    component.filterComponent.filterInput.setValue(expectedValue);
    fixture.debugElement.query(By.css('.clear-button')).triggerEventHandler('click', new Event('click'));
    const fixtureValue = component.filterComponent.filterInput.value;
    expect(fixtureValue).toEqual('');
  });

  it('should output value on input enter key', () => {
    component.filterComponent.filterInput.setValue(expectedValue);
    fixture.debugElement.query(By.css('.filter-input')).triggerEventHandler('keyup', new Event('keyup'));
    expect(component.filterStringOutput).toEqual(expectedValue);
  });
});
