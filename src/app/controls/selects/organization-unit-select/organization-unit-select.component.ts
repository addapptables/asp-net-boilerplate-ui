import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AddapptableState } from 'src/app/reducres';
import { SelectBaseControlValueAccessor } from '../select-base-control-value-accessor';
import { Observable } from 'rxjs';
import { OrganizationUnitMinimalDto } from '@redux/organization-unit/models/minimal/organization-unit-minimal-dto.model';
import { selectAllOrganizationUnitsMinimal } from '@redux/organization-unit/selectors/organization-unit-minimal.selector';
import { tap, map } from 'rxjs/operators';
import { LoadOrganizationUnitMinimals } from '@redux/organization-unit/actions/organization-unit-minimal.actions';

@Component({
  selector: 'app-organization-unit-select',
  templateUrl: './organization-unit-select.component.html',
  styleUrls: ['./organization-unit-select.component.scss']
})
export class OrganizationUnitSelectComponent extends SelectBaseControlValueAccessor<number | number[]> implements OnInit {

  organizationUnits$: Observable<OrganizationUnitMinimalDto[]>;

  constructor(
    private _store: Store<AddapptableState>
  ) {
    super();
  }

  ngOnInit(): void {
    this.organizationUnits$ = this._store.pipe(
      select(selectAllOrganizationUnitsMinimal)
    ).pipe(
      map((data) => {
        if (!this.multiple) {
          return [{ id: null, displayName: '--' }, ...data];
        }
        return data;
      }),
      tap((data) => {
        if (this.multiple && data.length === 0) {
          this._store.dispatch(new LoadOrganizationUnitMinimals());
        } else if (data.length === 1) {
          this._store.dispatch(new LoadOrganizationUnitMinimals());
        }
      })
    );
  }

}
