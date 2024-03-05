import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Component for user registration form.
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit{

  /**
   * Holds the user data for registration (Username, Password, Email, Birthday).
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: ''}

  /**
   * Initializes an instance of UserRegistrationFormComponent.
   * @param fetchApiData Service for fetching data from the API.
   * @param dialogRef Reference to the dialog opened by the component.
   * @param snackBar Service for displaying snack bar notifications.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  /**
   * Lifecycle hook that is called after Angular has initialized all data-bound properties of the directive.
   */
  ngOnInit(): void {
  }

  /**
   * Registers a new user.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      //Logic for a successful user registration
      console.log(result);
      this.dialogRef.close(); // Will close modal on success (To be implemented)
      this.snackBar.open('User registration successful', 'OK', {
        duration: 2000
      });
    }, (result) => {
      console.log(result);
      this.snackBar.open('User registration successful', 'OK', {
        duration: 2000
      });
    });
  }

}
