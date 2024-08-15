import { PassportStatus } from "../constants/PassportStatus";
import { Payment } from "../constants/Payment";

// Interface for Service Request Form
export interface IServiceRequestForm {
    applicationType: string;
    passportPages: string;
    validityPeriod: string;
  }
  
  // Interface for Applicant Form
  export interface IApplicantForm {
    applicantName: string;
    applicantSurName: string;
    aliases: string;
    changedname: string;
    dob: string;
    placeOfBirth: string;
    gender: string;
    userChangedName?:string;
    userAliasesName?:string;
    district: string;
    state: string;
    country: string;
    pan: string;
    voterId: string;
    maritalStatus: string;
    employmentType: string;
    organizationName: string;
    parentOrSpouseGovServant: string;
    educationQualification: string;
    nonEcrEligible: string;
    distinguishingMark: string;
    aadhaarNumber: string;
  }
  
  // Interface for Feedback Form
  export interface IFeedbackForm {
    fatherName: string;
    fatherSurname: string;
    motherName: string;
    motherSurname: string;
    legalGuardianName: string;
    legalGuardianSurname: string;
    spouseName?: string;
    spouseSurname?: string;
    fatherPassportNumber?: string;
    fatherNationality?: string;
    motherPassportNumber?: string;
    motherNationality?: string;
  }
  
  // Interface for Address Form
  export interface IAddressForm {
    houseNumber: string;
    city: string;
    adistrict: string;
    astate: string;
    pin: string;
    mobileNumber: string;
    telephoneNumber: string;
    addressLane1?: string;
  }
  
  // Interface for Emergency Form
  export interface IEmergencyForm {
    emergencyDetailName: string;
    emergencyDetailAddress: string;
    emergencyDetailMobileNo: string;
    emergencyDetailEmail: string;
    emergencyDetailCity: string;
    emergencyDetailState: string;
  }
  
  // Interface for Questions Form
  export interface IQuestionsForm {
    isCriminalProceedings: boolean;
    isWarrantSummons: boolean;
    isArrestWarrant: boolean;
    isDepartureOrder: boolean;
    isConviction: boolean;
    isPassportRefusal: boolean;
    isPassportImpounded: boolean;
    isPassportRevoked: boolean;
    isForeignCitizenship: boolean;
    isOtherPassport: boolean;
    isSurrenderedPassport: boolean;
    isRenunciation: boolean;
    isEmergencyCertificate: boolean;
    isDeported: boolean;
    isRepatriated: boolean;
  }
  
  // Interface for Declaration Form
  export interface IDeclarationForm {
    chkDeclaration: boolean;
    placeOfApply: string;
    dateOfApply: string;
    userPhoto: File | null;
    userSignature: File | null;
  }


  
// Combined Interface for All Forms
export interface INewPassportForm {
    id:string;
    submittedByUserId: string;
    passportNumber:string;
    isReNew:Boolean;
    passportStatus:PassportStatus;
    paymentStatus:Payment;
    transactionId: string;
    transactionTimestamp:string;
    serviceRequestForm: IServiceRequestForm;
    applicantForm: IApplicantForm;
    feedbackForm: IFeedbackForm;
    addressForm: IAddressForm;
    emergencyForm: IEmergencyForm;
    questionsForm: IQuestionsForm;
    declarationForm: IDeclarationForm;
  }
  