import { Component, Inject,  } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

/**
 * Component for displaying movie details in a card format.
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {

    /**
     * Holds the data of the movie to be displayed.
     */
    movie: any;

    /**
     * Initializes an instance of MovieCardComponent.
     * @param data The data containing movie details injected into the component.
     * @param dialog The MatDialog service used for opening dialogs.
     * @param dialogRef The reference to the dialog opened by the component.
     */
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialog: MatDialog,
        private dialogRef: MatDialogRef<MovieCardComponent>,
    ) {
        this.movie = this.data.movie;
    }
}
