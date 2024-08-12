import { Component, OnInit } from '@angular/core';
import { HttpClient ,HttpClientModule} from '@angular/common/http';
import { User } from '../../../interfaces/user.interface'; 
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  imports: [CommonModule,HttpClientModule], 
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  displayedUsers: User[] = [];
  page = 1;
  pageSize = 6; // Show 6 entries per page
  totalUsers = 0;
  filterCriteria = 'all';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.http.get<User[]>('http://localhost:3000/users').subscribe((data) => {
      console.log(data);
      const filteredData = this.applyFilterCriteria(data);
      this.users = filteredData;
      this.totalUsers = filteredData.length;
      this.updateDisplayedUsers();
    });
  }

  applyFilter(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.filterCriteria = selectElement.value;
    this.page = 1; // Reset to first page after filter change
    this.loadUsers();
  }

  applyFilterCriteria(data: User[]): User[] {
    return data.filter(
      (user) =>
        user.role === 'Client' &&
        (this.filterCriteria === 'all' ||
          user.accountStatus.toLowerCase() === this.filterCriteria)
    );
  }

  updateDisplayedUsers(): void {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.displayedUsers = this.users.slice(start, end);
  }

  changeStatus(user: User, newStatus: 'Active' | 'Disabled'): void {
    user.accountStatus = newStatus;
    // Update status on the server
    this.http
      .put(`http://localhost:3000/users/${user.id}`, user)
      .subscribe(() => {
        this.loadUsers(); // Reload users after update
      });
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.updateDisplayedUsers();
    }
  }

  nextPage(): void {
    if (this.page * this.pageSize < this.totalUsers) {
      this.page++;
      this.updateDisplayedUsers();
    }
  }

  goToPage(pageNumber: number): void {
    if (pageNumber > 0 && pageNumber <= this.totalPages()) {
      this.page = pageNumber;
      this.updateDisplayedUsers();
    }
  }

  totalPages(): number {
    return Math.ceil(this.totalUsers / this.pageSize);
  }

  pageNumbers(): number[] {
    const pageCount = this.totalPages();
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }
}
