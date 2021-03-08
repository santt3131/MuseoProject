import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Activity } from 'src/app/shared/models/Activity';
import { User } from 'src/app/shared/models/User';
import { ActivityService } from 'src/app/shared/services/activity.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-my-activities',
  templateUrl: './my-activities.component.html',
  styleUrls: ['./my-activities.component.css'],
})
export class MyActivitiesComponent implements OnInit {
  @Input() user: User;
  activities: Activity[];
  public myActivities: Activity[] = [];

  constructor(
    private activityService: ActivityService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('miUsuario'));//mi usuario temporal pero no actualizado, es decir si me registro en una actividad
   
    this.userService.getUser(this.user?.id).subscribe(
        (user)=>{
          this.user = user; //pregunto otra vez, en caso se haya registrado a una nueva actividad
          if (this.user) {
            this.getActivitiesbyUser();
          } else {
            this.router.navigate(['/home']);
          }
        }
    );
  
  }

  getActivitiesbyUser(): void {
    const activitiesArray = this.user?.activities;
    this.activityService.getActivities().subscribe((activities) => {
      this.activities = activities;
      this.activities.map((activity) => {
        activitiesArray.map((id) => {
          if (activity.id === id) {
            this.myActivities.push(activity);
          }
        });
      });
    });
  }
}