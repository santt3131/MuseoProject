import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/shared/models/Activity';
import { ActivityService } from 'src/app/shared/services/activity.service';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {
  activities: Activity[];
  activity: Activity;

  constructor(private activityService: ActivityService ) { }

  ngOnInit(): void {
    this.getActivities();
  }

  getActivities():void{
    this.activityService.getActivities()
    .subscribe(activities => {this.activities = activities
    });
  }

  detail(activity:Activity){
    this.activityService.getActivityDetail(activity.id)
    .subscribe(activity => { this.activity = activity }
      );
  }

}
