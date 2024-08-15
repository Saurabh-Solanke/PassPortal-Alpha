import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { formTabs } from '../../../constants/form-tab';
import {
  INewPassportForm,
  IAddressForm,
  IApplicantForm,
  IDeclarationForm,
  IEmergencyForm,
  IFeedbackForm,
  IQuestionsForm,
  IServiceRequestForm,
} from '../../../interfaces/INewPassportForm';
import { PassportApplyService } from '../../../service/passport-apply.service';
import { CommonModule } from '@angular/common';
import { PassportStatus } from '../../../constants/PassportStatus';
import { Payment } from '../../../constants/Payment';
import { UserService } from '../../../service/user.service';
import { UserNavbarComponent } from '../user-navbar/user-navbar.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-new-passport-apply',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    UserNavbarComponent,
    HttpClientModule,
  ],
  providers: [PassportApplyService, UserService],
  templateUrl: './new-passport-apply.component.html',
  styleUrl: './new-passport-apply.component.css',
})
export class NewPassportApplyComponent {
  serviceRequestForm!: FormGroup;
  applicantForm!: FormGroup;
  feedbackForm!: FormGroup;
  addressForm!: FormGroup;
  emergencyForm!: FormGroup;
  questionsForm!: FormGroup;
  declarationForm!: FormGroup;

  districts: string[] = [
    'Ahmednagar',
    'Akola',
    'Amravati',
    'Aurangabad',
    'Beed',
    'Bhandara',
    'Buldhana',
    'Chandrapur',
    'Dhule',
    'Gadchiroli',
    'Gondia',
    'Hingoli',
    'Jalgaon',
    'Jalna',
    'Kolhapur',
    'Latur',
    'Mumbai City',
    'Mumbai Suburban',
    'Nagpur',
    'Nanded',
    'Nandurbar',
    'Nashik',
    'Osmanabad',
    'Palghar',
    'Parbhani',
    'Pune',
    'Raigad',
    'Ratnagiri',
    'Sangli',
    'Satara',
    'Sindhudurg',
    'Solapur',
    'Thane',
    'Wardha',
    'Washim',
    'Yavatmal',
  ];

  states: string[] = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
  ];
  countries: string[] = [
    'United States',
    'China',
    'India',
    'Brazil',
    'Nigeria',
    'United Kingdom',
    'Germany',
    'France',
    'Japan',
    'Canada',
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: PassportApplyService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.serviceRequestForm = this.createServiceRequestForm();
    this.applicantForm = this.createApplicantForm();
    this.feedbackForm = this.createFeedbackForm();
    this.addressForm = this.createAddressForm();
    this.emergencyForm = this.createEmergencyForm();
    this.questionsForm = this.createQuestionsForm();
    this.declarationForm = this.createDeclarationForm();
  }

  private createServiceRequestForm(): FormGroup {
    return this.fb.group({
      applicationType: ['', Validators.required],
      passportPages: ['', Validators.required],
      validityPeriod: ['', Validators.required],
    });
  }

  private createApplicantForm(): FormGroup {
    return this.fb.group({
      applicantName: [
        '',
        [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)],
      ],
      applicantSurName: [
        '',
        [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)],
      ],
      aliases: ['', Validators.required],
      changedname: ['', Validators.required],
      dob: ['', Validators.required],
      placeOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      district: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      pan: ['', [Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)]],
      voterId: [''],
      maritalStatus: ['', Validators.required],
      employmentType: ['', Validators.required],
      organizationName: [''],
      parentOrSpouseGovServant: ['', Validators.required],
      educationQualification: ['', Validators.required],
      nonEcrEligible: ['', Validators.required],
      distinguishingMark: ['', Validators.required],
      aadhaarNumber: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{12}$/)],
      ],
      userChangedName: [''],
      userAliasesName: [''],
    });
  }

  private createFeedbackForm(): FormGroup {
    return this.fb.group({
      fatherName: ['', [Validators.required]],
      fatherSurname: ['', [Validators.required]],
      motherName: ['', [Validators.required]],
      motherSurname: ['', [Validators.required]],
      legalGuardianName: ['', [Validators.required]],
      legalGuardianSurname: ['', [Validators.required]],
      spouseName: [''],
      spouseSurname: [''],
      fatherPassportNumber: [''],
      fatherNationality: [''],
      motherPassportNumber: [''],
      motherNationality: [''],
    });
  }

  private createAddressForm(): FormGroup {
    return this.fb.group({
      houseNumber: ['', Validators.required],
      city: ['', Validators.required],
      adistrict: ['', Validators.required],
      astate: ['', Validators.required],
      pin: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      telephoneNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      addressLane1: [''],
    });
  }

  private createEmergencyForm(): FormGroup {
    return this.fb.group({
      emergencyDetailName: ['', Validators.required],
      emergencyDetailAddress: ['', Validators.required],
      emergencyDetailMobileNo: [
        '',
        [Validators.required, Validators.pattern(/^\d{10}$/)],
      ],
      emergencyDetailEmail: ['', [Validators.required, Validators.email]],
      emergencyDetailCity: ['', Validators.required],
      emergencyDetailState: ['', Validators.required],
    });
  }

  private createQuestionsForm(): FormGroup {
    return this.fb.group({
      isCriminalProceedings: ['', Validators.required],
      isWarrantSummons: ['', Validators.required],
      isArrestWarrant: ['', Validators.required],
      isDepartureOrder: ['', Validators.required],
      isConviction: ['', Validators.required],
      isPassportRefusal: ['', Validators.required],
      isPassportImpounded: ['', Validators.required],
      isPassportRevoked: ['', Validators.required],
      isForeignCitizenship: ['', Validators.required],
      isOtherPassport: ['', Validators.required],
      isSurrenderedPassport: ['', Validators.required],
      isRenunciation: ['', Validators.required],
      isEmergencyCertificate: ['', Validators.required],
      isDeported: ['', Validators.required],
      isRepatriated: ['', Validators.required],
    });
  }

  private createDeclarationForm(): FormGroup {
    return this.fb.group({
      chkDeclaration: [false, Validators.requiredTrue],
      placeOfApply: ['', Validators.required],
      dateOfApply: ['', Validators.required],
      userPhoto: [null, Validators.required],
      userSignature: [null, Validators.required],
    });
  }

  onFileChange(event: Event, controlName: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.declarationForm.patchValue({
        [controlName]: input.files[0],
      });
      this.declarationForm.get(controlName)?.markAsTouched();
      this.declarationForm.get(controlName)?.updateValueAndValidity();
    }
  }

  GenerateNewPassportNumber = () => {
    let passportNumber = Math.floor(Math.random() * 10000000000).toString();

    while (passportNumber.length < 10) {
      passportNumber = '0' + passportNumber;
    }
    return passportNumber;
  };
  generateRandomID = () => {
    let passportNumber = Math.floor(Math.random() * 10000000000).toString();

    while (passportNumber.length < 4) {
      passportNumber = '0' + passportNumber;
    }
    return passportNumber;
  };

  onSubmit(): void {
    if (this.declarationForm.invalid) {
      this.declarationForm.markAllAsTouched();
    }
    if (
      this.serviceRequestForm.valid &&
      this.emergencyForm.valid &&
      this.declarationForm.valid &&
      this.questionsForm.valid &&
      this.applicantForm.valid &&
      this.addressForm.valid &&
      this.feedbackForm.valid
    ) {
      const passportAppNumber = this.GenerateNewPassportNumber();
      const _id = this.generateRandomID();
      const userId = this.fetchUserId();
      const NewPassportApply: INewPassportForm = {
        id: _id,
        submittedByUserId: userId,
        passportNumber: passportAppNumber,
        passportStatus: PassportStatus.Applied,
        paymentStatus: Payment.Unpaid,
        transactionId: '',
        transactionTimestamp: '',
        isReNew: false,
        serviceRequestForm: this.serviceRequestForm
          .value as IServiceRequestForm,
        applicantForm: this.applicantForm.value as IApplicantForm,
        feedbackForm: this.feedbackForm.value as IFeedbackForm,
        addressForm: this.addressForm.value as IAddressForm,
        emergencyForm: this.emergencyForm.value as IEmergencyForm,
        questionsForm: this.questionsForm.value as IQuestionsForm,
        declarationForm: this.declarationForm.value as IDeclarationForm,
      };
      Swal.fire({
        title: 'Application Submitted',
        text: `Your application has been submitted successfully!  Make payment for application no ${passportAppNumber}`,
        icon: 'success',
      }).then((res) => {
        if (res.isConfirmed) {
          this.service
            .SaveNewPassportForm(NewPassportApply)
            .subscribe((data) => {
              this.router.navigate(['user']);
            });
        }
      });
    } else {
      Swal.fire({
        title: 'In-complete form fields.',
        text: 'Please fill the remaining form fields.',
        icon: 'info',
      });
    }
  }

  private navigateToNextTabIfValid(form: FormGroup, tabId: string): void {
    let activeTab = document.querySelector('.nav-tabs .nav-link.active');
    if (activeTab?.id.toString() === tabId && form.invalid) {
      form.markAllAsTouched();
      return;
    }
    if (activeTab) {
      let nextTab = activeTab.parentElement?.nextElementSibling;
      if (nextTab) {
        (nextTab.querySelector('.nav-link') as HTMLElement).click();
      }
    }
  }

  showNextTab(index: number): void {
    switch (index) {
      case 1:
        this.navigateToNextTabIfValid(
          this.serviceRequestForm,
          formTabs.servicetab
        );
        break;
      case 2:
        this.navigateToNextTabIfValid(
          this.applicantForm,
          formTabs.applicanttab
        );
        break;
      case 3:
        this.navigateToNextTabIfValid(this.feedbackForm, formTabs.familytab);
        break;
      case 4:
        this.navigateToNextTabIfValid(
          this.addressForm,
          formTabs.residentialtab
        );
        break;
      case 5:
        this.navigateToNextTabIfValid(
          this.emergencyForm,
          formTabs.emergencytab
        );
        break;
      case 6:
        this.navigateToNextTabIfValid(this.questionsForm, formTabs.othertab);
        break;
      case 7:
        this.navigateToNextTabIfValid(
          this.declarationForm,
          formTabs.declarationtab
        );
        break;
      default:
        break;
    }
  }
  showPreviousTab() {
    let activeTab = document.querySelector('.nav-tabs .nav-link.active');
    if (activeTab) {
      let previousTab = activeTab.parentElement?.previousElementSibling;
      if (previousTab) {
        (previousTab.querySelector('.nav-link') as HTMLElement).click();
      }
    }
  }

  fetchUserId(): string {
    return localStorage.getItem('loggedInUserId') || '';
  }
}
