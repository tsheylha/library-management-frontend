import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignupModel } from '../models/signup.model';
import { SignupService } from '../services/signup.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [
    RouterLink, 
    RouterModule, 
    ReactiveFormsModule, 
    CommonModule,
    ToastrModule
  ]
})
export class SignupComponent {
  signupForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private signupService: SignupService,
    private router: Router,
    private toastr: ToastrService
  ) {
    // Form initialization
    this.signupForm = this.formBuilder.group({
      Name: ['', [
        Validators.required, 
        Validators.minLength(4), 
        Validators.maxLength(20)
      ]],
      email: ['', [
        Validators.required, 
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
      ]],
      confirmPassword: ['', Validators.required],
      phoneNumber: ['', [
        Validators.required,
        Validators.pattern(/^(\+975)?[1-9]{1}[0-9]{7}$/) // Example pattern for phone number validation
      ]],
      course: ['', Validators.required]
    }, { 
      validators: this.passwordMatchValidator 
    });
  }

  // Custom password match validator
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    return password && confirmPassword && password.value === confirmPassword.value 
      ? null 
      : { passwordMismatch: true };
  }

  // Handle form submission
  onSubmit(): void {
    this.submitted = true;
    if (this.signupForm.invalid) {
      return;
    }

    // Mapping the signup form data to SignupModel
    const signupData: SignupModel = {
      name: this.signupForm.value.Name ,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      phoneNumber: this.signupForm.value.phoneNumber, 
      course: this.signupForm.value.course
   
    };
    console.log(signupData)
    
    this.signupService.signup(signupData).subscribe({
      next: (data) => {
        this.toastr.success('Signup successful', 'Success');
        this.router.navigate(['/login']);
      },
      error: (data) => {
        this.toastr.error(data.error?.message || 'Signup failed', 'Error');
      }
    });
  }

  // Getter for easy access to form fields
  get f() { return this.signupForm.controls; }
}
