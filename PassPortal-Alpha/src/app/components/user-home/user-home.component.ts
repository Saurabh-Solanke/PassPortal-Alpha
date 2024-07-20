import { UserNavbarComponent } from './../user-navbar/user-navbar.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [UserNavbarComponent],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent {

}
