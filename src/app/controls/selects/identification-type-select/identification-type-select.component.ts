import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-identification-type-select',
  templateUrl: './identification-type-select.component.html',
  styleUrls: ['./identification-type-select.component.scss']
})
export class IdentificationTypeSelectComponent {

  @Input()
  form: FormsModule;

}
