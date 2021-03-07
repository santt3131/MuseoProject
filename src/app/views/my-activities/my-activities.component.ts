import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Activity } from 'src/app/shared/models/Activity';
import { User } from 'src/app/shared/models/User';
import { ActivityService } from 'src/app/shared/services/activity.service';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('miUsuario'));
    if (this.user) {
      this.getActivitiesbyUser();
    } else {
      this.router.navigate(['/home']);
    }
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
