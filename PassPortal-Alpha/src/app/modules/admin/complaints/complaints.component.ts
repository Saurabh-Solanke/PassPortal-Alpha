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

  constructor(private http: HttpClient, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadComplaints();
  }

  loadComplaints(): void {
    this.http
      .get<Complaint[]>(
        'http://localhost:3000/complaints?_sort=dateTime&_order=desc'
      )
      .subscribe((data) => {
        this.totalComplaints = data.length;
        this.complaints$ = of(
          data.slice((this.page - 1) * this.pageSize, this.page * this.pageSize)
        );
      });
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
}
