import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  name: string = 'John Doe';  
  dropdownVisible: boolean = false;

  constructor() { }

  ngOnInit(): void {
    
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
