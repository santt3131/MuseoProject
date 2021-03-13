import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/shared/models/Activity';
import { User } from 'src/app/shared/models/User';
import { ActivityService } from 'src/app/shared/services/activity.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {
  activities: Activity[];
  activity: Activity;
  userList:User[];

  constructor(private activityService: ActivityService,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    this.getActivities();
    this.getUser();
  }

  getUser():void{
    this.userService.getUsers().subscribe((users)=>{
      this.userList= users;
    });
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
