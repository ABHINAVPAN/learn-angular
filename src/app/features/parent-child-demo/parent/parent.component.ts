import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildComponent } from '../child/child.component'; // 🔁 Import child component class

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [CommonModule, ChildComponent], // 🛠️ Declare Child component dependency
  templateUrl: './parent.component.html' // 📂 Pointing to the external template file
})
export class ParentComponent {
  parentText: string = 'Initial Parent Data';
  messageFromChild: string = '';

  updateParentText(): void {
    this.parentText = 'Updated Parent Data!';
  }

  // 📥 Catches the string packet sent up by the child's .emit()
  handleChildEvent(receivedText: string): void {
    this.messageFromChild = receivedText;
  }
}
