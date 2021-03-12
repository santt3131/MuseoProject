import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/shared/models/Activity';
import { User } from 'src/app/shared/models/User';
import { ActivityService } from 'src/app/shared/services/activity.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public activities: Activity[];
  public activity: Activity;
  public user: User;
  public users:User[];
  
  constructor(
    private activityService: ActivityService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('miUsuario'));
    this.getActivitiesOwnerUser();
  }

  getActivitiesOwnerUser():void{
    this.activityService.getActivitiesOwnerUser(this.user.id)
    .subscribe(activities => {this.activities = activities
    });
  }

  deleteDefinitiveActivity(activityId:number):void{
    if(  confirm(`Are you sure you want to delete your activity number ${activityId}!`)){
      console.log('ELIMINADO CORRECTAMENTE')
       //actualizo en mi api all user who subscribe
       this.userService.getUsers().subscribe((users)=>{
          this.users= users;
          alert('deleting the activity in case if a user has been registered');
          this.userService.UpdateAllUser(this.users,activityId).subscribe(() => {
            alert('eliminating the activity');
            this.activityService.deleteDefinitiveActivity(activityId).subscribe(()=>{
                this.activities = this.activities.filter(acti => acti.id !== activityId);

            });

          });
       });

       this.activityService.getActivities().subscribe((activities)=>{
        console.log('todas las activities son:',  activities );
        });
      }


  }



}
