import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/User';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  private log(message: string) {
    this.messageService.add(`User Service: ${message}`);
  }

  private UserUrl = 'api/users';

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.UserUrl).pipe(
      tap((_) => this.log('Actividades Actualizadas')),
      catchError(this.handleError<User[]>('getUsers', []))
    );
  }

  getUser(id: number): Observable<User> {
    const url = `${this.UserUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      tap((_) => this.log(`Actividad con id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  searchUser(users: User[], email: string, password: string): Observable<any> {
    if (users && email && password) {
      const url = `${this.UserUrl}/`;
      for (const user of users) {
        if (user.email === email && user.password === password) {
          return this.http.get<User>(url.concat(user.id.toString())).pipe(
            tap((_) => this.log(`searchUser con id=${user.id}`)),
            catchError(this.handleError<User>(`searchUser id=${user.id}`))
          );
        }
      }
      return of([]);
    }
  }


  updateUser(User: User): Observable<User> {
    return this.http.put(this.UserUrl, User, this.httpOptions).pipe(
      tap((_) => this.log(`updated hero id=${User.id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  addUser(User: User,id): Observable<User> {
    User.id= id;
    return this.http.post<User>(this.UserUrl, User, this.httpOptions).pipe(
      tap(() =>
        this.log(`Agregado correctamente User con id=${id} `)
      ),
      catchError(this.handleError<User>('addUser'))
    );
  }


  genId(users:User[]):number{
    return users.length>0 ? Math.max(...users.map(user=> user.id)) + 1 : 11;
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed:${error.message} `);
      return of(result as T);
    };
  }
}
