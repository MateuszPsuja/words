import {EffectsModule} from '@ngrx/effects';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {StoreModule} from '@ngrx/store';

import {WordsComponent} from './words.component';
import {EditComponent} from './components/edit/edit.component';
import {TableComponent} from './components/table/table.component';
import {FilterComponent} from './components/filter/filter.component';
import {WordsRoutesModule} from './wordsRouting.module';
import {WordsEffects} from './store/words.effects';
import {wordsReducer} from './store/words.reducer';

@NgModule({
            imports: [
              CommonModule,
              PaginationModule.forRoot(),
              FormsModule,
              ReactiveFormsModule,
              EffectsModule.forFeature([WordsEffects]),
              StoreModule.forFeature('words', wordsReducer),
              WordsRoutesModule,
            ],
            declarations: [WordsComponent, EditComponent, FilterComponent, TableComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
          })
export class WordsModule {
}
