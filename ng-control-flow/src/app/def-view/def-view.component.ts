import { Component } from '@angular/core';
import { NestedDefViewComponent } from './nested-def-view.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-def-view',
  standalone: true,
  imports: [NestedDefViewComponent, MatProgressSpinnerModule],
  templateUrl: './def-view.component.html',
})
export class DefViewComponent {
}
