import {ErrorInterceptor} from './interceptors/errors.interceptor';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule, ActionReducer} from '@ngrx/store';
import {routerReducer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {localStorageSync} from 'ngrx-store-localstorage';
import {ModalModule} from 'ngx-bootstrap/modal';

import {TranslateApiService} from './services/translate-api.service';
import {WordsApiService} from './services/words-api.service';
import {AppComponent} from './app.component';
import {MenuComponent} from './components/menu/menu.component';
import {FooterComponent} from './components/footer/footer.component';
import {LogoComponent} from './components/logo/logo.component';
import {WordFilterPipe} from './pipes/word-filter.pipe';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {ErrorModalComponent} from './components/error-modal/error-modal.component';
import {errorReducer} from './store/error.reducer';
import {AppRoutingModule} from './appRouting.module';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: ['words'], rehydrate: true})(reducer);
}

const metaReducers = [localStorageSyncReducer];

@NgModule({
            declarations: [
              AppComponent,
              MenuComponent,
              FooterComponent,
              LogoComponent,
              WordFilterPipe,
              NotFoundComponent,
              ErrorModalComponent,
            ],
            imports: [
              BrowserModule,
              HttpClientModule,
              ModalModule.forRoot(),
              EffectsModule.forRoot([]),
              StoreModule.forRoot(
                {
                  router: routerReducer,
                  error: errorReducer,
                },
                {
                  metaReducers,
                },
              ),
              StoreRouterConnectingModule.forRoot(),
              StoreDevtoolsModule.instrument(),
              AppRoutingModule,
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            providers: [WordsApiService, TranslateApiService, WordFilterPipe, {
              provide: HTTP_INTERCEPTORS,
              useClass: ErrorInterceptor,
              multi: true,
            }],
            bootstrap: [AppComponent],
          })
export class AppModule {
}
