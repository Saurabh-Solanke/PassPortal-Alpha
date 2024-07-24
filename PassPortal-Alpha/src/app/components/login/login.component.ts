import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { SignupComponent } from '../signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SignupComponent,
    RouterOutlet,
    RouterLink,
    HttpClientModule,
  ],
  providers: [AuthService],
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/
          ),
        ],
      ],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (res: any) => {
          if (res.password === this.loginForm.value.password) {
            // Swal.fire('Success', 'Login successful!', 'success');
            sessionStorage.setItem('loggedInUser', res.name);
            this.router.navigate(['/user-home'], {
              state: { username: res.name },
            });
          } else {
            Swal.fire('Error', 'Invalid email or password', 'error');
          }
        },
        (error) => {
          Swal.fire('Error', 'An error occurred. Please try again.', 'error');
        }
      );
    } else {
      Swal.fire('Error', 'Please fill in all the fields correctly.', 'error');
    }
  }
}
