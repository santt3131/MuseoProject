import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './shared/inmemory-db/in-memory-data.service';
import { ActivityListComponent } from './views/activity-list/activity-list.component';
import { ActivityDetailComponent } from './views/activity-detail/activity-detail.component';
import { ActivityHeaderComponent } from './views/activity-header/activity-header.component';
import { ActivityFooterComponent } from './views/activity-footer/activity-footer.component';
import { SiginComponent } from './views/sigin/sigin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './views/home/home.component';
import { JoinnowComponent } from './views/joinnow/joinnow.component';
import { MyActivitiesComponent } from './views/my-activities/my-activities.component';
import { MyFavoritesComponent } from './views/my-favorites/my-favorites.component';

@NgModule({
  declarations: [
    AppComponent,
    ActivityListComponent,
    ActivityDetailComponent,
    ActivityHeaderComponent,
    ActivityFooterComponent,
    SiginComponent,
    HomeComponent,
    JoinnowComponent,
    MyActivitiesComponent,
    MyFavoritesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
