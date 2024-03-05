import { TestBed } from '@angular/core/testing';
import { FetchApiDataService } from './fetch-api-data.service';

/**
 * Test suite for the FetchApiDataService.
 * 
 * @remarks
 * This suite contains tests to verify the behavior of the FetchApiDataService service.
 */
describe('FetchApiDataService', () => {
  let service: FetchApiDataService;

  /**
   * Runs before each test in the suite.
   * 
   * @remarks
   * This function sets up the testing environment by configuring TestBed and initializing the service.
   */
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchApiDataService);
  });

  /**
   * Test case to verify that the FetchApiDataService is created successfully.
   */
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

