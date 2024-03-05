import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * Component for user login form.
 */
@Component({
    selector: 'app-user-login-form',
    templateUrl: './user-login-form.component.html',
    styleUrl: './user-login-form.component.scss'
  })
  export class UserLoginFormComponent {
  
      /**
       * Holds the user data for login (Username and Password).
       */
      @Input() userData = { Username: '', Password: ''}
  
      /**
       * Initializes an instance of UserLoginFormComponent.
       * @param FetchApiDataService Service for fetching data from the API.
       * @param dialogRef Reference to the dialog opened by the component.
       * @param snackBar Service for displaying snack bar notifications.
       * @param router The router service for navigating between routes.
       */
      constructor(
          public FetchApiDataService: FetchApiDataService,
          public dialogRef: MatDialogRef<UserLoginFormComponent>,
          public snackBar: MatSnackBar,
          private router: Router,
      ){}
  
      /**
       * Logs in the user.
       */
      loginUser():void {
          this.FetchApiDataService.signin(this.userData).subscribe((result) => {
              this.dialogRef.close();
              localStorage.setItem('token', result.token);
              localStorage.setItem('user', JSON.stringify(result.user));
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
  