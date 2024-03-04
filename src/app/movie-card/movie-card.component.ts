import { Component, Inject,  } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {

    /** The movie data displayed in the card. */
    movie: any;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialog: MatDialog,
        private dialogRef: MatDialogRef<MovieCardComponent>,
    ) {
        this.movie = this.data.movie;
}}