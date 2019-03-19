import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  private apiDomain = '';

  constructor(private http: HttpClient) {
    if (isDevMode()) {
      this.apiDomain = `http://localhost:${environment.server_port}/api`;
    } else {
      this.apiDomain = 'https://srtt.me/api';
    }
  }

  newUrl(url) {
    return this.http.post<any>(this.apiDomain + '/url/new', url);
  }
}
