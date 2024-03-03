import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss'
})
export class MainViewComponent implements OnInit {

    currentmovies: any[] = []

    constructor (public fetchApiData: FetchApiDataService,
        private router: Router,
        private dialog: MatDialog,
    ) { }

    ngOnInit(): void {
        this.getMovies();
      }

    getMovies(): void {
        this.fetchApiData.getAllMovies().subscribe((resp: any) => {
            this.currentmovies = resp;
            console.log(this.currentmovies);
            return this.currentmovies;
          });
        }

        isFavorite(movie: any): boolean {
            let favoriteMovies: any[] = [];
            this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
                favoriteMovies = resp;
            });
        
            // Now, perform indexOf check after the subscription
            return favoriteMovies.indexOf(movie._id) >= 0;
        }
    
        toggleFavorite(movie: any) {
            this.fetchApiData.getFavoriteMovies().subscribe((favoriteMovies: any[]) => {
                const index = favoriteMovies.indexOf(movie._id);
                // If it is favorited, remove
                if (index !== -1) {
                    this.fetchApiData.deleteFavoriteMovie(movie._id);
                // Otherwise, add
                } else {
                    this.fetchApiData.addFavoriteMovies(movie._id);
                }
            });
        }
    
    openDirectorCardDialog(director: any): void {
        this.dialog.open(DirectorComponent, {
            width: "80%",
            height: "80%",
            data: {director}
        })
    }

    openMovieCardDialog(movie: any): void {
        this.dialog.open(MovieCardComponent, {
            width: "80%",
            height: "80%",
            data: {movie}
        });
    }

    openGenreCardDialog(genre: any): void {
        this.dialog.open(GenreComponent, {
            width: "80%",
            height: "80%",
            data: {genre}
        });
    }
}