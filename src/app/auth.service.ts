import { Injectable } from '@angular/core';
import { Auth, authState, GoogleAuthProvider, signInWithRedirect, signOut, User } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, of, switchMap } from 'rxjs';
import { AppUser } from './models/app-user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;
  
  constructor(private auth: Auth, private route: ActivatedRoute, private userService: UserService) {
    this.user$ = authState(this.auth) as Observable<User>;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl") || "/";
    localStorage.setItem("returnUrl", returnUrl);

    signInWithRedirect(this.auth, new GoogleAuthProvider());
  }

  logout() {
    signOut(this.auth);
  }

  get appUser$() {
    return this.user$.pipe(switchMap(async user => {
      if(user) return await this.userService.getUser(user.uid);

      return null
    }));
  }
}
