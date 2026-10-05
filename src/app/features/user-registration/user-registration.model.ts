export interface Registration {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  course: string;
  registeredAt: string;
}

export type RegistrationPayload = Pick<Registration, 'firstName' | 'lastName' | 'email' | 'phone' | 'course'>;