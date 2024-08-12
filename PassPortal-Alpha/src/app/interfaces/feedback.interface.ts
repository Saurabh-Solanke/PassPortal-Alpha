export interface Feedback {
  id: number;
  email: string;
  subject: string;
  dateTime: Date;
  message: string;
  status: 'Pending' | 'Acknowledged';
}
