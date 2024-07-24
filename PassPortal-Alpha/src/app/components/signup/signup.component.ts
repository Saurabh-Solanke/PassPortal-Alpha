import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidationErrors,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [AuthService],
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/[A-Z]/), // Uppercase letter
          Validators.pattern(/[a-z]/), // Lowercase letter
          Validators.pattern(/[0-9]/), // Number
          Validators.pattern(/[!@#$%^&*(),.?":{}|<>]/), // Special character
        ],
      ],
      confirmPassword: ['', [Validators.required, this.matchPasswordValidator]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      role: ['Client'],
      accountStatus: ['Active'],
    });
  }

  matchPasswordValidator = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const password = this.signupForm?.get('password')?.value;
    const confirmPassword = control.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  };

  get password() {
    return this.signupForm.get('password');
  }

  get passwordErrors() {
    const errors = this.password?.errors || {};
    return {
      required: errors['required'],
      minlength: errors['minlength'],
      uppercase: !/[A-Z]/.test(this.password?.value || ''),
      lowercase: !/[a-z]/.test(this.password?.value || ''),
      number: !/[0-9]/.test(this.password?.value || ''),
      special: !/[!@#$%^&*(),.?":{}|<>]/.test(this.password?.value || ''),
    };
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const { email, confirmPassword, ...user } = this.signupForm.value;

      console.log('Form is valid. Checking if email exists...');
      this.authService.emailExists(email).subscribe(
        (emailExists) => {
          console.log(`Email exists: ${emailExists}`);
          if (emailExists) {
            Swal.fire(
              'Warning',
              'Email already exists. Please go to the login page to login.',
              'warning'
            );
          } else {
            console.log('Email does not exist. Proceeding with signup...');
            this.authService.signup(user).subscribe(
              (response) => {
                console.log('Signup successful.');
                Swal.fire('Success', 'Signup successful!', 'success').then(
                  () => {
                    setTimeout(() => {
                      this.router.navigate(['/']);
                    }, 100);
                  }
                );
              },
              (error) => {
                console.log('Signup failed.');
                Swal.fire('Error', 'Signup failed. Please try again.', 'error');
              }
            );
          }
        },
        (error) => {
          console.log('Failed to check email.');
          Swal.fire(
            'Error',
            'Failed to check email. Please try again.',
            'error'
          );
        }
      );
    } else {
      console.log('Form is invalid.');
      // Swal.fire('Error', 'Please fill all the fields correctly.', 'error');
      this.signupForm.markAllAsTouched();
    }
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
