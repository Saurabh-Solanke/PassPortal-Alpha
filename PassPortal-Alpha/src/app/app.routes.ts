import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ServiceRequiredComponent } from './components/user/new-passport-form/service-required/service-required.component';
import { ApplicantDetailsComponent } from './components/user/new-passport-form/applicant-details/applicant-details.component';
import { FamilyDetailsComponent } from './components/user/new-passport-form/family-details/family-details.component';
import { AddressDetailsComponent } from './components/user/new-passport-form/address-details/address-details.component';
import { EmergencyContactComponent } from './components/user/new-passport-form/emergency-contact/emergency-contact.component';
import { OtherDetailsComponent } from './components/user/new-passport-form/other-details/other-details.component';
import { SelfDeclarationComponent } from './components/user/new-passport-form/self-declaration/self-declaration.component';
import { PaymentComponent } from './components/user/new-passport-form/payment/payment.component';

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
    loadChildren: () =>
      import('./components/user/user.routes').then((m) => m.USER_ROUTES),
    data: { breadcrumb: 'Home' },
  },
  //remove later
  {
    path: 'form1',
    component: ServiceRequiredComponent,
    data: { breadcrumb: 'Service Required' },
  },
  {
    path: 'form2',
    component: ApplicantDetailsComponent,
    data: { breadcrumb: 'Applicant Details' },
  },
  {
    path: 'form3',
    component: FamilyDetailsComponent,
    data: { breadcrumb: 'Family Details' },
  },
  {
    path: 'form4',
    component: AddressDetailsComponent,
    data: { breadcrumb: 'Address Details' },
  },
  {
    path: 'form5',
    component: EmergencyContactComponent,
    data: { breadcrumb: 'Emergency Contact' },
  },
  {
    path: 'form6',
    component: OtherDetailsComponent,
    data: { breadcrumb: 'Other Details' },
  },
  {
    path: 'form7',
    component: SelfDeclarationComponent,
    data: { breadcrumb: 'Self Declaration' },
  },
  {
    path: 'form8',
    component: PaymentComponent,
    data: { breadcrumb: 'Payment' },
  },
  //
  {
    path: '**',
    component: PageNotFoundComponent,
    data: { breadcrumb: 'Page Not Found' },
  },
];
