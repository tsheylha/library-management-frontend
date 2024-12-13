import { Component } from '@angular/core';
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
   // Call the service to save the book
   this.bookService.saveBook(this.book).subscribe({
     next: (response) => {
       alert('Book saved successfully!');
       console.log(response);
       // Navigate to the 'view' page after successful book saving
       this.router.navigate(['books/view']);  // Ensure this line works
     },
     error: (error) => {
       alert('Failed to save the book.');
       console.error(error);
     }
   });
 }
}
