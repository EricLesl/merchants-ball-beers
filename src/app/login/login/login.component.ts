import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = "";
  password: string = "";
  constructor(private authService: AuthService, private firestore: AngularFirestore){}
  signIn() {
    this.authService.SignIn(this.email, this.password).then((data) => {
      console.log(data);
    })
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
