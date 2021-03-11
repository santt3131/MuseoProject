import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/User';
import { MessageService } from './message.service';
import { Education } from '../models/Education';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  public userSubject = new Subject<User>();

  private log(message: string) {
    this.messageService.add(`User Service: ${message}`);
  }

  private UserUrl = 'api/users';
  private EducationUrl = 'api/educations';

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

  storeUser(user: User): void {
    if (user) {
      console.log(user);
      user.activities = [0];//to create new user
      user.favorites = [0];
      window.localStorage.setItem('miUsuario', JSON.stringify(user));
      this.userSubject.next(user);
      console.log('usuario almacenado: ' , user);
    } else {
      alert('User not found!');
    }
  }

  getCurrentUser(): Observable<User> {
    return this.userSubject.asObservable();
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

  addUser(User: User, id): Observable<User> {
    User.id = id;
    return this.http.post<User>(this.UserUrl, User, this.httpOptions).pipe(
      tap(() => this.log(`Agregado correctamente User con id=${id} `)),
      catchError(this.handleError<User>('addUser'))
    );
  }

  genId(users: User[]): number {
    return users.length > 0
      ? Math.max(...users.map((user) => user.id)) + 1
      : 11;
  }

  deleteEducation(education: Education | number): Observable<Education> {
    const id = typeof education === 'number' ? education : education.id;
    const url = `${this.EducationUrl}/${id}`;
    return this.http.delete<Education>(url, this.httpOptions);
  }

  getEducationsByUser(userId: number): Observable<Education[]> {
    return this.http.get<Education[]>(this.EducationUrl).pipe(
      map((arrayEdu) => arrayEdu.filter((Edu) => Edu.userId === userId)),
      tap((_) => this.log(' Educations')),
      catchError(this.handleError<Education[]>('getEducationsByUser', []))
    );
  }

  getEducationsAll(): Observable<Education[]> {
    return this.http.get<Education[]>(this.EducationUrl).pipe(
      tap((_) => this.log(' getEducationsAll')),
      catchError(this.handleError<Education[]>('getEducationsAll', []))
    );
  }

  getEducationBySelect(idEducation: number): Observable<Education> {
    const url = `${this.EducationUrl}/${idEducation}`;
    return this.http.get<Education>(url).pipe(
      tap((_) => this.log(`Education con id=${idEducation}`)),
      catchError(
        this.handleError<Education>(`getEducationBySelect id=${idEducation}`)
      )
    );
  }

  updateEducation(
    edu: Education,
    idEdu: number,
    idUser: number
  ): Observable<Education> {
    const myEdu: Education = {
      id: idEdu,
      typeEducation: edu.typeEducation,
      level: edu.level,
      nameEducation: edu.nameEducation,
      universityEducation: edu.universityEducation,
      finishDateEducation: edu.finishDateEducation,
      userId: idUser,
    };
    return this.http.put(this.EducationUrl, myEdu, this.httpOptions).pipe(
      tap((_) => this.log(`updated Education id=${myEdu.id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  addEducation(edu: Education, idEdu: number,idUser: number): Observable<Education> {
    const myEdu: Education = {
      id: idEdu,
      typeEducation: edu.typeEducation,
      level: edu.level,
      nameEducation: edu.nameEducation,
      universityEducation: edu.universityEducation,
      finishDateEducation: edu.finishDateEducation,
      userId: idUser,
    }
    return this.http.post<Education>(this.EducationUrl, myEdu, this.httpOptions).pipe(
      tap(() => this.log(`Agregado correctamente Education con id=${idEdu} `)),
      catchError(this.handleError<Education>('addEducation'))
    );
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
