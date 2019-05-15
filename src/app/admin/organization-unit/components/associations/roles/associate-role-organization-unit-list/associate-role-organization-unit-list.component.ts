import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { AssociateRoleOrganizationUnitService } from 'src/app/admin/organization-unit/services/associate-role-organization-unit.service';
import { FindOrganizationUnitRolesDto } from '@redux/organization-unit/models/role/find-organization-unit-roles-dto';
import { ListComponentBase } from 'src/app/shared/list/list-component-base';
import { AssociateRoleToOrganizationUnitDto } from '@redux/organization-unit/models/role/associate-role-to-organization-unit-dto';
import { CustomSelectionModel } from 'src/app/shared/list/custom-selection-model';
import { AssociationRoleToOrganizationUnitSelect } from 'src/app/admin/organization-unit/models/association-role-to-organization-unit-select.model';
import { takeUntil, tap } from 'rxjs/operators';
import { componentDestroyed } from 'src/app/shared/utils/component-destroyed';

@Component({
  selector: 'app-associate-role-organization-unit-list',
  templateUrl: './associate-role-organization-unit-list.component.html',
  styleUrls: ['./associate-role-organization-unit-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AssociateRoleOrganizationUnitService
  ]
})
export class AssociateRoleOrganizationUnitListComponent extends ListComponentBase<FindOrganizationUnitRolesDto, AssociateRoleToOrganizationUnitDto> implements OnInit {

  organizationUnitId: number;

  selection = new CustomSelectionModel<AssociationRoleToOrganizationUnitSelect>(true, []);

  size = 5;

  @Output()
  rolesSelected = new EventEmitter<AssociationRoleToOrganizationUnitSelect[]>();

  @Input()
  set setOrganizationUnitId(organizationUnitId: number) {
    this.organizationUnitId = organizationUnitId;
    if (this.organizationUnitId) {
      this.subscriptionList && this.subscriptionList.unsubscribe();
      this.paginator && this.paginator.firstPage();
      this.filter.next(<FindOrganizationUnitRolesDto>{ organizationUnitId });
    }
  }

  constructor(associateRoleOrganizationUnitService: AssociateRoleOrganizationUnitService) {
    super(associateRoleOrganizationUnitService);
  }

  ngOnInit(): void {
    if (this.organizationUnitId) {
      this.loadDataSource();
    }
    this.selection.changed.pipe(
      takeUntil(componentDestroyed(this)),
      tap((result) => this.rolesSelected.emit(result.allSelection))
    ).subscribe();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.filter(x => x.pageIndex === this.paginator.pageIndex).length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.selection.select(...this.dataSource.data.map(row => ({ id: row.id, pageIndex: this.paginator.pageIndex })));
  }
}
