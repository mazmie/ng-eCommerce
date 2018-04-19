import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(private authService: AuthService,
    private userService: UserService) {

   }

   canActivate(): Observable<boolean> {
    return this.authService.appUser$
      .map(appUser => appUser.isAdmin);
   }
}
