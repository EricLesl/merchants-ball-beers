import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { ICase } from 'src/app/interfaces/icase';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-case-form',
  templateUrl: './add-case-form.component.html',
  styleUrls: ['./add-case-form.component.css']
})
export class AddCaseFormComponent implements OnInit {
  @Input() showProps: any;
  downloadURL: Observable<string>;
  selectedFile: File = null;
  disableSubmit: boolean = false;
  serial: number;
  fb;
  constructor(private storage: AngularFireStorage, private authService: AuthService, private firestore: AngularFirestore) { }
  amount: number = 0;
  ngOnInit(): void {
  }


  goBack() {
    this.showProps.showAddCase = false;
    this.showProps.showMainMenu = true;
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  submit() {
    if (this.amount < 6) {
      alert("You can't add less than 6 beers buddy... Bump that number up.");
      return;
    }
    if (this.serial == null || this.serial.toString().length < 6) {
      alert("This serial number seems like bullshit. Please enter a real one.");
      return;
    }
    if (this.selectedFile == null) {
      alert("You need to add a picture of the case with the serial number visible!");
      return;
    }

    this.disableSubmit = true;

    var n = Date.now();
    const filePath = `CaseImages/${this.authService.currentUser.uid}_${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`CaseImages/${this.authService.currentUser.uid}_${n}`, this.selectedFile);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            const ncase = {
              serial: this.serial,
              beercount: this.amount,
              beerstaken: 0,
              userid: this.authService.currentUser.uid
            } as ICase
            this.firestore
              .collection("cases")
              .add(ncase)
              .then(res => {
                this.disableSubmit = false;
                alert("Case has been succesfully added! Thanks for contributing! You're a beauty!");
                this.goBack();
              }, err => console.log(err));
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }
}
