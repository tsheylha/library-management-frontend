import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-editbooking',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './editbooking.component.html',
  styleUrl: './editbooking.component.css'
})
export class EditbookingComponent {
  @Input() booking: any;
   @Output() closeEdit = new EventEmitter<void>();
   
   constructor(private bookingService: BookingService, private toastr: ToastrService) {}
   updateBooking(): void {
     const bookingDTO = {
       bookId: this.booking.bookId,
       userId: this.booking.userId,
       borrowedDate: this.booking.borrowedDate,
       dueDate: this.booking.dueDate,
       overDue: this.booking.overDue,
       fineAmount: this.booking.fineAmount,
     };
 
     this.bookingService.updateBooking(this.booking.id, bookingDTO).subscribe(
       (response) => {
         console.log('Book updated successfully:', response);
         this.toastr.success('Book updated successfully!', 'Success');
         this.closeEdit.emit();
       },
       (error) => {
         console.error('Error updating book:', error);
         this.toastr.error('Failed to update the book.', 'Error');
       }
     );
   }
   cancelEdit() {
     this.closeEdit.emit();
   }
}
