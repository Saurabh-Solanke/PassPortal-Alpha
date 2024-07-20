import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

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
    data: { breadcrumb: 'User Home' },
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: { breadcrumb: 'Page Not Found' },
  },
];
