import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  templateUrl: './child.component.html' // 📂 Pointing to the external template file
})
export class ChildComponent {
  // 📥 Receives data down from the parent
  @Input() dataFromParent: string = '';

  // 📤 Emits custom events back up to the parent
  @Output() childEvent = new EventEmitter<string>();

  sendToParent(): void {
    this.childEvent.emit('Hello from the Child Component!');
  }
}
