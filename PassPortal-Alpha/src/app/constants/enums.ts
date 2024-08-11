// constants/enums.ts

// Grouped enums for passport-related data
export namespace PassportEnums {
  export enum ApplicationType {
    Normal = 'normal',
    Tatkaal = 'tatkaal',
  }

  export enum PassportBookletType {
    Pages36 = '36_pages',
    Pages60 = '60_pages',
  }

  export enum ValidityRequired {
    TenYears = '10_years',
    UpToAge18 = 'up_to_age_18',
  }
}

// Grouped enums for personal details
export namespace PersonalEnums {
  export enum Gender {
    Male = 'male',
    Female = 'female',
    Transgender = 'transgender',
    Unknown = 'unknown', // Added a default value
  }

  export enum MaritalStatus {
    Single = 'single',
    Married = 'married',
    Divorced = 'divorced',
    WidowWidower = 'widow_widower',
    Separated = 'separated',
  }

  export enum Citizenship {
    Birth = 'birth',
    Descent = 'descent',
    RegistrationNaturalization = 'registration_naturalization',
  }
}

// Enum for minor or adult status
export enum MinorOrAdult {
  Minor = 'minor',
  Adult = 'adult',
}
