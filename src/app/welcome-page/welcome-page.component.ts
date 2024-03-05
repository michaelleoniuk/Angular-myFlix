import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';

/**
 * Component for the welcome page.
 * 
 * @remarks
 * This component handles the functionality of displaying the welcome page.
 * It includes methods for opening registration and login dialogs.
 * 
 * @example
 * ```
 * <app-welcome-page></app-welcome-page>
 * ```
 */
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  /**
   * Lifecycle hook called after the component's view has been initialized.
   */
  ngOnInit(): void {
  }

  /**
   * Opens the registration dialog.
   */
  public openRegistrationDialog() : void {
    this.dialog.open(UserRegistrationFormComponent, { width: '400px'});
   }

  /**
   * Opens the login dialog.
   */
   public openLoginDialog() : void {
    this.dialog.open(UserLoginFormComponent, { width: '400px'});
   }

}
