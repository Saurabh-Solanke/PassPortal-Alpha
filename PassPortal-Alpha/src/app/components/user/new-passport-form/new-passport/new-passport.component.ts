import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceRequiredComponent } from '../service-required/service-required.component';
import { ApplicantDetailsComponent } from '../applicant-details/applicant-details.component';
import { FamilyDetailsComponent } from '../family-details/family-details.component';
import { AddressDetailsComponent } from '../address-details/address-details.component';
import { EmergencyContactComponent } from '../emergency-contact/emergency-contact.component';
import { OtherDetailsComponent } from '../other-details/other-details.component';
import { SelfDeclarationComponent } from '../self-declaration/self-declaration.component';
import { PaymentComponent } from '../payment/payment.component';

@Component({
  selector: 'app-new-passport',
  templateUrl: './new-passport.component.html',
  styleUrls: ['./new-passport.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatStepperModule,
    MatInputModule,
    ReactiveFormsModule,
    ServiceRequiredComponent,
    ApplicantDetailsComponent,
    FamilyDetailsComponent,
    AddressDetailsComponent,
    EmergencyContactComponent,
    OtherDetailsComponent,
    SelfDeclarationComponent,
    PaymentComponent,
  ],
})
export class NewPassportComponent {
  isLinear = true;
  serviceRequiredFormGroup: FormGroup;
  applicantDetailsFormGroup: FormGroup;
  familyDetailsFormGroup: FormGroup;
  addressDetailsFormGroup: FormGroup;
  emergencyContactFormGroup: FormGroup;
  otherDetailsFormGroup: FormGroup;
  selfDeclarationFormGroup: FormGroup;
  paymentFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this.serviceRequiredFormGroup = this._formBuilder.group({});
    this.applicantDetailsFormGroup = this._formBuilder.group({});
    this.familyDetailsFormGroup = this._formBuilder.group({});
    this.addressDetailsFormGroup = this._formBuilder.group({});
    this.emergencyContactFormGroup = this._formBuilder.group({});
    this.otherDetailsFormGroup = this._formBuilder.group({});
    this.selfDeclarationFormGroup = this._formBuilder.group({});
    this.paymentFormGroup = this._formBuilder.group({});
  }
}
