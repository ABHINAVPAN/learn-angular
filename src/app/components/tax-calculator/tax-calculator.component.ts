import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tax-calculator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tax-calculator.component.html',
  styleUrls: ['./tax-calculator.component.css']
})
export class TaxCalculatorComponent implements OnChanges {
  // 📥 Receives gross income from the parent page
  @Input() grossIncome: number = 0;

  // 📤 Emits the calculated tax breakdown back to the parent
  @Output() taxCalculated = new EventEmitter<{ taxAmount: number; netIncome: number }>();

  taxRate: number = 0.20; // Flat 20% tax rate for this example
  calculatedTax: number = 0;
  netIncome: number = 0;

  // Detect whenever the parent updates the grossIncome input
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['grossIncome']) {
      this.calculateTax();
    }
  }

  calculateTax(): void {
    this.calculatedTax = this.grossIncome * this.taxRate;
    this.netIncome = this.grossIncome - this.calculatedTax;
  }

  // Send the final summary data up to the parent when clicked
  submitTaxSummary(): void {
    this.taxCalculated.emit({
      taxAmount: this.calculatedTax,
      netIncome: this.netIncome
    });
  }
}
