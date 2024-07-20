import { Routes } from '@angular/router';
import { UserHomeComponent } from './user-home/user-home.component';
import { NewPassportComponent } from './new-passport/new-passport.component';
import { RenewalPassportComponent } from './renewal-passport/renewal-passport.component';
import { HistoryComponent } from './history/history.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { FaqComponent } from './faq/faq.component';
import { UserNavbarComponent } from './user-navbar/user-navbar.component';

export const USER_ROUTES: Routes = [
  {
    path: '',
    component: UserHomeComponent,
    children: [
      { path: '', component: UserNavbarComponent, outlet: 'navbar' },
      {
        path: 'new-passport',
        component: NewPassportComponent,
        data: { breadcrumb: 'New Passport' },
      },
      {
        path: 'renewal-passport',
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
    ],
  },
];
