import { Injectable } from "@angular/core";
import { environment } from "../environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private baseUrl = environment.bookingsUrl;

  constructor(private http: HttpClient) {}

  saveBook(booking: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addbooking`, booking);
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

  updateBook(id: number, bookingDTO: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/update/${id}`, bookingDTO);
  }
}
