import { Component, OnInit, ChangeDetectionStrategy, Injector, Input } from '@angular/core';
import { FormBase } from 'src/app/shared/forms/form-base';
import { selectEditionActionState, selectEditionLoadingAction } from '@redux/edition/selectors/edition.selector';
import { EditionActionComplete, UpdateEdition, CreateEdition } from '@redux/edition/actions/edition.actions';
import { FormGroup } from '@angular/forms';
import { EditionDto } from '@redux/edition/models/edition-dto.model';
import { UtilValidation } from 'src/app/shared/utils/util-validation';
import { MatCheckboxChange } from '@angular/material';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-edition-form',
  templateUrl: './edition-form.component.html',
  styleUrls: ['./edition-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditionFormComponent extends FormBase implements OnInit {

  formGroup: FormGroup;

  isFreeSubject = new BehaviorSubject<boolean>(false);

  isFree$ = this.isFreeSubject.asObservable();

  @Input()
  editionDto: EditionDto;

  constructor(
    injector: Injector
  ) {
    super(injector, selectEditionLoadingAction, selectEditionActionState, new EditionActionComplete());
  }

  ngOnInit() {
    super.ngOnInit();
    this.formGroup = this._fb.group({
      id: [this.editionDto.id],
      name: [this.editionDto.name, [UtilValidation.required]]
    });
    this.isFreeSubject.next(this.editionDto.isFree);
    this._addGroupEdition();
  }

  changeIsFree($event: MatCheckboxChange) {
    const isFree = $event.checked;
    this.isFreeSubject.next(isFree);
    if (isFree) {
      this.formGroup.removeControl('groupEdition');
    } else {
      this._addGroupEdition();
    }
    this.formGroup.updateValueAndValidity({ onlySelf: true });
  }

  private _addGroupEdition() {
    if (!this.isFreeSubject.getValue()) {
      this.formGroup.addControl('groupEdition', this._fb.group({
        price: [this.editionDto.price, UtilValidation.required],
        editionType: [this.editionDto.editionType, UtilValidation.required],
        trialDayCount: [this.editionDto.trialDayCount],
        numberOfUsers: [this.editionDto.numberOfUsers]
      }));
    }
  }

  submit() {
    if (this.formGroup.invalid) { return; }
    let editionDto = { ...this.formGroup.value };
    if (!this.isFreeSubject.getValue()) {
      const groupEdition = this.formGroup.value.groupEdition;
      delete editionDto.groupEdition;
      editionDto = { ...editionDto, ...groupEdition };
    }
    if (editionDto.id) {
      this._store.dispatch(new UpdateEdition({ edition: editionDto }));
    } else {
      this._store.dispatch(new CreateEdition({ edition: editionDto }));
    }
  }
}
