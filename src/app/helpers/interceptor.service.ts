import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, timeout } from 'rxjs/operators';
// import { ProgressBarService } from '../components/progress-bar/progress-bar.service';

@Injectable()
export class InterceptorService {
  constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const suppressMessage = req.reportProgress;
    // this.progressBarService.show(req.url, req.headers);

    return next.handle(this.cloneHeaders(req)).pipe(
      timeout(10000),
      tap(
        event => {
          if (event instanceof HttpErrorResponse) {
            this.handleErrorResponse(event, suppressMessage);
          } else if (event instanceof HttpResponse) {
            // this.progressBarService.hide();
          }
        },
        (error: any) => {
          if (error instanceof HttpErrorResponse) {
            this.handleErrorResponse(error, suppressMessage);
          }
        }
      )
    );
  }

  private handleErrorResponse(
    error: HttpErrorResponse,
    suppresMessage: boolean = false
  ) {
    // this.progressBarService.hide();
  }

  private cloneHeaders(req: HttpRequest<any>): any {
    const url = req.url;
    const headers = sessionStorage.getItem('token')
      ? { 'X-access-token': sessionStorage.getItem('token') }
      : {};
    const request = req.clone({ url, setHeaders: headers });
    return request;
  }
}
