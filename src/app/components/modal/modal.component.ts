import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../interface/user";
import {InfoService} from "../../services/info.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input('active') active: boolean = false;
  @Input('edit') edit: boolean = false;
  @Input('user') user!: User;
  @Output() closeModal = new EventEmitter<boolean>();
  username: string = '';
  details: string = '';
  id: number = 0;

  constructor(private userSr: InfoService) {

  }

  ngOnInit(): void {
    if (this.edit) {
      this.username = this.user.name;
      this.details = this.user.details;
    }
  }

  modalClose() {
    this.active = false;
    this.closeModal.emit(this.active);
  }

  Add() {
    if (this.edit) {
      this.userSr.editUser({id: this.user.id, name: this.username, details: this.details})
    } else {
      this.userSr.createUser({username: this.username, details: this.details})
    }
    this.clear();
    return this.modalClose();
  }

  private clear() {
    this.username = '';
    this.details = '';
  }
}
