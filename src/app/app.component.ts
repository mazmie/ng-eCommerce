import { UserService } from './user.service';
import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private auth: AuthService,
    router: Router,
    userService: UserService) {
    auth.user$.subscribe(user => {
      if (!user) { return; }
      userService.save(user);

      const returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl) { return; }

      router.navigateByUrl(returnUrl);
      localStorage.removeItem('returnUrl');
    });
  }
}
