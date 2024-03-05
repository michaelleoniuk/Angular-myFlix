import { Component, Input, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

/**
 * Component for the user profile page.
 */
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})

export class ProfileComponent implements OnInit {

  /**
   * Holds the user information.
   */
  user: any = { Username: '', Password: '', Email: '', Birth: '' };

  /**
   * Holds the list of favorite movies for the user.
   */
  FavoriteMovies : any[] = [];

  /**
   * Holds the list of all movies.
   */
  movies: any[] = [];

  /**
   * Holds the list of favorite movies.
   */
  favorites: any[] = [];
  
  constructor(public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
) { }

  /**
   * Lifecycle hook that is called after Angular has initialized all data-bound properties of the directive.
   */
  ngOnInit(): void { 
    this.loadUser();
    this.getAllMovies();
  }

  /**
   * Loads the user's information.
   */
  public loadUser(): void {
    this.fetchApiData.getOneUser().subscribe(response=>{this.user=response});
    this.fetchApiData.getAllMovies().subscribe((response) => {
      this.FavoriteMovies = response.filter((movie: any) => this.user.FavoriteMovies.includes(movie._id));
    });
  }

  /**
   * Navigates back to the movie list page.
   */
  public back(): void {
    this.router.navigate(['movies']);
  }
  
  /**
   * Opens a dialog for updating user information.
   */
  public updateUser(): void {
    // Used registartionComponent with another shared variables
    this.dialog.open(UserRegistrationFormComponent, { width: '400px', height: '400px', data: { title: 'UPDATE USER', button: 'Update', function: 'updateUser()' } });
    this.fetchApiData.currentUser.subscribe(userData => this.user = userData);
  }

  /**
   * Deletes the user account.
   */
  deleteUser(): void {
    if(confirm('Do you want to delete your account permanently?')) {
      this.router.navigate(['welcome']).then(() => {
        localStorage.clear();
        this.snackBar.open('Your account has been deleted', 'OK', {
          duration: 3000
        });
      })
      this.fetchApiData.deleteUser().subscribe((result) => {
        console.log(result);
      });
    }
  }
  
  /**
   * Fetches all movies.
   */
  getAllMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        console.log(this.movies);
        return this.movies;
      });
    }
  
    /**
     * Fetches the list of favorite movies for the user.
     */
    getFavorites(): void {
      this.fetchApiData.getOneUser().subscribe(
        (resp: any) => {
          if (resp && resp.FavoriteMovies) {
            this.favorites = resp.FavoriteMovies;
          } else {
            this.favorites = []; // Set an empty array if data is not available
          }
        },
        (error: any) => {
          console.error('Error fetching user data:', error);
          this.favorites = []; // Set an empty array on error as well
        }
      );
    }
  
    /**
     * Checks if a movie is in the user's list of favorite movies.
     * @param movieID The ID of the movie to check.
     * @returns True if the movie is in the list of favorites, otherwise false.
     */
    isFavoriteMovie(movieID: string): boolean {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return user.FavoriteMovies.indexOf(movieID) >= 0;
    }
  
    /**
     * Adds or removes a movie from the user's list of favorite movies.
     * @param id The ID of the movie to add or remove from favorites.
     */
    addToFavorites(id: string): void {
      if (this.isFavoriteMovie(id)) {
        // Movie is already a favorite, so remove it
        this.removeFavoriteMovie(id);
      } else {
        // Movie is not a favorite, so add it
        this.fetchApiData.addFavoriteMovies(id).subscribe(() => {
          this.snackBar.open('Movie added to favorites', 'OK', {
            duration: 2000,
          });
          this.getFavorites();
        });
      }
    }

    /**
     * Removes a movie from the user's list of favorite movies.
     * @param id The ID of the movie to remove from favorites.
     */
    removeFavoriteMovie(id: string): void {
      this.fetchApiData.deleteFavoriteMovie(id).subscribe(() => {
        this.snackBar.open('removed from favorites', 'OK', {
          duration: 2000
        })
      });
    }

    /**
     * Opens a dialog displaying movies of a specific genre.
     * @param genre The genre for which to display movies.
     */
    public getGenre(genre: any){
      this.dialog.open(GenreComponent, { width: '400px', height: '300px', data: {genre: genre}});
    }

    /**
     * Opens a dialog displaying details of a specific director.
     * @param director The director for which to display details.
     */
    public getOneDirector(director: any){
      this.dialog.open(DirectorComponent, { width: '400px', height: '300px', data: {director: director}});
    }  

    /**
     * Opens a dialog displaying details of a specific movie.
     * @param details The details of the movie to display.
     */
    public openMovieDetails(details: string){
      this.dialog.open(MovieDetailsComponent, { width: '400px', height: '300px', data: {details: details}});
    }
  
  }
