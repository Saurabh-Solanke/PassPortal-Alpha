import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  imports: [HttpClientModule, CommonModule, DatePipe], // Add CommonModule here
  providers: [DatePipe],
})
export class AdminDashboardComponent implements OnInit {
  totalClients = 0;
  activeClients = 0;
  disabledClients = 0;
  complaintsData: any[] = [];
  feedbackData: any[] = [];

  // New properties for display
  resolvedComplaintsCount = 0;
  pendingComplaintsCount = 0;
  acknowledgedFeedbacksCount = 0;
  pendingFeedbacksCount = 0;

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.http.get<any[]>(`${this.apiUrl}/users`).subscribe(
      (users) => {
        this.totalClients = users.filter(
          (user) => user.role === 'Client'
        ).length;
        this.activeClients = users.filter(
          (user) => user.role === 'Client' && user.accountStatus === 'Active'
        ).length;
        this.disabledClients = users.filter(
          (user) => user.role === 'Client' && user.accountStatus === 'Disabled'
        ).length;

        this.http.get<any[]>(`${this.apiUrl}/complaints`).subscribe(
          (complaints) => {
            this.complaintsData = [
              {
                status: 'Resolved',
                count: complaints.filter((c) => c.status === 'Resolved').length,
              },
              {
                status: 'Pending',
                count: complaints.filter((c) => c.status === 'Pending').length,
              },
            ];

            // Update new properties
            this.resolvedComplaintsCount =
              this.complaintsData.find((c) => c.status === 'Resolved')?.count ||
              0;
            this.pendingComplaintsCount =
              this.complaintsData.find((c) => c.status === 'Pending')?.count ||
              0;

            this.http.get<any[]>(`${this.apiUrl}/feedbacks`).subscribe(
              (feedbacks) => {
                this.feedbackData = [
                  {
                    status: 'Acknowledged',
                    count: feedbacks.filter((f) => f.status === 'Acknowledged')
                      .length,
                  },
                  {
                    status: 'Pending',
                    count: feedbacks.filter((f) => f.status === 'Pending')
                      .length,
                  },
                ];

                // Update new properties
                this.acknowledgedFeedbacksCount =
                  this.feedbackData.find((f) => f.status === 'Acknowledged')
                    ?.count || 0;
                this.pendingFeedbacksCount =
                  this.feedbackData.find((f) => f.status === 'Pending')
                    ?.count || 0;

                this.createCharts();
              },
              (error) => {
                console.error('Error fetching feedback data:', error);
              }
            );
          },
          (error) => {
            console.error('Error fetching complaints data:', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching users data:', error);
      }
    );
  }

  createCharts() {
    Chart.register(...registerables);

    new Chart('userChart', {
      type: 'doughnut',
      data: {
        labels: ['Active Clients', 'Disabled Clients'],
        datasets: [
          {
            label: 'Clients Status',
            data: [this.activeClients, this.disabledClients],
            backgroundColor: ['#4a154b', '#df6404'],
          },
        ],
      },
    });

    new Chart('complaintsChart', {
      type: 'bar',
      data: {
        labels: this.complaintsData.map((c) => c.status),
        datasets: [
          {
            label: 'Complaints Count',
            data: this.complaintsData.map((c) => c.count),
            backgroundColor: ['#4a154b', '#df6404'],
          },
        ],
      },
    });

    new Chart('feedbacksChart', {
      type: 'bar',
      data: {
        labels: this.feedbackData.map((f) => f.status),
        datasets: [
          {
            label: 'Feedbacks Count',
            data: this.feedbackData.map((f) => f.count),
            backgroundColor: ['#4a154b', '#df6404'],
          },
        ],
      },
    });
  }

}
