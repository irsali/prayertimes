import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IrsNotificationService } from '@app/shared';
import { Router } from '@angular/router';
import { environment } from '@env/environment';

// Error Interceptor not in Used. Not tapping all HttpErrorResponse
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  apiUrl = environment.apiUrl;

  constructor(private notificationService: IrsNotificationService, private router: Router, private http: HttpClient, ) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request)
      .pipe(
        tap(event => {
          if (event instanceof HttpErrorResponse) {
            console.log(event);
            const error = event;
            if (error.status === 400) {
              // bad request
              const errorMessage = this.getMessageToDisplay(error.error, '');
              this.notificationService.notifyBadRequest(errorMessage, error.statusText);
            } else if (error.status === 404) {
              // not found
              this.notificationService.notifyBadRoute(null, error.statusText);
            } else if (error.status === 401) {
              // Unauthorized
              if (error.headers.has('Refresh-Token-Required')) {
                this.http.get(
                  // tslint:disable-next-line: max-line-length
                  `${this.apiUrl}Account/Refresh?token=${localStorage.getItem('token')}&refreshToken=${localStorage.getItem('refresh_token')}`
                ).subscribe(x => {
                  if (x) {
                    console.log('token refreshed');
                    console.log(x);
                  }
                });
              } else {
                this.notificationService.notifyBadRequest('User is not Authorized to acces this resource.', error.statusText);
                this.router.navigateByUrl('');
              }
              // return of<T>(null);

            } else if (error.status === 0) {
              // Bad Gateway or Server Error. 500+ error
              this.notificationService.notifyBadRoute('Please try again later!', error.statusText);
            } else {
              console.warn('handle this error in Http Service');
              console.warn(error);
            }
          }
        })
      );
  }

  private getMessageToDisplay(error: any, extactedMessage: string): string {
    if (!error) {
      return '';
    }
    if (typeof error === 'string') {
      return error;
    } else if (Array.isArray(error)) {
      error.forEach(x => (extactedMessage += this.getMessageToDisplay(x, extactedMessage)));
      return extactedMessage;
    } else {
      Object.keys(error).forEach(x => extactedMessage += this.getMessageToDisplay(error[x], extactedMessage));
      return extactedMessage;
    }
  }
}
