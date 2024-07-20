import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NewPassportComponent } from './components/new-passport/new-passport.component';
import { RenewalPassportComponent } from './components/renewal-passport/renewal-passport.component';
import { HistoryComponent } from './components/history/history.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { FaqComponent } from './components/faq/faq.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent, data: { breadcrumb: 'Home' } },
  { path: 'login', component: LoginComponent, data: { breadcrumb: 'Login' } },
  {
    path: 'signup',
    component: SignupComponent,
    data: { breadcrumb: 'Sign Up' },
  },
  {
    path: 'user-home',
    component: UserHomeComponent,
    data: { breadcrumb: 'User Home' },
  },
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
  {
    path: '**',
    component: PageNotFoundComponent,
    data: { breadcrumb: 'Page Not Found' },
  },
];
