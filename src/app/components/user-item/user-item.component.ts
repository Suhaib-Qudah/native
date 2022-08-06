import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../interface/user";
import {InfoService} from "../../services/info.service";

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit {
  @Input() user!: User;
  active: boolean = false;
  constructor(private userSr: InfoService) {
  }

  ngOnInit(): void {
  }

  deleteItem() {
    this.userSr.deleteUser(this.user)
  }
}
