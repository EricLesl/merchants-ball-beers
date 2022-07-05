import { Component } from '@angular/core';
import { AppUpdateService } from './services/app-update-service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'merchants-ball-beers';
  constructor(private updateService: AppUpdateService){}

}
