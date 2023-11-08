import { Component } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
enum Conditions {
  One = 'one',
  Two = 'two'
}

const ITEMS = [
  {name: "Item 🍏", id: 1},
  {name: "Item 🍇", id: 2},
  {name: "Item 🍐", id: 3},
  {name: "Item 🍊", id: 4},
  {name: "Item 🍉", id: 5},
  {name: "Item 🥥", id: 6},
]
@Component({
  selector: 'app-new-flow',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatButtonToggleModule, FormsModule, JsonPipe, MatButtonModule],
  templateUrl: './new-flow.component.html',
})
export class NewFlowComponent {
  readonly Conditions = Conditions;
  condition: Conditions = Conditions.One;
  items: any = ITEMS;

  restoreItems() {
    this.items = ITEMS;
  }
  setItemsAsEmptySet() {
    this.items = new Set();
  }
}
