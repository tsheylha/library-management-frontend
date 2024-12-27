import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { StudentService } from '../../student.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addstudent',
  standalone: true,
  imports: [CommonModule,HttpClientModule,FormsModule],
  templateUrl: './addstudent.component.html',
  styleUrl: './addstudent.component.css'
})
export class AddstudentComponent {
  dropdownVisible:boolean=false;
  
 @Output() closeForm = new EventEmitter<void>();
 student = {
    name: '',
    email: '',
    password: '',
    grade: '',
    address: 0,
    faculty: 0,
    phoneNumber: '',
  };

 toggleProfileDropdown(): void {
  this.dropdownVisible = !this.dropdownVisible;
}

  constructor(private studentService: StudentService, private router: Router, private toastr: ToastrService) {}
  saveStudent(form: NgForm) {
    if (form.invalid) {
      Object.keys(form.controls).forEach((field) => {
        const control = form.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
      this.toastr.warning('Please fill out all required fields.', 'Validation Error');
      return;
    }

    this.studentService.saveStudent(this.student).subscribe({
      next: (response) => {
        this.toastr.success('student added successfully!', 'Success');
        this.closeForm.emit();
      },
      error: (error) => {
        this.toastr.error(' to save the student.', 'Error');
        console.error(error);
      }
    });
  }

  cancelForm(): void {
    this.closeForm.emit();
  }
}
