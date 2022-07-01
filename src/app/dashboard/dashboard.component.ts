import { Component, OnInit } from '@angular/core';
import { User } from '../services/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayName: any;

  constructor() {
    this.displayName = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit(): void {
  }

}
