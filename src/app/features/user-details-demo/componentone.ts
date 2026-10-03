import { Component, inject } from '@angular/core';
import { UserDetails, UserDetailsService } from './user-details.service';

@Component({
  selector: 'app-component-one',
  standalone: true,
  templateUrl: './componentone.html',
  styleUrl: './componentone.css',
})
export class ComponentOne {
  private readonly userDetailsService = inject(UserDetailsService);

  send(firstName: string, lastName: string, email: string): void {
    const userDetails: UserDetails = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
    };

    if (userDetails.firstName && userDetails.lastName && userDetails.email) {
      this.userDetailsService.sendUserDetails(userDetails);
    }
  }
}
