import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
// import {Observable} from "rxjs";
//
// @Injectable({
//   providedIn: 'root'
// })
// export class JwtInterceptorService implements HttpInterceptor{
//
//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     // add authorization header with jwt token if available
//     let currentUser = this.authenticationService.currentUserValue;
//     if (currentUser && currentUser.token) {
//       request = request.clone({
//         setHeaders: {
//           Authorization: `Bearer ${currentUser.token}`
//         }
//       });
//     }
//
//     return next.handle(request);
//   }
// }
