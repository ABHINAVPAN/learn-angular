import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { ComponentOne } from './componentone';
import { CleanupStrategy, ComponentTwo } from './componenttwo';

@Component({
  selector: 'app-rxjs-user-details-demo',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ComponentOne, ComponentTwo],
  templateUrl: './user-details-demo.component.html',
  styleUrl: './user-details-demo.component.css',
})
export class RxjsUserDetailsDemoComponent {
  cleanup: CleanupStrategy = 'subsink';

  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.route.data.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((data) => {
      this.cleanup = data['cleanup'] as CleanupStrategy;
    });
  }
}
