// interfaces/new-passport-application.interface.ts

import { PassportEnums, PersonalEnums, MinorOrAdult } from '../constants/enums';

export type PanNumber = string;
export type Email = string;

export interface IServiceRequired {
  application_type: PassportEnums.ApplicationType;
  passport_booklet_type: PassportEnums.PassportBookletType;
  validity_required: PassportEnums.ValidityRequired;
}

export interface IApplicantDetails {
  given_name: string;
  surname: string;
  known_by_other_names: boolean;
  aliases?: string;
  changed_name: boolean;
  previous_name?: string;
  dob: string;
  place_of_birth: string;
  state?: string;
  district?: string;
  region_country?: string;
  gender: PersonalEnums.Gender;
  marital_status: PersonalEnums.MaritalStatus;
  citizenship: PersonalEnums.Citizenship;
  pan?: PanNumber;
  voter_id?: string;
  employment_type: string;
  organization_name?: string;
  parent_spouse_government_servant: boolean;
  education: string;
  non_ecr: boolean;
  distinguishing_mark?: string;
  aadhaar?: string;
}

export interface IFamilyDetails {
  father: { given_name: string; surname: string };
  mother: { given_name: string; surname: string };
  minor_or_adult: MinorOrAdult;
  guardian?: { given_name: string; surname: string };
  father_passport_number?: string;
  father_nationality?: string;
  mother_passport_number?: string;
  mother_nationality?: string;
  add_guardian_details: boolean;
  spouse?: { given_name: string; surname: string };
}

export interface IAddressDetails {
  present_house_street: string;
  present_town: string;
  present_state: string;
  present_district: string;
  present_police_station: string;
  pin: string;
  mobile_number: string;
  telephone_number?: string;
  email: Email;
  same_address: boolean;
  permanent_house_street: string;
  permanent_town: string;
  permanent_state: string;
  permanent_district: string;
  permanent_police_station: string;
  permanent_pin: string;
}

export interface IEmergencyContact {
  name: string;
  address: string;
  mobileNumber: string;
  telephoneNumber?: string;
  emailId?: string;
}

export interface IOtherDetails {
    criminal_proceedings_1: boolean;
    court_name_1?: string;
    case_number_1?: string;
    law_section_1?: string;
    criminal_proceedings_2: boolean;
    court_name_2?: string;
    case_number_2?: string;
    law_section_2?: string;
    criminal_proceedings_3: boolean;
    court_name_3?: string;
    case_number_3?: string;
    law_section_3?: string;
    criminal_proceedings_4: boolean;
    court_name_4?: string;
    case_number_4?: string;
    law_section_4?: string;
    criminal_convictions: boolean;
    court_name_5?: string;
    case_number_5?: string;
    conviction_date?: string;
    refused_passport_1: boolean;
    refusal_reason?: string;
    refused_passport_2: boolean;
    impounded_passport_number?: string;
    impounding_reason?: string;
    refused_passport_3: boolean;
    revoked_passport_number?: string;
    revocation_reason?: string;
    granted_citizenship_1: boolean;
    region_country_granted?: string;
    granted_citizenship_2: boolean;
    region_country_held?: string;
    granted_citizenship_3: boolean;
    surrendered_passport_number?: string;
    granted_citizenship_4: boolean;
    application_details?: string;
    application_place?: string;
    surrendered_passport_1: boolean;
    ec_no?: string;
    ec_issue_date?: string;
    issuing_authority?: string;
    return_date?: string;
    return_region?: string;
    ec_reason?: string;
    surrendered_passport_2: boolean;
    deported_details?: string;
    surrendered_passport_3: boolean;
    repatriated_details?: string;
  }
  
  export interface ISelfDeclaration {
    declaration_place: string;
    declaration_date: string;
    applicant_signature: File;
    left_hand_thumb_imp: File;
    applicant_photo: File;
  }