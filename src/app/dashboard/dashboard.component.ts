import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { BookService } from '../book.service';
import { ViewComponent } from '../books/view/view.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,NavbarComponent,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit { 
  dropdownVisible: boolean = false;
  totalBooks: number = 0;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getCount().subscribe({
      next: (count: number) => {
        this.totalBooks = count; 
      },
      error: (err) => {
        console.error('Error fetching book count:', err);
      }
    });
  }
}
