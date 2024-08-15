import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PassportApplyService } from '../../../service/passport-apply.service';
import { INewPassportForm } from '../../../interfaces/INewPassportForm';
import { IReNewForm } from '../../../interfaces/IReNewForm';
import { HttpClientModule } from '@angular/common/http';
import { UserNavbarComponent } from '../user-navbar/user-navbar.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { BreadcrumbComponent } from '../../breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-track-status',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    CommonModule,
    UserNavbarComponent,
    HttpClientModule,
    ToastModule,
    BreadcrumbComponent,
  ],
  templateUrl: './track-status.component.html',
  providers: [PassportApplyService, MessageService],
  styleUrls: ['./track-status.component.css'],
})
export class TrackStatusComponent implements OnInit {
  trackForm: FormGroup = <FormGroup>{};
  isUserPassportExist: Boolean = false;
  passportData!: INewPassportForm[] | IReNewForm[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: PassportApplyService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.trackForm = this.InItForm();
  }

  InItForm = (): FormGroup => {
    return this.fb.group({
      applicationType: ['', Validators.required],
      passportNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
      dob: ['', Validators.required],
    });
  };

  handleSubmit(): void {
    if (this.trackForm.valid) {
      this.ValidateUserExist();
    } else {
      this.trackForm.markAllAsTouched();
    }
  }

  ValidateUserExist = () => {
    this.service.GetAllPassportData().subscribe((data) => {
      this.passportData = data;
      let isPassport = data.some(
        (x) =>
          x.passportNumber == this.trackForm.get('passportNumber')?.value &&
          x.applicantForm.dob == this.trackForm.get('dob')?.value
      );
      console.log(`Passport exists: ${isPassport}`); // Debug log
      this.ShowAlert(isPassport);
    });
  };

  ShowAlert = (isPassport: Boolean) => {
    if (isPassport) {
      console.log('Im here');
      this.messageService.add({
        severity: 'success',
        summary: 'Application found',
        detail: 'You can track its status',
        life: 3000,
      });
      this.isUserPassportExist = true;
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Passport does not exist',
        detail: 'Please enter correct details',
        life: 3000,
      });
    }
  };
}
