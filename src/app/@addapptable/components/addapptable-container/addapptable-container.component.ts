import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'addapptable-container',
  templateUrl: './addapptable-container.component.html',
  styleUrls: ['./addapptable-container.component.scss'],
  host: {
    class: 'container-fluid'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddapptableContainerComponent { }
