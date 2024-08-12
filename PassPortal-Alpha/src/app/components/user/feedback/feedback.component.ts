import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
  standalone: true,
  imports: [HttpClientModule, FormsModule],
})
export class FeedbackComponent {
  formData = {
    type: '',
    subject: '',
    message: '',
  };

  constructor(private http: HttpClient) {}

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
        alert(
          `${
            this.formData.type === 'feedback' ? 'Feedback' : 'Complaint'
          } submitted successfully!`
        );
        this.resetForm();
      },
      (error) => {
        alert('An error occurred while submitting your request.');
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
    return loggedInUser.email || 'anonymous';
  }

  resetForm() {
    this.formData = {
      type: '',
      subject: '',
      message: '',
    };
  }
}
