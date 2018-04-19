import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return this.auth.user$.map(user => {
        if (user) {
          return true;
        }

        this.router.navigate(['/login'], { queryParams: {returnUrl: state.url }});
        return false;
      });
    }
}
