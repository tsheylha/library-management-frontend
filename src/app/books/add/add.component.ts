import { Component } from '@angular/core';

import { BookService } from '../../book.service';

import { BookService } from '../../../../book.service';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule,HttpClientModule,FormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {

  name: string = 'John Doe';  
  dropdownVisible: boolean = false;

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
 
 constructor(private bookService: BookService, private router: Router) {}

 saveBook() {

=======
   // Call the service to save the book

   this.bookService.saveBook(this.book).subscribe({
     next: (response) => {
       alert('Book saved successfully!');
       console.log(response);

       this.router.navigate(['books/view']); 

       // Navigate to the 'view' page after successful book saving
       this.router.navigate(['books/view']);  // Ensure this line works

     },
     error: (error) => {
       alert('Failed to save the book.');
       console.error(error);
     }
   });
 }

 
 toggleProfileDropdown(): void {
  this.dropdownVisible = !this.dropdownVisible;
}
booksDropdownVisible = false; 

toggleBooksDropdown(event: MouseEvent): void {
  event.preventDefault(); 
  this.booksDropdownVisible = !this.booksDropdownVisible;
}

cancelForm(): void {
  this.router.navigate(['/books/view']);  
}

}
