import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Activity } from 'src/app/shared/models/Activity';
import { User } from 'src/app/shared/models/User';
import { ActivityService } from 'src/app/shared/services/activity.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-my-favorites',
  templateUrl: './my-favorites.component.html',
  styleUrls: ['./my-favorites.component.css']
})
export class MyFavoritesComponent implements OnInit {
  @Input() user: User;
  activities: Activity[];
  public myActivities: Activity[] = [];
  constructor(
    private activityService: ActivityService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('miUsuario'));
    this.userService.getUser(this.user?.id).subscribe(
      (user)=>{
        this.user = user; //pregunto otra vez, en caso se haya registrado a una nueva actividad
        if (this.user) {
          this.getFavoritesbyUser();
        } else {
          this.router.navigate(['/home']);
        }
      }
  );
  }

  getFavoritesbyUser(): void {
    const activitiesArray = this.user?.favorites;
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
