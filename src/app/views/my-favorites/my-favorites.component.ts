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
  public myActivitiesFavorites: Activity[] = [];
  public myfavoritesArray:any;

  constructor(
    private activityService: ActivityService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('miUsuario'));
    this.myfavoritesArray = JSON.parse(localStorage.getItem('myListFavorites'));
  }

  getFavoritesbyUser(): void {
    const activitiesArray = this.user?.favorites;
    this.activityService.getActivities().subscribe((activities) => {
      this.activities = activities;
      this.activities.map((activity) => {
        activitiesArray.map((id) => {
          if (activity.id === id) {
            this.myActivitiesFavorites.push(activity);
          }
        });
      });
    });
  }

  updateActivitiesView(): void {
    const activitiesArray = this.user?.activities; //obtendo el arra con ids
    this.myActivitiesFavorites = [];
    if (activitiesArray) {
      this.activities.map((activity) => {
        activitiesArray.map((id) => {
          if (activity.id === id) {
            this.myActivitiesFavorites.push(activity);
          }
        });
      });
    window.localStorage.setItem('myListFavorites', JSON.stringify(this.myActivitiesFavorites));
    }
  }

  quit(idActivity:number):void{
    // this.user es obtenido mediante localStorage
    if(confirm('¿Are you sure to delete ?')){
    this.myfavoritesArray = this.myfavoritesArray.filter((myfavorite)=> myfavorite.id !== idActivity );
    window.localStorage.setItem('myListFavorites', JSON.stringify(this.myfavoritesArray));
    alert(`favorite deleted!`);
    }
  }

}
