import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { Complaint } from '../../../interfaces/complaint.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule],
})
export class ComplaintsComponent implements OnInit {
  complaints$: Observable<Complaint[]> = of([]);
  selectedComplaint: Complaint | null = null;
  page = 1;
  pageSize = 6; // Show 6 entries per page
  totalComplaints = 0;
  sortOrder: 'asc' | 'desc' = 'desc'; // Sorting order
  filterCriteria = 'all';

  constructor(private http: HttpClient, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadComplaints();
  }

  loadComplaints(): void {
    this.http
      .get<Complaint[]>(
        `http://localhost:3000/complaints?_sort=dateTime&_order=${this.sortOrder}`
      )
      .subscribe((data) => {
        const filteredData = this.applyFilterCriteria(data);
        this.totalComplaints = filteredData.length;
        this.complaints$ = of(
          filteredData.slice(
            (this.page - 1) * this.pageSize,
            this.page * this.pageSize
          )
        );
      });
  }

  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.loadComplaints();
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadComplaints();
    }
  }

  nextPage(): void {
    if (this.page * this.pageSize < this.totalComplaints) {
      this.page++;
      this.loadComplaints();
    }
  }

  goToPage(pageNumber: number): void {
    if (pageNumber > 0 && pageNumber <= this.totalPages()) {
      this.page = pageNumber;
      this.loadComplaints();
    }
  }

  applyFilter(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.filterCriteria = selectElement.value;
    this.page = 1; // Reset to first page after filter change
    this.loadComplaints();
  }

  applyFilterCriteria(data: Complaint[]): Complaint[] {
    const now = new Date();
    switch (this.filterCriteria) {
      case 'thisWeek':
        return data.filter(
          (complaint) =>
            new Date(complaint.dateTime) >
            new Date(now.setDate(now.getDate() - now.getDay()))
        );
      case 'thisMonth':
        return data.filter(
          (complaint) =>
            new Date(complaint.dateTime).getMonth() === now.getMonth()
        );
      case 'thisYear':
        return data.filter(
          (complaint) =>
            new Date(complaint.dateTime).getFullYear() === now.getFullYear()
        );
      case 'pending':
        return data.filter((complaint) => complaint.status === 'Pending');
      case 'resolved':
        return data.filter((complaint) => complaint.status === 'Resolved');
      default:
        return data;
    }
  }

  openModal(content: any, complaint: Complaint): void {
    this.selectedComplaint = complaint;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  acknowledgeOrResolve(): void {
    if (this.selectedComplaint) {
      this.selectedComplaint.status = 'Resolved';
      this.http
        .put(
          `http://localhost:3000/complaints/${this.selectedComplaint.id}`,
          this.selectedComplaint
        )
        .subscribe(() => {
          this.loadComplaints();
          this.modalService.dismissAll();
        });
    }
  }

  sendEmail(): void {
    if (this.selectedComplaint) {
      console.log(`Sending email to ${this.selectedComplaint.email}`);
    }
  }

  totalPages(): number {
    return Math.ceil(this.totalComplaints / this.pageSize);
  }

  pageNumbers(): number[] {
    const totalPages = this.totalPages();
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }
}
