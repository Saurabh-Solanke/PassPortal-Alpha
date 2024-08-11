// interfaces/complete-form.interface.ts

import {
  IServiceRequired,
  IApplicantDetails,
  IFamilyDetails,
  IAddressDetails,
  IEmergencyContact,
  IOtherDetails,
  ISelfDeclaration,
} from './new-passport-application.interface';

export interface IPayment {
  paymentMethod: string;
  paymentStatus: string;
  transactionId: string;
  amount: number;
}

export interface ICompleteForm {
  formId: string;
  formStatus: string;
  username: string;
  payment: IPayment;
  createdDate: Date;
  applicantDetails: IApplicantDetails;
  addressDetails: IAddressDetails;
  otherDetails: IOtherDetails;
  familyDetails: IFamilyDetails;
  serviceRequired: IServiceRequired;
  selfDeclaration: ISelfDeclaration;
  emergencyContact: IEmergencyContact;
}
