import {Component, OnInit, EventEmitter, Output, ChangeDetectionStrategy} from '@angular/core';
import {UntypedFormControl} from '@angular/forms';

@Component({
             selector: 'app-filter',
             templateUrl: './filter.component.html',
             styleUrls: ['./filter.component.scss'],
             changeDetection: ChangeDetectionStrategy.OnPush,
           })
export class FilterComponent implements OnInit {

  @Output() filterString: EventEmitter<string> = new EventEmitter();

  public filterInput: UntypedFormControl;

  constructor() {
  }

  ngOnInit() {
    this.filterInput = new UntypedFormControl('');
  }

  public clearFilter(): void {
    this.filterInput.reset('');
    this.filterString.emit(this.filterInput.value);
  }

  public filterInputHandler(): void {
    this.filterString.emit(this.filterInput.value);
  }
}
