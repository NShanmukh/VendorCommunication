import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  // tslint:disable-next-line: typedef
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    let authReq;
    const authToken = 'Bearer ';
    authReq = req.clone({
      setHeaders: {
        Authorization: authToken,
        'Content-Type': 'application/json'
      }
    });
    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}
