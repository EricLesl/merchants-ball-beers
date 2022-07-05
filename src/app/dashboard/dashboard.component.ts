import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ICard } from '../interfaces/icard';
import { AuthService } from '../services/auth.service';
import { collection, query, where, getDocs } from "firebase/firestore";
import { ChalkBeerFormComponent } from '../forms/chalk-beer-form/chalk-beer-form.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayName: string = "";
  menuItems: any[] = [];
  owing: string = "$0.00";
  card: ICard = {
    userid: this.authService.currentUser.uid,
    totalDrank: 0,
    availableBeers: 0,
    owing: 0
  };
  showProps: any = {
    showMainMenu: true,
    showChalkBeer: false,
    card: this.card
  }

  @ViewChild('chalkBeerForm') chalkABeerComponent: ChalkBeerFormComponent;

  constructor(public authService: AuthService, private firestore: AngularFirestore) {
    this.displayName = this.authService.currentUser.displayName;
    this.menuItems.push({
      text: "Chalk a Beer",
      number: 1
    });
    this.menuItems.push({
      text: "Pay for Beers",
      number: 2
    });
    this.menuItems.push({
      text: "Finance Beers (Broke Bitch)",
      number: 3
    });
    this.menuItems.push({
      text: "Add a Case",
      number: 4
    });

    this.firestore.collection('cards', ref => ref.where('userid', '==', this.authService.currentUser.uid)).get().subscribe(d => {
      let found = d.docs[0].data() as ICard;
      this.card = {
        userid: found.userid,
        totalDrank: found.totalDrank,
        availableBeers: found.availableBeers,
        owing: found.owing,
        cardid: d.docs[0].id
      };
      this.owing = (this.card.owing * 2.50).toFixed(2);
      this.showProps.card = this.card;
      this.chalkABeerComponent.cdr.detectChanges();
    });
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.SignOut();
  }

  chalkABeer() {
    if (this.card.availableBeers < 1) {
      alert("Uh oh - It looks like you are out of paid for beers. Buy some more to chalk a beer there bud.");
      return;
    } else {
      this.showProps.showChalkBeer = true;
      this.showProps.showMainMenu = false;
    }
  }

  doCorrectFunction(number: number) {
    if (number == 1) {
      this.chalkABeer();
    }

    if (number == 2) {

    }

    if (number == 3) {

    }
  }

}
