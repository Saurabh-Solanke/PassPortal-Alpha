import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PassportApplyService } from '../../../service/passport-apply.service';
import { INewPassportForm } from '../../../interfaces/INewPassportForm';
import { IReNewForm } from '../../../interfaces/IReNewForm';
import { Router } from '@angular/router';
import { Payment } from '../../../constants/Payment';
import { UserNavbarComponent } from '../user-navbar/user-navbar.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    UserNavbarComponent,
    HttpClientModule,
    ToastModule,
  ],
  providers: [PassportApplyService, MessageService],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup = <FormGroup>{};
  trackForm: FormGroup = <FormGroup>{};
  passportData!: INewPassportForm[] | IReNewForm[];
  isUserPassportExist: Boolean = false;
  router = inject(Router);
  filteredPassport: IReNewForm | INewPassportForm | undefined = <IReNewForm>{};

  constructor(
    private fb: FormBuilder,
    private service: PassportApplyService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.trackForm = this.InItTrackForm();
    this.paymentForm = this.InItPaymentForm();
  }

  InItTrackForm = (): FormGroup => {
    return this.fb.group({
      applicationType: ['', Validators.required],
      passportNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
      dob: ['', Validators.required],
    });
  };

  InItPaymentForm = (): FormGroup => {
    return this.fb.group({
      paymentType: ['', Validators.required],
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      cardNumber: ['', [Validators.required]],
      expiryDate: ['', Validators.required],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
      amount: [{ value: 0, disabled: true }],
    });
  };

  ProceedToPay(): void {
    if (this.trackForm.valid) {
      this.ValidateUserExist();
    } else {
      this.trackForm.markAllAsTouched();
    }
  }

  MakePayment = () => {
    if (this.paymentForm.valid) {
      const expiryDate = new Date(this.paymentForm.get('expiryDate')?.value);
      const today = new Date();

      if (expiryDate < today) {
        this.messageService.add({
          severity: 'error',
          summary: 'Card Expired',
          detail:
            'The card you are using has expired. Please use a valid card.',
        });
        return;
      }

      const transactionId = this.generateTransactionId();
      const timestamp = new Date().toISOString();

      this.messageService.add({
        severity: 'success',
        summary: 'Payment Successful',
        detail: `Transaction ID: ${transactionId}\nTimestamp: ${timestamp}`,
      });

      this.UpdateUserPayment(transactionId, timestamp);
      setTimeout(() => this.router.navigate(['user-home']), 2000);
    } else {
      this.paymentForm.markAllAsTouched();
    }
  };

  ValidateUserExist = () => {
    this.service.GetAllPassportData().subscribe((data) => {
      this.passportData = data;
      this.filteredPassport = data.find(
        (x) =>
          x.passportNumber == this.trackForm.get('passportNumber')?.value &&
          x.applicantForm.dob == this.trackForm.get('dob')?.value
      );

      if (
        this.filteredPassport &&
        this.filteredPassport.paymentStatus !== Payment.Paid
      ) {
        this.ShowAlert(this.filteredPassport);
        this.SetPaymentAmount(this.filteredPassport);
      } else if (
        this.filteredPassport &&
        this.filteredPassport.paymentStatus === Payment.Paid
      ) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Payment Already Made',
          detail:
            'This application has already been paid for. No further payment is required.',
        });
        this.isUserPassportExist = false; 
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Passport Not Found',
          detail: 'Passport does not exist. Please enter correct details.',
        });
      }

      if (this.filteredPassport) {
        this.messageService.add({
          severity: 'info',
          summary: 'Application Type',
          detail: `This is a ${this.filteredPassport.serviceRequestForm.applicationType} application.`,
        });
      }
    });
  };

  SetPaymentAmount = (passport: INewPassportForm | IReNewForm) => {
    let amount = 0;
    if (passport.serviceRequestForm.applicationType === 'normal') {
      amount =
        passport.serviceRequestForm.passportPages === 'pages36' ? 1500 : 2500;
    } else if (passport.serviceRequestForm.applicationType === 'tatkal') {
      amount =
        passport.serviceRequestForm.passportPages === 'pages36' ? 3000 : 4500;
    }
    this.paymentForm.get('amount')?.setValue(amount);
  };

  ShowAlert = (isPassport: INewPassportForm | undefined) => {
    if (isPassport) {
      this.messageService.add({
        severity: 'success',
        summary: 'Passport Found',
        detail: 'Select payment options',
      });
      this.isUserPassportExist = true;
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Passport does not exist. Please enter correct details',
      });
    }
  };

  UpdateUserPayment = (transactionId: string, timestamp: string) => {
    this.filteredPassport!.paymentStatus = Payment.Paid;
    this.filteredPassport!.transactionId = transactionId;
    this.filteredPassport!.transactionTimestamp = timestamp;

    this.service
      .updatePaymentStatus(
        this.filteredPassport!.id,
        this.filteredPassport,
        this.filteredPassport?.isReNew
      )
      .subscribe(() => {});
  };

  generateTransactionId(): string {
    return Math.random().toString().slice(2, 14);
  }
}
