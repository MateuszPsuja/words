import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {WordsComponent} from './words.component';

export const wordsRoutes: Routes = [
  {
    path: '',
    component: WordsComponent,
  },
];

@NgModule({
            imports: [RouterModule.forChild(wordsRoutes)],
            exports: [RouterModule],
          })
export class WordsRoutesModule {
}
