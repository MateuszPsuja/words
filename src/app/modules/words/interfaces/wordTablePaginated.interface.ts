import { WordTableRow } from './wordTableRow.interface';

export interface WordTablePaginated {
  [index: number]: {
    WordTableRow: WordTableRow;
  };
}
