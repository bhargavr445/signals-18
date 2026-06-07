import { TestBed } from '@angular/core/testing';
import { ElectionsService } from './elections.service';
import { provideHttpClient, withXhr } from '@angular/common/http';

describe('ElectionsService', () => {
  let service: ElectionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(withXhr())],
    });
    service = TestBed.inject(ElectionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
