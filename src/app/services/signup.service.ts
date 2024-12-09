import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignupModel } from '../models/signup.model';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private apiUrl = 'http://localhost:8080/api/v1/users'; // Backend endpoint

  constructor(private http: HttpClient) {}

  signup(signupData: SignupModel): Observable<any> {
    return this.http.post(this.apiUrl, signupData);
  }
}
