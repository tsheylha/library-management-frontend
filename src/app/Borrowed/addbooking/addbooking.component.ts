import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from '../../services/booking.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-addbooking',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './addbooking.component.html',
  styleUrl: './addbooking.component.css'
})
export class AddbookingComponent {
    name: string = 'John Doe';  
    dropdownVisible: boolean = false;
  
  @Output() closeForm = new EventEmitter<void>();
  booking = {
  bookId: null,
  userId: null,
  price: null,
  borrowedDate: null,
  dueDate: null,
  overDue: 0,
  fineAmount: 0
  };

  toggleProfileDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }

  bookingsDropdownVisible = false;

  constructor(private bookingService: BookingService, private router: Router, private toastr: ToastrService) {}
    saveBooking(form: NgForm) {
      if (form.invalid) {
        Object.keys(form.controls).forEach((field) => {
          const control = form.controls[field];
          control.markAsTouched({ onlySelf: true });
        });
        this.toastr.warning('Please fill out all required fields.', 'Validation Error');
        return;
      
      }

      this.bookingService.saveBook(this.booking).subscribe({
        next: (response) => {
          this.toastr.success('Recorded successfully!', 'Success');
          this.closeForm.emit();
        },
        error: (error) => {
          this.toastr.error('Failed Record the book.', 'Error');
          console.error(error);
        }
      });
    }
    
  cancelForm(): void {
    this.closeForm.emit();
  }
}
