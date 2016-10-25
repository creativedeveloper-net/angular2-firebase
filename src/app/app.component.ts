import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loggedIn = false;
  user = {};
  items: FirebaseListObservable<any[]>;
  constructor(private af: AngularFire) {
    this.af.auth.subscribe(user => {
      if (user) {
        this.loggedIn = true;
        this.user = user;
        console.log(user);
      } else {
        this.loggedIn = false;
        this.user = {};
      }
    });
    this.items = af.database.list('/items');
  }
  addItem(newName: string) {
    this.items.push({ text: newName });
  }
  updateItem(key: string, newText: string) {
    this.items.update(key, { text: newText });
  }
  deleteItem(key: string) {
    this.items.remove(key);
  }
  deleteEverything() {
    this.items.remove();
  }
  login() {
    this.af.auth.login();
  }
  logout() {
    this.af.auth.logout();
  }
}
