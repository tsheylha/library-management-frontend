import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './environment';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private baseUrl = environment.booksUrl;

  constructor(private http: HttpClient) {}

  saveBook(book: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/add`, book);
  }
  
  get(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
  getCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
}
  delete(bookId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${bookId.toString()}`); 
  }
}
