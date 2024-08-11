export interface FamilyDetails {
  father_given_name: string;
  father_surname: string;
  mother_given_name: string;
  mother_surname: string;
  minor_or_adult: 'minor' | 'adult';
  legal_guardian_given_name?: string;
  legal_guardian_surname?: string;
  father_passport_number?: string;
  father_nationality?: string;
  mother_passport_number?: string;
  mother_nationality?: string;
  add_guardian_details: boolean;
  spouse_given_name?: string;
  spouse_surname?: string;
}
