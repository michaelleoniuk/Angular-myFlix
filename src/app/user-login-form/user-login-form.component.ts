import { Component, Input } from '@angular/core';

//Closes the dialogue on success
import { MatDialogRef } from '@angular/material/dialog';
//Imports the API calls
import { FetchApiDataService } from '../fetch-api-data.service';
//Notifications to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler';

/**
* @description Component representing the user login form.
* @selector: 'app-user-login-form'
* @templateUrl: './user-login-form.component.html'
* @styleUrls: ['./user-login-form.component.scss']
*/
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss'
})
export class UserLoginFormComponent {

    /** Input for user data including username and password. */
    @Input() userData = { Username: '', Password: ''}

    /**
    * @constructor
    * @param {UserRegistrationService} userRegistrationAPI - Service for user registration API calls.
    * @param {MatDialogRef<UserLoginFormComponent>} dialogRef - Reference to the dialog for closing.
    * @param {MatSnackBar} snackBar - Angular Material's MatSnackBar service for notifications.
    * @param {Router} router - Angular's Router service for navigation.
    */
    constructor(
        public FetchApiDataService: FetchApiDataService,
        public dialogRef: MatDialogRef<UserLoginFormComponent>,
        public snackBar: MatSnackBar,
        private router: Router,
    ){}


    /**
    * @description Sends user login form information to the backend.
    * Closes the dialog on success, displays a success message, and navigates to the movies page.
    * Shows an error message on failure and logs the error.
    */
    loginUser():void {
        this.FetchApiDataService.signin(this.userData).subscribe((result) => {
            this.dialogRef.close();
            localStorage.setItem('token', result.token);
            localStorage.setItem('user', result.user);
            this.snackBar.open('Logged In!  Welcome!', 'OK', {
                duration: 2000
            });
            this.router.navigate(['movies']);
        }, (error) => {
            this.snackBar.open('Login Not Successful', 'OK', {
                duration: 2000
            });
            console.error('Login failed: ', error);
        });
    }
}