import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent implements OnInit{
    currentmovies: any[] = []
    favorites: any[] = []

    constructor (
        public fetchApiData: FetchApiDataService,
        private router: Router,
        private dialog: MatDialog,
    ) { }

    ngOnInit(): void {
        this.getFavorites();
        this.getMovies();
      }

    getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.currentmovies = resp;
        return this.currentmovies;
        });
    }

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
    
      isFavoriteMovie(movieID: string): boolean {
        console.log(this.favorites);
        return this.favorites.includes(movieID);
      }

    toggleFavorite(movieID: any) {
        if (this.favorites.includes(movieID)) {
            this.fetchApiData.deleteFavoriteMovie(movieID).subscribe(res=> console.log(res));
        // Otherwise, add
        } else {
            this.fetchApiData.addFavoriteMovies(movieID).subscribe(res=> console.log(res));
        }
    }
    
    openDirectorCardDialog(Director: any): void {
        this.dialog.open(DirectorComponent, {
            width: "80%",
            height: "80%",
            data: { Director }
        })
    }

    openMovieCardDialog(movie: any): void {
        this.dialog.open(MovieCardComponent, {
            width: "80%",
            height: "80%",
            data: { movie }
        });
    }

    openGenreCardDialog(Genre: any): void {
        this.dialog.open(GenreComponent, {
            width: "80%",
            height: "80%",
            data: { Genre }
        });
    }
}