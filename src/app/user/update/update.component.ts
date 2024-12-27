import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from '../../student.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [CommonModule,FormsModule,],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {
@Input() student: any;
@Output() closeEdit = new EventEmitter<void>();
  
  constructor(private studentService: StudentService, private toastr: ToastrService) {}

  post(): void {
    const studentDTO = {
      name: this.student.name,
      grade: this.student.grade,
      email: this.student.email,
      address: this.student.address,
      phoneNumber: this.student.phoneNumber,
      faculty: this.student.faculty,
    };
  
    this.studentService.updateStudent(this.student.id, studentDTO).subscribe(
      (response) => {
        this.toastr.success('Student updated successfully!', 'Success');
        this.closeEdit.emit();
      },
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.toastr.error('Student not found.', 'Error');
        } else if (error.status === 400) {
          this.toastr.error('Invalid data provided.', 'Error');
        } else {
          this.toastr.error('An unexpected error occurred.', 'Error');
        }
      }
    );
  }    
  cancelUpdate() {
    this.closeEdit.emit();
  }
}
