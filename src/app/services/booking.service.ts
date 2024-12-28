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
    return this.http.post<any>(`${this.baseUrl}`, booking);
  }
  
  get(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
  // Get the count of bookings
  getCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`); // GET to fetch the count of bookings
  }
// Delete a booking by its ID
delete(bookId: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/${bookId.toString()}`); // DELETE a booking
}

updateBooking(id: number, bookingDTO: any): Observable<any> {
  const url = `${this.baseUrl}/update/${id}`;
  console.log('Request URL:', url);  // Log URL to verify it's correct
  return this.http.patch(url, bookingDTO);
}

}
