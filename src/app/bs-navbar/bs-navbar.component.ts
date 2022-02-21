import { Component } from '@angular/core';
// import { Auth, authState, signOut, User } from '@angular/fire/auth';
import { AuthService } from '../auth.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  appUser: any;

  constructor(public authService: AuthService) {
    this.authService.appUser$.subscribe(appUser => {
      this.appUser = appUser;
    })
     
   }

  logout() {
    this.authService.logout();
  }

}
