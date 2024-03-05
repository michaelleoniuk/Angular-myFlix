import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';

/**
 * NgModule for server-side rendering.
 * 
 * @remarks
 * This module imports the AppModule and ServerModule to configure server-side rendering.
 * It specifies the AppComponent as the bootstrap component for the application.
 */
@NgModule({
  imports: [AppModule, ServerModule],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
