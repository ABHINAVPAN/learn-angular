import {
  Component,
  DestroyRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { SubSink } from 'subsink';
import { UserDetails, UserDetailsService } from './user-details.service';

export type CleanupStrategy = 'subsink' | 'subscription-array' | 'take-until-destroyed';

@Component({
  selector: 'app-component-two',
  standalone: true,
  templateUrl: './componenttwo.html',
  styleUrl: './componenttwo.css',
})
export class ComponentTwo implements OnChanges, OnDestroy {
  @Input({ required: true }) cleanup: CleanupStrategy = 'subsink';

  userDetails: UserDetails | null = null;

  private readonly userDetailsService = inject(UserDetailsService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly subSink = new SubSink();
  private subscriptions: Subscription[] = [];
  private strategyChanged$ = new Subject<void>();

  get cleanupLabel(): string {
    switch (this.cleanup) {
      case 'subsink':
        return 'SubSink';
      case 'subscription-array':
        return 'Subscription array';
      case 'take-until-destroyed':
        return 'takeUntilDestroyed';
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cleanup']) {
      this.stopCurrentSubscription();
      this.startSubscription();
    }
  }

  private startSubscription(): void {
    const userDetails$ = this.userDetailsService.userDetails$.pipe(
      // Also stop the old strategy if Angular reuses this page during navigation.
      takeUntil(this.strategyChanged$),
    );
    const updateUserDetails = (userDetails: UserDetails) => {
      this.userDetails = userDetails;
    };

    switch (this.cleanup) {
      case 'subsink':
        this.subSink.sink = userDetails$.subscribe(updateUserDetails);
        break;

      case 'subscription-array':
        this.subscriptions.push(userDetails$.subscribe(updateUserDetails));
        break;

      case 'take-until-destroyed':
        this.userDetailsService.userDetails$
          .pipe(
            takeUntil(this.strategyChanged$),
            takeUntilDestroyed(this.destroyRef),
          )
          .subscribe(updateUserDetails);
        break;
    }
  }

  private stopCurrentSubscription(): void {
    this.strategyChanged$.next();
    this.strategyChanged$.complete();
    this.strategyChanged$ = new Subject<void>();

    this.subSink.unsubscribe();
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }

  ngOnDestroy(): void {
    this.stopCurrentSubscription();
  }
}
