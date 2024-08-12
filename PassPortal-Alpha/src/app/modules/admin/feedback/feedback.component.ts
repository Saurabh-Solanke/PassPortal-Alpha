import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { Feedback } from '../../../interfaces/feedback.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
})
export class FeedbackComponent implements OnInit {
  feedbacks: Feedback[] = [];
  displayedFeedbacks: Feedback[] = [];
  selectedFeedback: Feedback | null = null;
  page = 1;
  pageSize = 6; // Show 6 entries per page
  totalFeedbacks = 0;
  sortOrder: 'asc' | 'desc' = 'desc'; // Sorting order
  filterCriteria = 'all';

  constructor(private http: HttpClient, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    this.http
      .get<Feedback[]>('http://localhost:3000/feedbacks')
      .subscribe((data) => {
        const filteredData = this.applyFilterCriteria(data);
        this.feedbacks = filteredData;
        this.totalFeedbacks = filteredData.length;
        this.sortFeedbacks(); // Sort on the front end
        this.updateDisplayedFeedbacks();
      });
  }

  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.sortFeedbacks();
    this.updateDisplayedFeedbacks();
  }

  sortFeedbacks(): void {
    this.feedbacks.sort((a, b) => {
      const dateA = new Date(a.dateTime).getTime();
      const dateB = new Date(b.dateTime).getTime();
      return this.sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.updateDisplayedFeedbacks();
    }
  }

  nextPage(): void {
    if (this.page * this.pageSize < this.totalFeedbacks) {
      this.page++;
      this.updateDisplayedFeedbacks();
    }
  }

  goToPage(pageNumber: number): void {
    if (pageNumber > 0 && pageNumber <= this.totalPages()) {
      this.page = pageNumber;
      this.updateDisplayedFeedbacks();
    }
  }

  applyFilter(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.filterCriteria = selectElement.value;
    this.page = 1; // Reset to first page after filter change
    this.loadFeedbacks();
  }

  applyFilterCriteria(data: Feedback[]): Feedback[] {
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 1)); // Start of the week (Monday)
    const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 7)); // End of the week (Sunday)
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1); // Start of the month
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0); // End of the month
    const startOfYear = new Date(now.getFullYear(), 0, 1); // Start of the year

    switch (this.filterCriteria) {
      case 'thisWeek':
        return data.filter(
          (feedback) =>
            new Date(feedback.dateTime) >= startOfWeek &&
            new Date(feedback.dateTime) <= endOfWeek
        );
      case 'thisMonth':
        return data.filter(
          (feedback) =>
            new Date(feedback.dateTime) >= startOfMonth &&
            new Date(feedback.dateTime) <= endOfMonth
        );
      case 'thisYear':
        return data.filter(
          (feedback) => new Date(feedback.dateTime) >= startOfYear
        );
      case 'pending':
        return data.filter((feedback) => feedback.status === 'Pending');
      case 'acknowledged':
        return data.filter((feedback) => feedback.status === 'Acknowledged');
      default:
        return data;
    }
  }

  updateDisplayedFeedbacks(): void {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.displayedFeedbacks = this.feedbacks.slice(start, end);
  }

  openModal(content: any, feedback: Feedback): void {
    this.selectedFeedback = feedback;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  acknowledgeOrResolve(): void {
    if (this.selectedFeedback) {
      this.selectedFeedback.status = 'Acknowledged';
      // Update status on the server
      this.http
        .put(
          `http://localhost:3000/feedbacks/${this.selectedFeedback.id}`,
          this.selectedFeedback
        )
        .subscribe(() => {
          this.loadFeedbacks(); // Reload feedbacks after update
          this.modalService.dismissAll();
        });
    }
  }

  sendEmail(): void {
    // Implement email sending logic here
    if (this.selectedFeedback) {
      console.log(`Sending email to ${this.selectedFeedback.email}`);
    }
  }

  totalPages(): number {
    return Math.ceil(this.totalFeedbacks / this.pageSize);
  }

  pageNumbers(): number[] {
    const pageCount = this.totalPages();
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }
}
