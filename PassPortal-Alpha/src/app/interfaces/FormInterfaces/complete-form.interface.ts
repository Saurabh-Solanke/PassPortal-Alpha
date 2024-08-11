// complete-form.interface.ts
import { ApplicantDetails } from './applicant-details.interface';
import { AddressDetails } from './address-details.interface';
import { OtherDetails } from './other-details.interface';
import { FamilyDetails } from './family-details.interface';
import { Payment } from './payment.interface';
import { ServiceRequired } from './service-required.interface';
import { SelfDeclaration } from './self-declaration.interface';
import { EmergencyContact } from './emergency-contact.interface';

export interface CompleteForm {
  formId: number;
  formStatus: string;
  username: string;
  payment: Payment;
  createdDate: Date;
  applicantDetails: ApplicantDetails;
  addressDetails: AddressDetails;
  otherDetails: OtherDetails;
  familyDetails: FamilyDetails;
  serviceRequired: ServiceRequired;
  selfDeclaration: SelfDeclaration;
  emergencyContact: EmergencyContact;
}
