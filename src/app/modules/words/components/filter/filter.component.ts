import {Component, OnInit, EventEmitter, Output, ChangeDetectionStrategy} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
             selector: 'app-filter',
             templateUrl: './filter.component.html',
             styleUrls: ['./filter.component.scss'],
             changeDetection: ChangeDetectionStrategy.OnPush,
           })
export class FilterComponent implements OnInit {

  @Output() filterString: EventEmitter<string> = new EventEmitter();

  public filterInput: FormControl;

  constructor() {
  }

  ngOnInit() {
    this.filterInput = new FormControl('');
  }

  public clearFilter(): void {
    this.filterInput.reset('');
    this.filterString.emit(this.filterInput.value);
  }

  public filterInputHandler(): void {
    this.filterString.emit(this.filterInput.value);
  }
}
