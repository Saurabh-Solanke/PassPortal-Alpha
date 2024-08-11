import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserListComponent } from './user-list/user-list.component';
import { ComplaintsComponent } from './complaints/complaints.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        component: AdminDashboardComponent,
        data: { breadcrumb: 'Dashboard' },
      },
      {
        path: 'user-list',
        component: UserListComponent,
        data: { breadcrumb: 'User List' },
      },
      {
        path: 'complaints',
        component: ComplaintsComponent,
        data: { breadcrumb: 'Complaints' },
      },
      {
        path: 'feedback',
        component: FeedbackComponent,
        data: { breadcrumb: 'Feedback' },
      },
      {
        path: 'payment-details',
        component: PaymentDetailsComponent,
        data: { breadcrumb: 'Payment Details' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
