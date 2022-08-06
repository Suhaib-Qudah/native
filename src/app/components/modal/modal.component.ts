import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {User} from "../../interface/user";
import {InfoService} from "../../services/info.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit ,OnDestroy {

  @Input('active') active: boolean = false;
  @Input('edit') edit: boolean = false;
  @Input('user') user!: User;
  @Output() closeModal = new EventEmitter<boolean>();
  username: string = '';
  userForm!: FormGroup;
  details: string = '';
  id: number = 0;

  constructor(private userSr: InfoService) {

  }

  ngOnInit(): void {
    if (this.edit) {
      this.username = this.user.name;
      this.details = this.user.details;
    }
    this.initForm();
  }

  modalClose() {
    this.active = false;
    this.userForm.reset();
    this.closeModal.emit(this.active);
  }

  Add() {
    if (this.userForm.valid) {
      if (this.edit) {
        this.userSr.editUser({
          id: this.user.id,
          name: this.userForm.get('username')?.value,
          details: this.userForm.get('details')?.value
        });
      } else {
        this.userSr.createUser(this.userForm.value);
      }
      this.clear();
      this.modalClose();
    }
  }

  private clear() {
    this.username = '';
    this.details = '';
  }

  private initForm() {
    this.userForm = new FormGroup({
      username: new FormControl(this.username, [Validators.required]),
      details: new FormControl(this.details, [Validators.required])
    });
  }

  ngOnDestroy(){
  }

}
