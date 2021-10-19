// tslint:disable-next-line: import-blacklist
import {throwError as _throw, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {catchError} from 'rxjs/operators';

import {AppState} from '../interfaces/appState.interface';
import {SET_ERROR} from './../store/error.actions';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {
  }

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((err) => {
          console.log(err, 'error');
          const payloadError = {
            code: err.status,
            codeText: err.statusText,
            errorMessage: err.message,
          };
          this.store.dispatch({type: SET_ERROR, payload: payloadError});
          return _throw(err);
        }));
  }
}
