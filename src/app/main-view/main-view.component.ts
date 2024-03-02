import { Component, OnDestroy } from '@angular/core';
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
export class MainViewComponent {

    movies: any[] = []

    constructor (public fetchApiData: FetchApiDataService,
        private router: Router,
        private dialog: MatDialog,
    ) { }

    getMovies(): void {
        const localMovies = this.fetchApiData.getMovies();

        if(localMovies.length !== 0){
            this.movies = localMovies;
        } else {
            this.fetchApiData.getAllMovies().subscribe((resp: any) => {
                this.movies = resp;
                return this.movies;
                });
        }
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