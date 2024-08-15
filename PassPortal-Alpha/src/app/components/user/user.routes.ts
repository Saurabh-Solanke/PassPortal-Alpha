import { NewPassportComponent } from './new-passport-form/new-passport/new-passport.component';
import { Routes } from '@angular/router';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { RenewalPassportComponent } from './renewal-passport/renewal-passport.component';
import { HistoryComponent } from './history/history.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { FaqComponent } from './faq/faq.component';
import { NewPassportApplyComponent } from './new-passport-apply/new-passport-apply.component';
import { RenewalPassportApplyComponent } from './renewal-passport-apply/renewal-passport-apply.component';

export const USER_ROUTES: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: '', component: UserHomeComponent, data: { breadcrumb: 'Home' } },
      {
        path: 'new-pass',
        component: NewPassportComponent,
        data: { breadcrumb: 'New Passport' },
      },
      {
        path: 'renewal-pass',
        component: RenewalPassportComponent,
        data: { breadcrumb: 'Renewal Passport' },
      },
      {
        path: 'history',
        component: HistoryComponent,
        data: { breadcrumb: 'History' },
      },
      {
        path: 'feedback',
        component: FeedbackComponent,
        data: { breadcrumb: 'Feedback' },
      },
      { path: 'faq', component: FaqComponent, data: { breadcrumb: 'FAQ' } },

      {
        path: 'new-passport',
        component: NewPassportApplyComponent,
        data: { breadcrumb: 'New Passport Application' },
      },
      {
        path: 'renewal-passport',
        component: RenewalPassportApplyComponent,
        data: { breadcrumb: 'Renewal Passport Application' },
      },
    ],
  },
];
