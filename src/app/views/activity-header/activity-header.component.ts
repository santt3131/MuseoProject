import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/User';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-activity-header',
  templateUrl: './activity-header.component.html',
  styleUrls: ['./activity-header.component.css']
})
export class ActivityHeaderComponent implements OnInit {
  @Input() user:User; 

  public miUsuario:User;
  constructor(
    public router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(){
    this.userService.getCurrentUser().subscribe(user=>this.miUsuario= user);
  }

   logout():void{
    window.localStorage.removeItem('miUsuario');  
    this.miUsuario = null;
    this.userService.userSubject.next(this.miUsuario);
    this.router.navigate(['/']);
  }
  
}
