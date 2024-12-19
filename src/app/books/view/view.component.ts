import { Component, OnInit } from '@angular/core';
import { BookService } from '../../book.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  books: any[] = [];  
  name: string = 'John Doe';  
  dropdownVisible: boolean = false;

  constructor(private bookService: BookService) {}

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
  booksDropdownVisible = false; // Tracks dropdown visibility

  toggleBooksDropdown(event: MouseEvent): void {
    event.preventDefault(); // Prevent default link behavior
    this.booksDropdownVisible = !this.booksDropdownVisible;
  }
}
