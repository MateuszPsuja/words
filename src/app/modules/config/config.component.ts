import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Store} from '@ngrx/store';

import {AppState} from './../../interfaces/appState.interface';
import {CLEAR_DATA} from './../words/store/words.actions';

@Component({
             selector: 'app-config',
             templateUrl: './config.component.html',
             styleUrls: ['./config.component.scss'],
             changeDetection: ChangeDetectionStrategy.OnPush,
           })
export class ConfigComponent implements OnInit {

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
  }

  public clearData() {
    this.store.dispatch({type: CLEAR_DATA});
  }
}
