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
    this.user = JSON.parse(localStorage.getItem('miUsuario')); //mi usuario temporal pero no actualizado, es decir si me registro en una actividad
    this.userService.getUser(this.user?.id).subscribe((user) => {
      this.user = user; //pregunto otra vez, en caso se haya registrado a una nueva actividad
      if (this.user) {
        this.getActivitiesbyUser();
      } else {
        this.router.navigate(['/home']);
      }
    });
  }



  getActivitiesbyUser(): void {
    this.activityService.getActivities().subscribe((activities) => {
      this.activities = activities;
      this.updateActivitiesView();
    });
  }

  updateActivitiesView(): void {
    const activitiesArray = this.user?.activities; //obtendo el arra con ids
    this.myActivities = [];
    if (activitiesArray) {
      this.activities.map((activity) => {
        activitiesArray.map((id) => {
          if (activity.id === id) {
            this.myActivities.push(activity);
          }
        });
      });
    }
  }

  cancelSubcription(idActivity): void {
    //deleting
    this.activityService
      .deleteActivity(idActivity, this.user, this.myActivities)
      .subscribe((user) => {
        this.user = user;

        //actualizo en mi api
        this.userService.updateUser(this.user).subscribe(() => {
          this.userService.storeUser(this.user); //tambien actualizo mi subject
          alert('user deleted and update the people registered(-1) ');
        });
        this.updateActivitiesView();
      });
  }

}
