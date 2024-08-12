import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common'; // Use CommonModule for standalone components

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
  standalone: true,
  imports: [
    HttpClientModule,
    FormsModule,
    ToastModule,
    CommonModule, // Use CommonModule instead of BrowserAnimationsModule
  ],
  providers: [MessageService],
})
export class FeedbackComponent {
  formData = {
    type: '',
    subject: '',
    message: '',
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  onSubmit() {
    const newEntry = {
      id: this.generateId(),
      email: this.getUserEmail(),
      subject: this.formData.subject,
      dateTime: new Date().toISOString(),
      message: this.formData.message,
      status: 'Pending',
    };

    const url =
      this.formData.type === 'feedback'
        ? 'http://localhost:3000/feedbacks'
        : 'http://localhost:3000/complaints';

    this.http.post(url, newEntry).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `${
            this.formData.type === 'feedback' ? 'Feedback' : 'Complaint'
          } submitted successfully!`,
        });
        this.resetForm();
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'An error occurred while submitting your request.',
        });
        console.error(error);
      }
    );
  }

  generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  }

  getUserEmail(): string {
    const loggedInUser = JSON.parse(
      sessionStorage.getItem('loggedInUser') || '{}'
    );
    return loggedInUser.email || 'anonymous@example.com';
  }

  resetForm() {
    this.formData = {
      type: '',
      subject: '',
      message: '',
    };
  }
}
