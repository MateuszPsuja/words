import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  @Output() filterString: EventEmitter<any> = new EventEmitter();

  public filterInput: FormControl;

  constructor() {}

  ngOnInit() {
    this.filterInput = new FormControl('');
  }

  public clearFilter(): void {
    this.filterInput.reset('');
    this.filterString.emit(this.filterInput.value);
  }

  public searchInputHandler() {
    this.filterString.emit(this.filterInput.value);
  }
}