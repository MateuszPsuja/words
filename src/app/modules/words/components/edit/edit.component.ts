import {
  Component, OnInit, Input, Output, EventEmitter, ViewChild,
  OnChanges, SimpleChanges, ChangeDetectionStrategy, ElementRef,
} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({selector: 'app-edit', templateUrl: './edit.component.html',
             styleUrls: ['./edit.component.scss'], changeDetection: ChangeDetectionStrategy.OnPush,
           })
export class EditComponent implements OnInit, OnChanges {

  @Input() wordValue = '';
  @Input() wordId = null;
  @Input() isEdit = false;
  @Output() changedWordValue: EventEmitter<any> = new EventEmitter<any>(true);
  @ViewChild('word') wordInputElement: ElementRef;

  public wordInput: FormControl;

  constructor() {
  }

  public ngOnInit() {
    this.wordInput = new FormControl(this.wordValue);
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.isEdit && changes.isEdit.currentValue) {
      if (this.wordInputElement) {
        setTimeout(() => this.wordInputElement.nativeElement.focus(), 250);
      }
    } else {
      this.isEdit = false;
    }
  }

  public saveWord(): void {
    this.changedWordValue.emit({id: this.wordId, word: this.wordInput.value});
  }

  public saveOnEnter(event: any): void {
    if (event.key === 'Enter') {
      this.saveWord();
    }
  }

  public clearField(): void {
    this.wordInput.reset('');
    this.wordInputElement.nativeElement.focus();
  }
}
