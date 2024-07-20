import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../footer/footer.component';
import { UserNavbarComponent } from '../user-navbar/user-navbar.component';
import { BreadcrumbComponent } from '../../breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FooterComponent,
    UserNavbarComponent,
    BreadcrumbComponent,
  ],
})
export class UserHomeComponent {
  username = 'Saurabh Solanke';
  applicationNumber = '98564';
  expectedCompletion = 3;
  profileName = 'Saurabh Solanke';
  profileEmail = 'saurabh.s@gmail.com';
  profilePhone = '+91 7770070411';

  recentActivities = [
    'Applied for a new passport on 01/06/2024',
    'Uploaded documents on 02/06/2024',
    'Scheduled appointment on 03/06/2024',
  ];

  normalPlans = [
    {
      title: 'Fresh Passport',
      description: 'Page Count 60 Fee ₹ 2000',
      link: '/new_passport',
      applicationType: 'normal',
      bookletType: '60_pages',
    },
    {
      title: 'Fresh Passport',
      description: 'Page Count 36 Fee ₹ 1500',
      link: '/new_passport',
      applicationType: 'normal',
      bookletType: '36_pages',
    },
    {
      title: 'Reissue Passport',
      description: 'Page Count 60 Fee ₹ 2000',
      link: '/renewal_passport',
      applicationType: 'normal',
      bookletType: '60_pages',
    },
    {
      title: 'Reissue Passport',
      description: 'Page Count 36 Fee ₹ 1500',
      link: '/renewal_passport',
      applicationType: 'normal',
      bookletType: '36_pages',
    },
  ];

  tatkalPlans = [
    {
      title: 'Fresh Passport',
      description: 'Page Count 60 Fee ₹ 4000',
      link: '/new_passport',
      applicationType: 'tatkal',
      bookletType: '60_pages',
    },
    {
      title: 'Fresh Passport',
      description: 'Page Count 36 Fee ₹ 3500',
      link: '/new_passport',
      applicationType: 'tatkal',
      bookletType: '36_pages',
    },
    {
      title: 'Reissue Passport',
      description: 'Page Count 60 Fee ₹ 3500',
      link: '/renewal_passport',
      applicationType: 'tatkal',
      bookletType: '60_pages',
    },
    {
      title: 'Reissue Passport',
      description: 'Page Count 36 Fee ₹ 4000',
      link: '/renewal_passport',
      applicationType: 'tatkal',
      bookletType: '36_pages',
    },
  ];
}
