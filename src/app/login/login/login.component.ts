import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = "";
  password: string = "";
  constructor(private authService: AuthService){}
  signIn() {
    this.authService.SignIn(this.email, this.password).then((data) => {
      console.log(data);
    })
  }
}
