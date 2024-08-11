export interface ApplicantDetails {
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
    gender: 'male' | 'female' | 'transgender';
    marital_status: 'single' | 'married' | 'divorced' | 'widow_widower' | 'separated';
    citizenship: 'birth' | 'descent' | 'registration_naturalization';
    pan?: string;
    voter_id?: string;
    employment_type: string;
    organization_name?: string;
    parent_spouse_government_servant: boolean;
    education: string;
    non_ecr: boolean;
    distinguishing_mark?: string;
    aadhaar?: string;
  }
  