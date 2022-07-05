import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
@Injectable({
  providedIn: 'root'
})
export class AppUpdateService {
  constructor(private readonly updates: SwUpdate) {
    this.updates.available.subscribe(event => {
      this.showAppUpdateAlert();
    });
  }

  showAppUpdateAlert() {
    alert("There is an App update available. The app will now be reloaded to apply the update.");
    this.doAppUpdate();
  }

  doAppUpdate() {
      this.updates.activateUpdate().then(() => document.location.reload());
  }
}
