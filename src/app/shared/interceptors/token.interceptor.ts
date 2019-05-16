import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (!req.url.includes('auth/login') && !req.url.includes('auth/signup')) {
            const cloneReq = req.clone({
                setHeaders: {
                    Authorization: localStorage.getItem("tokenType") + " " + localStorage.getItem("accessToken")
                }
            });

            return next.handle(cloneReq);
        } else {
            return next.handle(req).pipe(tap((event: HttpEvent<any>) => { }, (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if(err.error["message"] != null ){
                        this.authService.errorMsg(err.error["message"]);
                    }else{
                        this.authService.errorMsg("CONNECTION REFUSED !");
                    }
                    
                }
            }));;
        }

    }
}