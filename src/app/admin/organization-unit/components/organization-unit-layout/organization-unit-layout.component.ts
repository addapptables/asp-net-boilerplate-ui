import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AddapptableState } from 'src/app/reducres';
import { OrganizationUnitClearStore } from '@redux/organization-unit/actions/organization-unit.actions';
import { OrganizationUnitActionService } from '../../services/organization-unit-action.service';
import { OrganizationUnitDto } from '@redux/organization-unit/models/organization-unit-dto.model';
import { UserOrganizationUnitClearStore } from '@redux/organization-unit/actions/user-organization-unit.actions';

@Component({
  selector: 'app-organization-unit-layout',
  templateUrl: './organization-unit-layout.component.html',
  styleUrls: ['./organization-unit-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizationUnitLayoutComponent implements OnDestroy {

  organizationUnitId: number;

  constructor(
    private _store: Store<AddapptableState>,
    private _organizationUnitActionService: OrganizationUnitActionService
  ) { }

  createOrganizationUnit() {
    this._organizationUnitActionService.openModalUpsert(<OrganizationUnitDto>{});
  }

  ngOnDestroy(): void {
    this._store.dispatch(new OrganizationUnitClearStore());
    this._store.dispatch(new UserOrganizationUnitClearStore);
  }
}
