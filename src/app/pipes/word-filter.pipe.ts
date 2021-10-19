import {Pipe, PipeTransform} from '@angular/core';

import {WordTableRow} from './../modules/words/interfaces/wordTableRow.interface';

@Pipe({
        name: 'wordFilter',
      })
export class WordFilterPipe implements PipeTransform {

  public transform(value: any, key: string, term: string): WordTableRow[] | number[] {
    const filteredArray = term !== ''
      ? value.filter(item => (item[key].indexOf(term) > -1))
      : value;
    return filteredArray.length > 0
      ? filteredArray
      : [-1];
  }
}
