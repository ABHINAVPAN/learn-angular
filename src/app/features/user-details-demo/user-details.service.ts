import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface UserDetails {
  firstName: string;
  lastName: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class UserDetailsService {
  private readonly userDetailsSubject = new Subject<UserDetails>();

  readonly userDetails$ = this.userDetailsSubject.asObservable();

  sendUserDetails(userDetails: UserDetails): void {
    this.userDetailsSubject.next(userDetails);
  }
}