import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../navbar/navbar.component';
import { UpdateComponent } from '../update/update.component';

@Component({
  selector: 'app-userlist',
  standalone: true,
  imports: [CommonModule, NavbarComponent,UpdateComponent],
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  users: any[] = [];
  errorMessage: string = '';
  selectedUser: any = null;
  isUpdateComponentVisible = false;

  constructor(private apiService: ApiService){}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.apiService.getuser().subscribe({
      next: (response: any) => {
        console.log('Response:', response); // Log the response to verify
        if (response && response.data && Array.isArray(response.data.users)) {
          this.users = response.data.users;
        } else {
          alert('No Users available.');
        }
      },
      error: (err) => {
        console.error('Failed to fetch Users:', err);
        alert('Failed to fetch Users.');
      },
    });
    }

  onEditUser(user: any): void {
    this.selectedUser = user;
    this.isUpdateComponentVisible = true; 
  }

  closeUpdateComponent(): void {
    this.isUpdateComponentVisible = false;
    this.selectedUser = null; 
  }
  }
