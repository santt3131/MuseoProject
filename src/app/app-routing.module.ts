import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ActivityListComponent } from './views/activity-list/activity-list.component';
import { AdminCrudComponent } from './views/admin-crud/admin-crud.component';
import { AdminComponent } from './views/admin/admin.component';
import { EducationComponent } from './views/education/education.component';
import { HomeComponent } from './views/home/home.component';
import { JoinnowComponent } from './views/joinnow/joinnow.component';
import { MyActivitiesComponent } from './views/my-activities/my-activities.component';
import { MyFavoritesComponent } from './views/my-favorites/my-favorites.component';
import { ProfileComponent } from './views/profile/profile.component';
import { SiginComponent } from './views/sigin/sigin.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent ,
  },
  {
    path: 'home',
    component: HomeComponent ,
  },
  {
    path: 'signin',
    component: SiginComponent,
  },
  {
    path: 'signup',
    component: JoinnowComponent
  },
  {
    path: 'myactivities',
    component: MyActivitiesComponent
  },
  {
    path: 'favorites',
    component: MyFavoritesComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'educations/:idUser/:idEducation',
    component: EducationComponent
  },
  {
    path: 'educations/add',
    component: EducationComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path:'activity/owner/:idUser/:idActivity',
    component: AdminCrudComponent
  },
  {
    path: 'activity/owner',
    component: AdminCrudComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
