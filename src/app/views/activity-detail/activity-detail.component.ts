import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TouchSequence } from 'selenium-webdriver';
import { Activity } from 'src/app/shared/models/Activity';
import { User } from 'src/app/shared/models/User';
import { ActivityService } from 'src/app/shared/services/activity.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.css'],
})
export class ActivityDetailComponent implements OnInit {
  @Input() activity: Activity;
  public user: User;
  public users: User[];
  public foundActivities:number ;
  public foundFavorites:number ;

  constructor(
    private userService: UserService,
    private activityService: ActivityService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('miUsuario'));
    this.verifiedSignUp();  //para que se actualice cada vez que de click detail
    this.verifiedFavorites();
    this.userService.getUser(this.user.id).subscribe((user)=>{
        return this.user= user;
    });
  }

  ngOnChanges(): void {
    this.verifiedSignUp(); //para que se actualice cada vez que de click detail
    this.verifiedFavorites();
  }

   verifiedSignUp() {
    //verificando si esta registrado el usuario a una actividad
     this.foundActivities =   this.user?.activities.find((idActivity) => 
        idActivity === this.activity?.id
    );
  }

   verifiedFavorites(){
     this.foundFavorites =  this.user?.favorites.find((idActivity)=>
        idActivity === this.activity?.id
    );
  }

  signUp(): void {
    const idActivity = this.activity.id;
    this.user.activities.push(idActivity);
    //Actualizando Usuario
    this.userService.updateUser(this.user).subscribe(() => {
    });

    //Actualizando Actividad
    this.activity.peopleRegistered += 1; //sumale uno
    this.activityService.updateActivity(this.activity).subscribe(() => {
      this.verifiedSignUp(); // se tiene que volver a verificar
    });
  }

  myFavorites():void{
    const idActivity = this.activity.id;
    this.user.favorites.push(idActivity);
    this.userService.updateUser(this.user).subscribe(()=>{
      this.verifiedFavorites();
    });
  }


}
