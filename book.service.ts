import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private baseUrl = 'http://localhost:8080/api/v1/books/add';

  constructor(private http: HttpClient) {}

  saveBook(book: any): Observable<any> {
    return this.http.post(this.baseUrl, book);
  }
}
