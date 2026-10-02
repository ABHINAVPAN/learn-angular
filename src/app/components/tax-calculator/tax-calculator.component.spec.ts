import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaxCalculatorComponent } from './tax-calculator.component';

describe('TaxCalculatorComponent', () => {
  let component: TaxCalculatorComponent;
  let fixture: ComponentFixture<TaxCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaxCalculatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaxCalculatorComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
