import { Component, ViewContainerRef } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { MdSnackBarConfig, MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MdSnackBar]
})
export class AppComponent {
  loggedIn = false;
  user = {};
  chatRooms: FirebaseListObservable<any[]>;
  showAddChatRoomDialog = false;
  showOverlay = false;
  constructor(
    private af: AngularFire,
    private snackBar: MdSnackBar,
    private viewContainerRef: ViewContainerRef) {
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
    this.chatRooms = af.database.list('/chatRooms');
  }
  addChatRoom(name: string, description = '') {
    this.chatRooms.push({ name: name, description: description });
    this.closeDialog();
  }
  clickOnOverlay(event: any) {
    if (event.target.id === 'app-overlay') {
      this.closeDialog();
    }
  }
  closeDialog() {
    this.showAddChatRoomDialog = false;
    this.showOverlay = false;
  }
  login() {
    this.af.auth.login();
  }
  failedAttempt() {
    let config = new MdSnackBarConfig(this.viewContainerRef);
    this.snackBar.open('Please sign in first', 'Try Again', config);
  }
  logout() {
    this.af.auth.logout();
  }
  showDialog() {
    if (!this.loggedIn) {
      this.failedAttempt();
    } else {
      this.showOverlay = true;
      this.showAddChatRoomDialog = true;
    }
  }
  /*
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
  */
}
