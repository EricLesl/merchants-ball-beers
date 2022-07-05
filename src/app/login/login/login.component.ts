import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AppUpdateService } from 'src/app/services/app-update-service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = "";
  password: string = "";
  showRegister: boolean = false;
  regEmail: string = "";
  regPassword: string = "";
  regPassword2: string = "";
  name: string = "";

  constructor(private authService: AuthService, private firestore: AngularFirestore){}
  signIn() {
    this.authService.SignIn(this.email, this.password).then((data) => {
      console.log(data);
    })
  }

  signUp() {
    if (this.name == null || this.name == "") {
      alert("You didn't enter a valid name. Please retry.");
      return;
    }
    if (this.regEmail == null || this.regEmail == "") {
      alert("You didn't enter an email.")
      return;
    }
    if (!this.validateEmail(this.regEmail)) {
      alert("Invalid email.");
      return;
    }
    if (this.regPassword.length < 3) {
      alert("Password is too short. Retry with a longer one.");
      return;
    }
    if (this.regPassword !== this.regPassword2) {
      alert("Passwords do not match. Retry.");
      return;
    }

    const profile = {
      displayName: this.name,
      photoURL: ""
    }

    this.email = this.regEmail;
    this.password = this.regPassword;

    this.authService.SignUp(this.email, this.password, this.name).then(data => {
      alert("User succesfully registered!");
      this.showRegister = false;
    });
  }

  goBack() {
    this.showRegister = false;
  }

  validateEmail(email: string) {
    if (/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email)){
      return true;
    } else {
      return false;
    }
  }

  showSignUp() {
    this.showRegister = true;
  }

  addCase() {
    let user = JSON.parse(localStorage.getItem('user'));
    let id = user['uid'];
    let data = {
      barcode: 1234,
      userid: id,
      beercount: 30,
      beerstaken: 0
    }
    return new Promise<any>((resolve, reject) =>{
      this.firestore
          .collection("cases")
          .add(data)
        .then(res => {
          console.log(res);
          }, err => reject(err));
  });
  }
}
