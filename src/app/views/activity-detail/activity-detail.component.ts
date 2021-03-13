import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TouchSequence } from 'selenium-webdriver';
import { Activity } from 'src/app/shared/models/Activity';
import { User } from 'src/app/shared/models/User';
import { ActivityService } from 'src/app/shared/services/activity.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ActivityHeaderComponent } from '../activity-header/activity-header.component';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.css'],
})
export class ActivityDetailComponent implements OnInit {
  @Input() activity: Activity;
  public user: User;
  public userSuperNew:User;
  public users: User[];
  public foundActivities:number ;
  public foundFavorites:number ;
  public myfavoritesArray:any =[];


  constructor(
    private userService: UserService,
    private activityService: ActivityService
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();
    this.user = JSON.parse(localStorage.getItem('miUsuario'));

    if(localStorage.getItem('myListFavorites')){
      this.myfavoritesArray = JSON.parse(localStorage.getItem('myListFavorites'));
    }else{
      this.myfavoritesArray = [];
    }
  
    if(this.user){
        this.verifiedSignUp(); 
        this.verifiedFavorites();
        //Si es usuario antiguo lo recupero
        this.userService.getUser(this.user?.id).subscribe((user)=>{
            return this.user= user;
        });
  }
  }

  getCurrentUser(){
    this.userService.getCurrentUser().subscribe(user=>{this.user= user
    });
  }


  ngOnChanges(): void {
    if(this.user){
    this.verifiedSignUp(); //para que se actualice cada vez que de click detail
    this.verifiedFavorites();
    }
  }

   verifiedSignUp() {
    //verificando si esta registrado el usuario a una actividad
    if(this.user.activities){
     this.foundActivities =   this.user?.activities?.find((idActivity) => 
        idActivity === this.activity?.id
    );
  }
  }

   verifiedFavorites(){
    if(this.myfavoritesArray){
    this.foundFavorites =  this.myfavoritesArray.find((idActivity)=>idActivity.id === this.activity?.id);
    }
  }

  signUp(): void {
    const idActivity = this.activity.id;

    this.user.activities.push(idActivity);
    //Actualizando Usuario
    this.userService.updateUser(this.user).subscribe(() => { });

    //Actualizando Actividad
    this.activity.peopleRegistered += 1; //sumale uno
    this.activityService.updateActivity(this.activity).subscribe(() => {
      this.verifiedSignUp(); // se tiene que volver a verificar
      alert('Registrado');
    });
  }

  myFavorites(activity:Activity):void{
    this.myfavoritesArray.push(activity);
    window.localStorage.setItem('myListFavorites', JSON.stringify(this.myfavoritesArray));
    this.verifiedFavorites();
    alert('activity save in favorites');
  }


}
