import { Component, Input, OnInit } from '@angular/core';
import { Activity } from 'src/app/shared/models/Activity';
import { User } from 'src/app/shared/models/User';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.css']
})
export class ActivityDetailComponent implements OnInit {
  @Input() activity:Activity;
  @Input() public user:User;



  constructor() { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('miUsuario'));
    if(this.activity)
    console.log('1 el detalle seleccionado', this.activity);
  }

  ngOnChanges(){
    if(this.activity)
    console.log('2 Change imprimiendo el detalle seleccionado', this.activity);
  }

}
