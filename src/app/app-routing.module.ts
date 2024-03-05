import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/**
 * Defines the routes for the application.
 * 
 * @remarks
 * This constant holds an array of route definitions for the application.
 * 
 * @example
 * ```
 * const routes: Routes = [
 *   { path: 'home', component: HomeComponent },
 *   { path: 'about', component: AboutComponent },
 *   { path: 'contact', component: ContactComponent },
 *   { path: '', redirectTo: '/home', pathMatch: 'full' },
 *   { path: '**', component: PageNotFoundComponent }
 * ];
 * ```
 */
const routes: Routes = [];

/**
 * NgModule that manages the application's routing.
 * 
 * @remarks
 * This module imports RouterModule and sets up the application's routes.
 * It also exports RouterModule to make router directives available for use in the AppModule components.
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

