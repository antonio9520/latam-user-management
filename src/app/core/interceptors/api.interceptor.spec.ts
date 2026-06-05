import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { apiInterceptor } from './api.interceptor';

describe('apiInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([apiInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should prepend the environment base URL to relative paths', () => {
    http.get('/users').subscribe();

    const req = httpMock.expectOne((r) => r.url.includes('/users'));
    expect(req.request.url).toBe('http://localhost:3001/users');
    req.flush([]);
  });

  it('should use the body message when the backend responds with { message }', () => {
    let caughtError: Error | undefined;

    http.get('/users/999').subscribe({ error: (e: Error) => (caughtError = e) });

    const req = httpMock.expectOne((r) => r.url.includes('/users/999'));
    req.flush({ message: 'Not found' }, { status: 404, statusText: 'Not Found' });

    expect(caughtError).toBeInstanceOf(Error);
    expect(caughtError?.message).toBe('Not found');
  });

  it('should fall back to HttpErrorResponse.message when body has no message', () => {
    let caughtError: Error | undefined;

    http.get('/users/abc').subscribe({ error: (e: Error) => (caughtError = e) });

    const req = httpMock.expectOne((r) => r.url.includes('/users/abc'));
    req.flush(null, { status: 500, statusText: 'Internal Server Error' });

    expect(caughtError).toBeInstanceOf(Error);
    expect(caughtError?.message).toBeTruthy();
  });
});
