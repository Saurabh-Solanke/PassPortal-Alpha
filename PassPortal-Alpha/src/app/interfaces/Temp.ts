export interface TempPassport {
  passportNumber: string;
  passportStatus: string;
  paymentStatus: string;
  serviceRequestForm: {
    applicationType: string;
    passportPages: string;
    validityPeriod: string;
  };
  applicantForm: {
    applicantName: string;
    applicantSurName: string;
    aliases: string;
    changedname: string;
    dob: string;
    placeOfBirth: string;
    gender: string;
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
    userChangedName: string;
    userAliasesName: string;
  };
  feedbackForm: {
    fatherName: string;
    fatherSurname: string;
    motherName: string;
    motherSurname: string;
    legalGuardianName: string;
    legalGuardianSurname: string;
    spouseName: string;
    spouseSurname: string;
    fatherPassportNumber: string;
    fatherNationality: string;
    motherPassportNumber: string;
    motherNationality: string;
  };
  addressForm: {
    houseNumber: string;
    city: string;
    adistrict: string;
    astate: string;
    pin: string;
    mobileNumber: string;
    telephoneNumber: string;
    addressLane1: string;
  };
  emergencyForm: {
    emergencyDetailName: string;
    emergencyDetailAddress: string;
    emergencyDetailMobileNo: string;
    emergencyDetailEmail: string;
    emergencyDetailCity: string;
    emergencyDetailState: string;
  };
  questionsForm: {
    isCriminalProceedings: string;
    isWarrantSummons: string;
    isArrestWarrant: string;
    isDepartureOrder: string;
    isConviction: string;
    isPassportRefusal: string;
    isPassportImpounded: string;
    isPassportRevoked: string;
    isForeignCitizenship: string;
    isOtherPassport: string;
    isSurrenderedPassport: string;
    isRenunciation: string;
    isEmergencyCertificate: string;
    isDeported: string;
    isRepatriated: string;
  };
  declarationForm: {
    chkDeclaration: boolean;
    placeOfApply: string;
    dateOfApply: string;
    userPhoto: any; // Adjust type if needed
    userSignature: any; // Adjust type if needed
  };
}
