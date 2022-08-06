import {Component, OnInit} from '@angular/core';
import {InfoService} from "../../services/info.service";
import {User} from "../../interface/user";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  //get all users by subscribing to the userAdded event
  subscription!: Subscription;
  users: User[] = []

  constructor(private userSr: InfoService) {
  }

  ngOnInit(): void {
    //get all users and subscribe to the userAdded event
    this.subscription = this.userSr.userEdited.subscribe(
      (users: User[]) => {
        this.users = users
      })
    this.users = this.userSr.getUsers()
  }

  ngOnDestroy(): void {
    //unsubscribe from the userAdded event when the component is destroyed to avoid memory leaks
    this.subscription.unsubscribe()
  }
}
