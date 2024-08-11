export interface Complaint {
    id: number;
    email: string;
    subject: string;
    dateTime: Date;
    message: string;
    status: 'Pending' | 'Resolved';
  }
  
  