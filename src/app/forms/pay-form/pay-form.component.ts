import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IBill } from 'src/app/interfaces/ibill';
import { ICard } from 'src/app/interfaces/icard';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-pay-form',
  templateUrl: './pay-form.component.html',
  styleUrls: ['./pay-form.component.css']
})
export class PayFormComponent implements OnInit {

  @Input() showProps: any;
  amount: number = 8;
  serial: string = "";
  constructor(private firestore: AngularFirestore, private authService: AuthService) { }

  ngOnInit(): void {
  }

  goBack() {
    this.showProps.showPayBeer = false;
    this.showProps.showMainMenu = true;
  }

  submit() {
    if (this.serial.length < 10) {
      alert("Serial numbers on Canadian Bills are 10 digits long. Re-enter a valid one.");
      return;
    }
    if (this.amount < 1) {
      alert("You need to buy more than 1 beer Mr. Stupid!");
      return;
    }

    const bill = {
      serial: this.serial,
      spent: false,
      userid: this.authService.currentUser.uid
    } as IBill;

    this.firestore
      .collection("bills")
      .add(bill)
      .then(res => {
        let card = this.showProps.card as ICard;
        let oweMessage = false;
        if (card.owing > 0) {
          if (this.amount > card.owing) {
            card.availableBeers = card.availableBeers + (this.amount - card.owing);
            card.owing = card.owing - (this.amount - card.owing);
          } else {
            card.owing = card.owing - this.amount;
          }
          oweMessage = true;
        } else {
          card.availableBeers = card.availableBeers + this.amount;
        }
        this.firestore.collection('cards').doc(card.cardid).update(card).then(d => {
          if (oweMessage) {
            alert("You have succesfully paid off " + this.amount + " beers.");
          } else {
            alert("Your card has succesfully been updated with " + this.amount + " beers.");
          }
          this.goBack();
        })
        console.log("Added a bill.");
      }, err => console.log(err));

  }

}
