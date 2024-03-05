import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Component for the navigation bar.
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  /**
   * Initializes an instance of NavbarComponent.
   * @param router The router service for navigating between routes.
   */
  constructor(public router: Router) { }

  /**
   * Lifecycle hook that is called after Angular has initialized all data-bound properties of the directive.
   */
  ngOnInit(): void {
  }

  /**
   * Navigates to the movie list page.
   */
  public openMovieList(): void{
    this.router.navigate(['movies']);
  }

  /**
   * Navigates to the user profile page.
   */
  public openProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * Logs out the user by clearing local storage and navigating to the welcome page.
   */
  public logoutUser(): void {
    localStorage.setItem('token', '');
    localStorage.setItem('user', '');
    this.router.navigate(['welcome']);
  }
}
