import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot , state: RouterStateSnapshot) : Observable<boolean> {
    return this.authService.user$.pipe(map(user => {
      if(user) return true;

      this.router.navigate(['/login'], {
        queryParams: { returnUrl: state.url }
      });
      return false;
    }));
  }
}
