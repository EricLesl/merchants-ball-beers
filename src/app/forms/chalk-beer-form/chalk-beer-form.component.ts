import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { ICard } from 'src/app/interfaces/icard';

@Component({
  selector: 'app-chalk-beer-form',
  templateUrl: './chalk-beer-form.component.html',
  styleUrls: ['./chalk-beer-form.component.css']
})
export class ChalkBeerFormComponent implements OnInit {
  @Input() showProps: any;
  amount: number = 1;
  constructor(private parent: DashboardComponent, private firestore: AngularFirestore, public cdr: ChangeDetectorRef) {

   }

  ngOnInit(): void {
  }

  goBack() {
    this.showProps.showChalkBeer = false;
    this.showProps.showMainMenu = true;
  }

  submit() {
    let card = this.showProps.card as ICard;
    if (card.availableBeers >= this.amount) {
      card.availableBeers = card.availableBeers - this.amount;
      card.totalDrank = card.totalDrank + this.amount;
      this.firestore.collection('cards').doc(card.cardid).update(card).then(d => {
        alert("Beer has been chalked!");
        this.goBack();
      })
    } else {
      alert("Shit bud - You don't have enough purchased beers to chalk this. Go back to the main menu and add some.");
      return;
    }
  }

}
