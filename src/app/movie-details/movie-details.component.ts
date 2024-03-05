import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { Router } from '@angular/router';

/**
 * Component for displaying detailed information about a movie.
 */
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent implements OnInit{
    /**
     * Holds the list of currently displayed movies.
     */
    currentmovies: any[] = []
    
    /**
     * Holds the list of favorite movies.
     */
    favorites: any[] = []

    /**
     * Initializes an instance of MovieDetailsComponent.
     * @param fetchApiData Service for fetching movie data from the API.
     * @param router The router service for navigating between routes.
     * @param dialog The MatDialog service used for opening dialogs.
     */
    constructor (
        public fetchApiData: FetchApiDataService,
        private router: Router,
        private dialog: MatDialog,
    ) { }

    /**
     * Lifecycle hook that is called after Angular has initialized all data-bound properties of the directive.
     */
    ngOnInit(): void {
        this.getFavorites();
        this.getMovies();
    }

    /**
     * Fetches all movies from the API and updates the currentmovies array.
     */
    getMovies(): void {
        this.fetchApiData.getAllMovies().subscribe((resp: any) => {
            this.currentmovies = resp;
            return this.currentmovies;
        });
    }

    /**
     * Fetches the list of favorite movies from the API.
     */
    getFavorites(): void {
        this.fetchApiData.getOneUser().subscribe(
            (resp: any) => {
                if (resp && resp.FavoriteMovies) {
                    this.favorites = resp.FavoriteMovies;
                } else {
                    this.favorites = []; // Set an empty array if data is not available
                }
            }
        );
    }
    
    /**
     * Checks if a movie is in the list of favorite movies.
     * @param movieID The ID of the movie to check.
     * @returns True if the movie is in the list of favorites, otherwise false.
     */
    isFavoriteMovie(movieID: string): boolean {
        console.log(this.favorites);
        return this.favorites.includes(movieID);
    }

    /**
     * Toggles the favorite status of a movie.
     * @param movieID The ID of the movie to toggle.
     */
    toggleFavorite(movieID: any) {
        if (this.favorites.includes(movieID)) {
            this.fetchApiData.deleteFavoriteMovie(movieID).subscribe(res=> console.log(res));
        // Otherwise, add
        } else {
            this.fetchApiData.addFavoriteMovies(movieID).subscribe(res=> console.log(res));
        }
    }
    
    /**
     * Opens a dialog displaying details about a movie director.
     * @param Director The details of the director to display.
     */
    openDirectorCardDialog(Director: any): void {
        this.dialog.open(DirectorComponent, {
            width: "80%",
            height: "80%",
            data: { Director }
        })
    }

    /**
     * Opens a dialog displaying details about a movie.
     * @param movie The details of the movie to display.
     */
    openMovieCardDialog(movie: any): void {
        this.dialog.open(MovieCardComponent, {
            width: "80%",
            height: "80%",
            data: { movie }
        });
    }

    /**
     * Opens a dialog displaying details about a movie genre.
     * @param Genre The details of the genre to display.
     */
    openGenreCardDialog(Genre: any): void {
        this.dialog.open(GenreComponent, {
            width: "80%",
            height: "80%",
            data: { Genre }
        });
    }
}
