import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private http: HttpClient) { }

  authenticate(code: string, email: string, password: string): Observable<any> {
    return this.http.post('http://localhost:8080/client/authenticate', {
        code: code,
        email: email,
        password: password
    });
}

  getClient(): any {
    const item = localStorage.getItem('client');
    return item ? JSON.parse(item) : null;
  }

  setClient(value: any) {
    localStorage.setItem('client', JSON.stringify(value));
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }
  registerClient(clientData: Client): Observable<any> {
    return this.http.post<any>('http://localhost:8080/client/register', clientData);
  }
}
