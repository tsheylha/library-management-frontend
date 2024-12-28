import { Component, OnInit } from '@angular/core';
import { EditComponent } from '../../books/edit/edit.component';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../services/booking.service';
import { ToastrService } from 'ngx-toastr';
import { AddbookingComponent } from '../addbooking/addbooking.component';
import { EditbookingComponent } from '../editbooking/editbooking.component';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule,EditComponent,AddbookingComponent,EditbookingComponent],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit{
  booking: any[] = [];   
   dropdownVisible: boolean = false;
   isAddbookingComponentVisible = false; 
   isEditbookingComponentVisible = false;
   selectedBooking: any = null;
 
   constructor(private bookingService: BookingService,  private toastr: ToastrService) {}
 
   ngOnInit(): void {
     this.updateBooking();
   }

   updateBooking(): void {
    this.bookingService.get().subscribe({
      next: (response: any) => {  
        if (response && response.data && Array.isArray(response.data.bookingInfo)) {
          this.booking = response.data.bookingInfo; 
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
  
  toggleAddbookingComponent() {
    this.isAddbookingComponentVisible = !this.isAddbookingComponentVisible;
  }

  onEditBooking(booking: any) {
    this.selectedBooking = booking;
    this.isEditbookingComponentVisible = true;
  }

  closeEditbookingComponent() {
    this.isEditbookingComponentVisible = false;
    this.selectedBooking = null;
  }
} 
