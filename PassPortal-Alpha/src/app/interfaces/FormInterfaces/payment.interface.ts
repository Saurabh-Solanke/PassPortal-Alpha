export interface Payment {
    payment_option: 'card' | 'upi' | 'netbanking';
    card_number?: string;
    expiry_date?: string;
    cvv?: number;
    upi_id?: string;
    account_holder_name?: string;
    account_number?: string;
    ifsc_code?: string;
    pin?: string;
    amount: number;
  }
  