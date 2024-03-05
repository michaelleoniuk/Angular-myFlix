import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://czo-myflix-ccfb67c11465.herokuapp.com';

/**
 * @description Service for user registration operations.
 * @injectable
 */
@Injectable({
  providedIn: 'root'
})


/**
     * @constructor
     * @param {FetchApiDataService} fetchApiDataService - Service for fetching data from the API.
     */
export class FetchApiDataService { 

  private userData = new BehaviorSubject<Object>({ Username: '', Password: '', Email: '', Birth: ''});
  currentUser = this.userData.asObservable();

  /** Object holding user data. */
  private user: any = {};

  /** Array holding movie data. */
  private movies = new BehaviorSubject<Object>({});
  moviesList = this.movies.asObservable(); 

  /** Subject for observing changes in the current movie list. */
  private currentMovies: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  /** Observable for the current movie list. */
  public currentMovies$: Observable<any[]> = this.currentMovies.asObservable();

  /**
    * @constructor
    * @param {HttpClient} http - Angular's HttpClient module for making HTTP requests.
    */

  constructor(private http: HttpClient) {
  }
  
  /**
    * @description Make an API call for user registration.
    * @param {any} userDetails - User details for registration.
    * @returns {Observable<any>} - Observable for the API response.
    */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + '/users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  /**
    * @description Make an API call for user login.
    * @param {any} userDetails - User details for login.
    * @returns {Observable<string>} - Observable for the API response containing the user token.
    */
  public signin(userDetails: any): Observable<any>{
    console.log(userDetails);
    return this.http.post(apiUrl + '/login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
     * @description Check if a user is currently signed in.
     * @returns {boolean} - True if a user is signed in, false otherwise.
     */
  public hasUser(): boolean {
    return Object.keys(this.user).length > 0;
}

    /**
    * @description Make an API call to retrieve all movies.
    * @returns {Observable<any>} - Observable for the API response containing all movies.
    */
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
   
   /**
    * @description Make an API call to retrieve a single movie.
    * @param {string} title - title of the movie to be retrieved.
    * @returns {Observable<any>} - Observable for the API response containing the requested movie.
    */
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
  
  /**
    * @description Make an API call to retrieve a director by name.
    * @param {string} directorName - Name of the director to be retrieved.
    * @returns {Observable<any>} - Observable for the API response containing the requested director.
    */
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
  
  /**
    * @description Make an API call to retrieve a genre by name.
    * @param {string} genreName - Name of the genre to be retrieved.
    * @returns {Observable<any>} - Observable for the API response containing the requested genre.
    */
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

/**
     * @description Get all stored user data.
     * @returns {any} - User data.
     */

public getUsers() : Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + '/users', {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
  }).pipe(map(this.extractResponseData), catchError(this.handleError));
}

/**
     * @description Get the currently stored user data.
     * @returns {any} - User data.
     */
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

 /**
     * @description Get the list of favorite movies from the user data.
     * @returns {any[]} - Array of favorite movies.
     */
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

  /**
    * @description Make an API call to add a favorite movie for a user.
    * @param {string} Username - ID of the user.
    * @param {string} movieID - ID of the movie to be added to favorites.
    * @returns {Observable<any>} - Observable for the API response.
    */
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

  /**
    * @description Make an API call to update user information.
    * @param {string} Username - ID of the user to be updated.
    * @param {any} updatedUser - New user information.
    * @returns {Observable<any>} - Observable for the API response.
    */
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

  /**
    * @description Make an API call to delete a user.
    * @param {string} Username - ID of the user to be deleted.
    * @returns {Observable<any>} - Observable for the API response.
    */
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

  /**
    * @description Make an API call to delete a favorite movie for a user.
    * @param {string} Username - ID of the user.
    * @param {string} movieID - ID of the movie to be removed from favorites.
    * @returns {Observable<any>} - Observable for the API response.
    */
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

  /**
    * @description Extract non-typed response data from the API response.
    * @param {any} res - API response.
    * @returns {any} - Extracted response data.
    * @private
    */
private extractResponseData(res: any): any {
  const body = res;
  return body || { };
}

/**
    * @description Handle HTTP errors and log them.
    * @param {HttpErrorResponse} error - HTTP error response.
    * @returns {any} - Error details.
    * @private
    */
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