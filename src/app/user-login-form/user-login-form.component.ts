import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss'
})
export class UserLoginFormComponent {

    @Input() userData = { Username: '', Password: ''}

    constructor(
        public FetchApiDataService: FetchApiDataService,
        public dialogRef: MatDialogRef<UserLoginFormComponent>,
        public snackBar: MatSnackBar,
        private router: Router,
    ){}

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