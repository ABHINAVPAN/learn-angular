import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaxCalculatorComponent } from '../../components/tax-calculator/tax-calculator.component';

@Component({
  selector: 'app-tax-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, TaxCalculatorComponent], // Import child component here
  templateUrl: './tax-dashboard.component.html',
  styleUrls: ['./tax-dashboard.component.css']
})
export class TaxDashboardComponent {
  // Parent state variables
  annualSalary: number = 0;
  finalTaxOwed: number | null = null;
  finalTakeHome: number | null = null;

  // 📥 This method captures the data emitted up by the child's @Output()
  onTaxCalculationReceived(event: { taxAmount: number; netIncome: number }): void {
    this.finalTaxOwed = event.taxAmount;
    this.finalTakeHome = event.netIncome;
  }
}
