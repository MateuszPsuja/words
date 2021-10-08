import {Observable} from 'rxjs';
import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';

import {WordTablePaginated} from './../../interfaces/wordTablePaginated.interface';

export interface WordData {
  id: string;
  word: string;
}

@Component({
             selector: 'app-table',
             templateUrl: './table.component.html',
             styleUrls: ['./table.component.scss'],
             changeDetection: ChangeDetectionStrategy.OnPush,
           })
export class TableComponent {

  @Input() wordsTablePaginated$: Observable<WordTablePaginated>;
  @Output() translateAction: EventEmitter<WordData> = new EventEmitter();
  @Output() deleteAction: EventEmitter<Event> = new EventEmitter();
  @Output() changedAction: EventEmitter<Event> = new EventEmitter();

  public isEdit: number | boolean = false;

  constructor() {
  }

  public translate(wordIdData: string, wordData: string): void {
    this.translateAction.emit(
      {
        id: wordIdData,
        word: wordData,
      },
    );
  }

  public delete(event: Event): void {
    this.deleteAction.emit(event);
  }

  public edit(wordId: number): void {
    this.isEdit = wordId;
  }

  public isEdited(wordId: number): boolean {
    return this.isEdit === wordId;
  }

  public changed(event: Event): void {
    this.isEdit = null;
    this.changedAction.emit(event);
  }

  public trackByFn(index: number, item): number {
    return item.id;
  }
}
