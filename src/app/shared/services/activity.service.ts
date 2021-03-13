import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'
import { MessageService } from './message.service';
import { Observable, of, Subject } from 'rxjs';
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


  updateActivity(activity: Activity,idActi?:number,idUser?:number):Observable<Activity[]>{
    
    let myAct: Activity ;
    if(activity && idActi && idUser){
       myAct   = {
      id:idActi,
      name:activity.name,
      category:activity.category,
      subcategory:activity.subcategory,
      price:activity.price,
      language:activity.language,
      date: activity.date ,
      description: activity.description,
      peopleRegistered: activity.peopleRegistered,
      userIdOwner:  idUser
    };
  }else{
    myAct = activity;
  }
    
    return this.http.put(this.activityUrl, myAct , this.httpOptions)
    .pipe(
      tap(_ => this.log(`updated hero id=${activity.id}`)),
      catchError(this.handleError<any>('updateActivity'))
    );
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };


  addActivity(acti: Activity,idActivity:number,userIdOwn:number): Observable<Activity>{
    const myAct: Activity = {
      id:idActivity,
      name:acti.name,
      category:acti.category,
      subcategory:acti.subcategory,
      price:acti.price,
      language:acti.language,
      date:acti.date,
      description:acti.description,
      peopleRegistered:acti.peopleRegistered,
      userIdOwner: userIdOwn
    }
    
    return this.http.post<Activity>(this.activityUrl, myAct,
    this.httpOptions).pipe(
      tap((newActivity: Activity) => this.log(`Agregado correctamente Activity con id=${newActivity.id} `)),
      catchError(this.handleError<Activity>('addActivity'))
      );
  }


  deleteMyActivity(acti: Activity | number , user:User,myActivities: Activity[]): Observable<any> {
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

    this.updateActivity(newActivityTemp).subscribe(()=>{ });


    if(user.activities){
      return of(user);
    }else{
      return of(null);
    }
  }

  deleteDefinitiveActivity(acti: Activity | number): Observable<Activity> {
      const id = typeof acti === 'number' ? acti : acti.id;
      const url = `${this.activityUrl}/${id}`;
      return this.http.delete<Activity>(url, this.httpOptions).pipe(
        tap(_ => this.log(`deleted Activity id=${id}`)),
        catchError(this.handleError<Activity>('deleteDefinitiveActivity'))
      );
    }

  


  getActivitiesOwnerUser(userId: number): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.activityUrl).pipe(
      map((arrayAct) => arrayAct.filter((Act) => Act.userIdOwner === userId)),
      tap((_) => this.log(' Activities')),
      catchError(this.handleError<Activity[]>('getActivitiesByUser', []))
    );
  }

  getActivityBySelect(idActivity: number): Observable<Activity> {
    const url = `${this.activityUrl}/${idActivity}`;
    return this.http.get<Activity>(url).pipe(
      tap((_) => this.log(`Activity con id=${idActivity}`)),
      catchError(
        this.handleError<Activity>(`getActivityBySelect id=${idActivity}`)
      )
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
