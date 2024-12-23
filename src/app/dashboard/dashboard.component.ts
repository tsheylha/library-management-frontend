import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { BookService } from '../book.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  name: string = 'John Doe';  
  dropdownVisible: boolean = false;
  totalBooks: number = 0;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getCount().subscribe({
      next: (count: number) => {
        this.totalBooks = count;  // Get the total count of books from the service
      },
      error: (err) => {
        console.error('Error fetching book count:', err);  // Log error if any
      }
    });
  }
}
