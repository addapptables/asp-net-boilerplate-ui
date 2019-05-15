import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OrganizationUnitMinimalDto } from '@redux/organization-unit/models/minimal/organization-unit-minimal-dto.model';
import { Store, select } from '@ngrx/store';
import { AddapptableState } from 'src/app/reducres';
import { selectAllOrganizationUnitsMinimal } from '@redux/organization-unit/selectors/organization-unit-minimal.selector';
import { tap } from 'rxjs/operators';
import { LoadOrganizationUnitMinimals } from '@redux/organization-unit/actions/organization-unit-minimal.actions';

@Component({
  selector: 'app-organization-unit-toolbar',
  templateUrl: './organization-unit-toolbar.component.html',
  styleUrls: ['./organization-unit-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizationUnitToolbarComponent implements OnInit {

  selectOrganizationUnit$: Observable<OrganizationUnitMinimalDto>;

  organizationUnits$: Observable<OrganizationUnitMinimalDto[]>;

  constructor(readonly _store: Store<AddapptableState>) { }

  ngOnInit() {
    this.organizationUnits$ = this._store.pipe(
      select(selectAllOrganizationUnitsMinimal)
    ).pipe(
      tap((data) => {
        if (data.length === 0) {
          this._store.dispatch(new LoadOrganizationUnitMinimals());
        }
      })
    );
  }

  changeOrganizationUnit(organizationUnit: OrganizationUnitMinimalDto) {
    this.selectOrganizationUnit$ = of(organizationUnit);
  }

}
