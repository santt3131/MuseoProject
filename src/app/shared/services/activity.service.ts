import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import { Activity } from '../models/Activity';
import { User } from '../models/User';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(
    private http:HttpClient,
    private messageService: MessageService
  ) { }

  private log(message:string){
    this.messageService.add(`Activity Service: ${message}`);
  }

  private activityUrl= 'api/activities';

  getActivities():Observable<Activity[]>{
    return this.http.get<Activity[]>(this.activityUrl)
    .pipe(
      tap(_ => this.log('Actividades Actualizadas')),
      catchError(this.handleError<Activity[]>('getActivities',[]))
    );
  }

  
  getActivityDetail(id:number):Observable<Activity>{
    const url= `${this.activityUrl}/${id}`;
    return this.http.get<Activity>(url).pipe(
      tap(_=> this.log(`Actividad con id=${id}`)),
      catchError(this.handleError<Activity>(`getActivityDetail id=${id}`))
    );
  }


  updateActivity(activity: Activity):Observable<Activity[]>{
    return this.http.put(this.activityUrl, activity , this.httpOptions)
    .pipe(
      tap(_ => this.log(`updated hero id=${activity.id}`)),
      catchError(this.handleError<any>('updateActivity'))
    );
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };


  addActivity(activity: Activity): Observable<Activity>{
    return this.http.post<Activity>(this.activityUrl, activity,
    this.httpOptions).pipe(
      tap((newActivity: Activity) => this.log(`Agregado correctamente Activity con id=${newActivity.id} `)),
      catchError(this.handleError<Activity>('addActivity'))
      );
  }

  deleteActivity(acti: Activity | number , user:User,myActivities: Activity[]): Observable<any> {
    const idActi = typeof acti === 'number' ? acti : acti.id;
    let newArrayActivity =[];
    newArrayActivity = user.activities.filter((idActivity)=> idActivity  !== idActi );
    user.activities = [];
    user.activities = newArrayActivity;
    
  //new activity
  const newActivity:Activity = myActivities.find((activity)=> activity.id === idActi );
 const newActivityTemp:Activity={
        id:newActivity.id ,
        name:newActivity.name,
        category:newActivity.category,
        subcategory:newActivity.subcategory,
        price:newActivity.price,
        language:newActivity.language,
        date: newActivity.date,
        description:newActivity.description,
        peopleRegistered:newActivity.peopleRegistered - 1,
        userIdOwner: newActivity.userIdOwner
 }

    this.updateActivity(newActivityTemp).subscribe(()=>{
        console.log('actualizando update');
    });


    if(user.activities){
      return of(user);
    }else{
      return of(null);
    }

  /////////



  

  }


  private handleError<T>(operation= 'operation',result?: T){
    return (error:any): Observable<T> =>
    {
      console.error(error);
      this.log(`${operation} failed:${error.message} `)
      return of(result as T);
    }
  }




}
