import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './environment';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  patch(endpoint: string, studentDTO: { name: any; grade: any; email: any; address: any; phoneNumber: any; faculty: any; }) {
    throw new Error('Method not implemented.');
  }
  private baseUrl = environment.stdUrl;

  constructor(private http: HttpClient) {}

  saveStudent(student: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/add`, student);
  }
  
  get(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
  getCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
}

 // student.service.ts

 updateStudent(id: number, studentDTO: any): Observable<any> {
  return this.http.patch(`${this.baseUrl}/update/${id}`, studentDTO);
}
}
