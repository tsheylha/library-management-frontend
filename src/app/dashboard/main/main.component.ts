import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { BookService } from '../../book.service';
import { ViewComponent } from '../../books/view/view.component';
import { UserlistComponent } from '../../user/userlist/userlist.component';
import { SharedModule } from '../../../../sharedmodule';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
  totalBooks: number = 0;
  multi: any[] = [];
  single: any[] = [];
  gradient: boolean = true; 
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  pieChartData: any[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getCount().subscribe({
      next: (count: number) => {
        this.totalBooks = count;
        this.pieChartData = [
          {
            name: 'All Books',
            value: this.totalBooks, 
          },
          {
            name: 'New Books',
            value: 20,
          },
          {
            name: 'Damaged Books',
            value: 50,
          },
        ];
      },
      error: (err) => {
        console.error('Error fetching book count:', err);
      },
    });
    this.fetchDataForCharts(); 
  }

  fetchDataForCharts() {
    this.single = [
      {
        name: 'Borrowed Rate',
        series: [
          { name: 'Jan', value: 80 },
          { name: 'Feb', value: 70 },
          { name: 'Mar', value: 60 },
          { name: 'Apr', value: 90 },
          { name: 'May', value: 70 },
          { name: 'Jun', value: 60 },
          { name: 'Jul', value: 80 },
          { name: 'Aug', value: 50 },
          { name: 'Sep', value: 90 },
          { name: 'Oct', value: 80 },
          { name: 'Nov', value: 70 },
          { name: 'Dec', value: 80 },
        ],
      },
      {
        name: 'Loan Conversion',
        series: [
          { name: 'Jan', value: 50 },
          { name: 'Feb', value: 40 },
          { name: 'Mar', value: 30 },
          { name: 'Apr', value: 20 },
          { name: 'May', value: 40 },
          { name: 'Jun', value: 30 },
          { name: 'Jul', value: 50 },
          { name: 'Aug', value: 20 },
          { name: 'Sep', value: 50 },
          { name: 'Oct', value: 30 },
          { name: 'Nov', value: 20 },
          { name: 'Dec', value: 10 },
        ],
      },
    ];
    
  }
}
