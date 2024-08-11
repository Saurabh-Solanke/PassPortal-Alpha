export interface AddressDetails {
    present_house_street: string;
    present_town: string;
    present_state: string;
    present_district: string;
    present_police_station: string; 
    pin: string;
    mobile_number: string;
    telephone_number?: string;
    email: string;
    same_address: boolean;
    permanent_house_street: string;
    permanent_town: string;
    permanent_state: string;
    permanent_district: string;
    permanent_police_station: string;
    permanent_pin: string;
}
