import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://czo-myflix-ccfb67c11465.herokuapp.com';
@Injectable({
  providedIn: 'root'
})


export class FetchApiDataService { 

  private userData = new BehaviorSubject<Object>({ Username: '', Password: '', Email: '', Birth: ''});
  currentUser = this.userData.asObservable();

  private user: any = {};

  private movies = new BehaviorSubject<Object>({});
  moviesList = this.movies.asObservable(); 

  private currentMovies: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  public currentMovies$: Observable<any[]> = this.currentMovies.asObservable();

  constructor(private http: HttpClient) {
  }
  
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + '/users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  public signin(userDetails: any): Observable<any>{
    console.log(userDetails);
    return this.http.post(apiUrl + '/login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  public hasUser(): boolean {
    return Object.keys(this.user).length > 0;
}

   public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + '/movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

   public getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + '/movies' + title, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public getOneDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + '/movies/director/' + directorName, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  public getGenre(genreName: string) : Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + '/movies/genre/' + genreName, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

// Get user endpoint

public getUsers() : Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + '/users', {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
  }).pipe(map(this.extractResponseData), catchError(this.handleError));
}

public getOneUser() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + '/users/' + user.Username, {
    headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

 getFavoriteMovies(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + '/users/' + user.Username, {
      headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      map((data) => data.FavoriteMovies),
      catchError(this.handleError)
    );
  }

  public addFavoriteMovies(movieID: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    user.FavoriteMovies.push(movieID);
    localStorage.setItem('user', JSON.stringify(user));
    return this.http.post(apiUrl + '/users/' + user.Username + '/movies/' + movieID, {}, {
      headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }),
      // responseType: "text"
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  isFavoriteMovie(movieID: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.FavoriteMovies.indexOf(movieID) >= 0;
  }

   public updateUser(updatedUser: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + '/users/' + user.Username, updatedUser, {
      headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

   public deleteUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    console.log(token);
    return this.http.delete(apiUrl + '/users/' + user.Username, {
      headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

public deleteFavoriteMovie(movieID: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    localStorage.setItem('user', JSON.stringify(user));
    return this.http.delete(apiUrl + '/users/' + user.Username + '/movies/' + movieID, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }),
      // responseType: "text"
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

private extractResponseData(res: any): any {
  const body = res;
  return body || { };
}

private handleError(error: HttpErrorResponse): any {
  if (error.error instanceof ErrorEvent) {
  console.error('Some error occurred:', error.error.message);
  } else {
  console.error(
      `Error Status code ${error.status}, ` +
      `Error body is: ${error.error}`);
  }
  return throwError(() => new Error('Something bad happened; please try again later.'));
}
}