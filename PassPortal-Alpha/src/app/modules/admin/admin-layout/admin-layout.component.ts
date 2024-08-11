
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './../../../components/breadcrumb/breadcrumb.component';
import { Component } from '@angular/core';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    CommonModule,
    RouterModule,
    AdminNavbarComponent,
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css',
})
export class AdminLayoutComponent {}
