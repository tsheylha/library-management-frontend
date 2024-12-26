import { Component, OnInit } from '@angular/core';
import { EditComponent } from '../../books/edit/edit.component';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../services/booking.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule,EditComponent],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit{
  booking: any[] = [];  
   name: string = 'John Doe';  
   dropdownVisible: boolean = false;
   isAddComponentVisible = false; 
   isEditComponentVisible = false;
   selectedBook: any = null;
 
   constructor(private bookingService: BookingService,  private toastr: ToastrService) {}
 
   ngOnInit(): void {
     this.loadBookings();
   }

  loadBookings(): void {
    this.bookingService.get().subscribe({
      next: (response: any) => {  
        console.log('Response:', response); 
        if (response && response.data && response.data.book && Array.isArray(response.data.book)) {
          this.booking = response.data.book;
        } else {
          alert('No records.');
        }
      },
      error: (err) => {
        console.error('Failed to fetch books', err);
        alert('Failed to fetch books.');
      },
    });
  }
  
  toggleProfileDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }

  deleteBooking(bookId: number): void {
    this.bookingService.delete(bookId).subscribe({
      next: (response: any) => {
        console.log('Delete Response:', response);
        this.toastr.success('Book deleted successfully!', 'Success');
        this.booking = this.booking.filter((booking) => booking.id !== bookId);  
      },
      error: (err) => {
        console.error('Failed to delete record', err);
        this.toastr.error('Failed to delete the record. Please try again.', 'Error'); 
      },
    });
  }
  
  toggleAddComponent() {
    this.isAddComponentVisible = !this.isAddComponentVisible;
  }

  onEditBook(book: any) {
    this.selectedBook = book;
    this.isEditComponentVisible = true;
  }

  closeEditComponent() {
    this.isEditComponentVisible = false;
    this.selectedBook = null;
  }
}
