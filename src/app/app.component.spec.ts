import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

/**
 * Test suite for the AppComponent.
 * 
 * @remarks
 * This suite contains tests to verify the behavior of the AppComponent.
 */
describe('AppComponent', () => {
  /**
   * Runs before each test in the suite.
   * 
   * @remarks
   * This function sets up the testing environment by configuring TestBed with necessary imports and declarations.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  /**
   * Test case to verify that the AppComponent is created successfully.
   */
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  /**
   * Test case to verify that the AppComponent has the correct title.
   */
  it(`should have as title 'movie_api_angular_client'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('movie_api_angular_client');
  });

  /**
   * Test case to verify that the AppComponent renders the title correctly.
   */
  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, movie_api_angular_client');
  });
});
