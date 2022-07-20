import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';

import { throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private SERVER_URL = 'http://localhost:3000/projects';

  public first: string = '';
  public prev: string = '';
  public next: string = '';
  public last: string = '';

  constructor(private httpClient: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public sendGetRequest(params: any) {
    // Add safe, URL encoded _page and _limit parameters
    return this.httpClient
      .get(this.SERVER_URL, {
        params: new HttpParams({
          fromString: `_page=${params.page}&_limit=${params.pageSize}`,
        }),
        observe: 'response',
      })
      .pipe(
        retry(3),
        catchError(this.handleError),
        tap((res) => {
          // console.log(res.headers.get('Link'));
          // console.log(res.headers.get('X-Total-Count'));
          this.parseLinkHeader(res.headers.get('Link'));
        })
      );
  }

  public sendGetRequestToUrl(url: string) {
    return this.httpClient.get(url, { observe: 'response' }).pipe(
      retry(3),
      catchError(this.handleError),
      tap((res) => {
        // console.log(res.headers.get('Link'));
        // console.log(res.headers.get('X-Total-Count'));
        this.parseLinkHeader(res.headers.get('Link'));
      })
    );
  }

  parseLinkHeader(header: string) {
    if (header.length === 0) {
      return;
    }
    const parts = header.split(',');
    const links = {
      first: '',
      last: '',
      prev: '',
      next: '',
    };

    parts.forEach((p: string) => {
      const section = p.split(';');
      const url = section[0].replace(/<(.*)>/, '$1').trim();
      const name = section[1].replace(/rel="(.*)"/, '$1').trim();
      links[name] = url;
    });

    this.first = links.first;
    this.last = links.last;
    this.prev = links.prev;
    this.next = links.next;
  }
}
