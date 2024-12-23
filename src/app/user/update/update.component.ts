import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [CommonModule,FormsModule,],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {
@Input() user: any;
@Output() closeEdit = new EventEmitter<void>();
  
  constructor(private apiService: ApiService, private toastr: ToastrService) {}

  post(): void {
    const userDTO = {
      name: this.user.name,
      email: this.user.email,
      phoneNumber: this.user.phoneNumber,
      course: this.user.course,
    };
  
    // Correctly format the endpoint with the user ID
    const endpoint = `/users/${this.user.id}`;
  
    // Call the API service's put method
    this.apiService.patch(endpoint, userDTO).subscribe(
      (response) => {
        console.log('User updated successfully:', response);
        this.toastr.success('User updated successfully!', 'Success');
        this.closeEdit.emit();
      },
      (error) => {
        console.error('Error updating user:', error);
        this.toastr.error('Failed to update the user.', 'Error');
      }
    );
  }
  
  cancelUpdate() {
    this.closeEdit.emit();
  }
}
