
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookService } from '../../book.service';


@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  name: string = 'John Doe';  
  dropdownVisible: boolean = false;

  @Output() closeForm = new EventEmitter<void>();
  book = {
    isbn: '',
    title: '',
    author: '',
    genre: '',
    price: 0,
    availableCopies: 0,
    publisher: '',
    publishedYear: 0
  };

 toggleProfileDropdown(): void {
  this.dropdownVisible = !this.dropdownVisible;
}
booksDropdownVisible = false; 
  constructor(private bookService: BookService, private router: Router, private toastr: ToastrService) {}
  saveBook(form: NgForm) {
    // If the form is invalid, mark all fields as touched to trigger validation messages
    if (form.invalid) {
      Object.keys(form.controls).forEach((field) => {
        const control = form.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
      this.toastr.warning('Please fill out all required fields.', 'Validation Error');
      return;
    }

    this.bookService.saveBook(this.book).subscribe({
      next: (response) => {
        this.toastr.success('Book added successfully!', 'Success');
        this.closeForm.emit();
      },
      error: (error) => {
        this.toastr.error('Failed to save the book.', 'Error');
        console.error(error);
      }
    });
  }

  cancelForm(): void {
    this.closeForm.emit();
  }
}
