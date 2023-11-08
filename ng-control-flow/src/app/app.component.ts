import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NewFlowComponent } from './new-flow/new-flow.component';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { DefViewComponent } from './def-view/def-view.component';

enum Tabs {
  ControlFlow,
  DefView
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NewFlowComponent, DefViewComponent, RouterOutlet, MatTabsModule, NgOptimizedImage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  readonly Tabs = Tabs;
  selectedTab = Tabs.ControlFlow
  onSelectedTabChange(event: MatTabChangeEvent  ) {
    this.selectedTab = event.index
  }
}
