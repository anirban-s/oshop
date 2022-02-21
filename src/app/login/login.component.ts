import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
// import { Auth,  GoogleAuthProvider,  confirmPasswordReset,  createUserWithEmailAndPassword,  getRedirectResult,  sendPasswordResetEmail,
//   signInWithEmailAndPassword,  signInWithRedirect,  signOut,  verifyPasswordResetCode} from '@angular/fire/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService) { }

  login() {
    this.authService.login();
  }

}
