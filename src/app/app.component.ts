import { Component } from '@angular/core';

/**
 * Component for the root of the application.
 * 
 * @remarks
 * This component represents the root of the Angular application.
 * It defines the main structure and behavior of the application.
 * 
 * @example
 * ```
 * <app-root></app-root>
 * ```
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /**
   * The title of the application.
   * 
   * @remarks
   * This property holds the title of the Angular application.
   */
  title = 'myflix-Angular';
}
