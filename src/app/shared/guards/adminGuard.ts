import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private authService: AuthService,private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
          if(localStorage.getItem("isAuth") == "true"){
            if(localStorage.getItem("isAdmin") == "true"){
                return true;
            }else{
              return this.router.parseUrl('');
            }
          }else{
            return this.router.parseUrl('/login');
          }
          
      }
}