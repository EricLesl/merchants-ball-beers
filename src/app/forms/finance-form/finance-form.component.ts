import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ICard } from 'src/app/interfaces/icard';

@Component({
  selector: 'app-finance-form',
  templateUrl: './finance-form.component.html',
  styleUrls: ['./finance-form.component.css']
})
export class FinanceFormComponent implements OnInit {
  amount: number = 8;
  @Input() showProps: any;
  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  goBack() {
    this.showProps.showFinanceBeer = false;
    this.showProps.showMainMenu = true;
  }

  submit() {
    if (this.amount == null || this.amount < 1) {
      alert("You need to add at least one beer to finance!");
      return;
    }

    let card = this.showProps.card as ICard;
    card.availableBeers = card.availableBeers + this.amount;
    card.owing = this.amount;
    this.firestore.collection('cards').doc(card.cardid).update(card).then(d => {
      alert(`Beer has been added. You ower $${this.amount * 2.50} and this can be paid from the 'Pay for Beers' option on the main menu.`);
      this.goBack();
    })
  }
}
