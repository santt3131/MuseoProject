import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import { Activity } from '../models/Activity';
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

  getActivitiesByUser():Activity[]{
    return null;
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



  private handleError<T>(operation= 'operation',result?: T){
    return (error:any): Observable<T> =>
    {
      console.error(error);
      this.log(`${operation} failed:${error.message} `)
      return of(result as T);
    }
  }




}
