import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateComponent } from '../update/update.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { AddstudentComponent } from '../addstudent/addstudent.component';
import { StudentService } from '../../student.service';

@Component({
  selector: 'app-userlist',
  standalone: true,
  imports: [CommonModule, NavbarComponent,UpdateComponent,AddstudentComponent],
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  Students: any[] = [];
  errorMessage: string = '';
  selectedStudent: any = null;
  isUpdateComponentVisible = false;
  isAddstudentComponentVisible=false;


  constructor(private studentService: StudentService){}

  ngOnInit(): void {
    this.fetchStudents();
  }
  fetchStudents(): void {
    this.studentService.get().subscribe({
      next: (response: any) => {
        console.log('Response:', response);  // Verify the response
        if (Array.isArray(response)) {
          this.Students = response;  // Populate the Students array
        } else {
          alert('No student available.');
        }
      },
      error: (err) => {
        console.error('Failed to fetch students:', err);
        alert('Failed to fetch students.');
      },
    });
  }
  
  onEditUser(student: any): void {
    this.selectedStudent = student;
    this.isUpdateComponentVisible = true; 
  }

  closeUpdateComponent(): void {
    this.isUpdateComponentVisible = false;
    this.selectedStudent = null; 
  }
  toggleAddstudentComponent() {
    this.isAddstudentComponentVisible = !this.isAddstudentComponentVisible;
  }
  }
