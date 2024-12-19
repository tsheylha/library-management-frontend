import { Component, OnInit } from '@angular/core';
import { BookService } from '../../book.service';
import { CommonModule } from '@angular/common';
import { AddComponent } from "../add/add.component";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [CommonModule, AddComponent],
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  books: any[] = [];  
  name: string = 'John Doe';  
  dropdownVisible: boolean = false;
  isAddComponentVisible = false; 

  constructor(private bookService: BookService,  private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.get().subscribe({
      next: (response: any) => {  
        console.log('Response:', response); 
        if (response && response.data && response.data.book && Array.isArray(response.data.book)) {
          this.books = response.data.book;
        } else {
          alert('No books available.');
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

  deleteBook(bookId: number): void {
    this.bookService.delete(bookId).subscribe({
      next: (response: any) => {
        console.log('Delete Response:', response);
        this.toastr.success('Book deleted successfully!', 'Success');
        this.books = this.books.filter((book) => book.id !== bookId);  
      },
      error: (err) => {
        console.error('Failed to delete book', err);
        this.toastr.error('Failed to delete the book. Please try again.', 'Error'); 
      },
    });
  }
  toggleAddComponent() {
    this.isAddComponentVisible = !this.isAddComponentVisible;
  }
}
