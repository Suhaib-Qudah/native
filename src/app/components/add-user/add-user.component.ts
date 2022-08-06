import {Component, OnInit} from '@angular/core';
import {InfoService} from "../../services/info.service";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  active = false;
  filterName!: string;

  constructor(private infoService: InfoService) {
  }


  ngOnInit(): void {

  }

  modalRun() {
    this.active = true;
  }

  modalClose(value: boolean) {
    this.active = value;
  }

  filter() {
    if (this.filterName.trim().length > 0) {
      this.infoService.filter(this.filterName.slice())
    } else {
      this.infoService.filter(null)
    }
  }
}
