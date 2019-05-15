import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { ListComponentBase } from 'src/app/shared/list/list-component-base';
import { FindOrganizationUnitUsersDto } from '@redux/organization-unit/models/user/find-organization-unit-users-dto';
import { AssociateUserOrganizationUnitService } from 'src/app/admin/organization-unit/services/associate-user-organization-unit.service';
import { AssociationUserOrganizationUnitSelect } from 'src/app/admin/organization-unit/models/association-user-organization-unit-select.model';
import { AssociateUserOrganizationUnitDto } from '@redux/organization-unit/models/user/associate-user-organization-unit-dto';
import { CustomSelectionModel } from 'src/app/shared/list/custom-selection-model';
import { takeUntil, tap } from 'rxjs/operators';
import { componentDestroyed } from 'src/app/shared/utils/component-destroyed';

@Component({
  selector: 'app-associate-user-organization-unit-list',
  templateUrl: './associate-user-organization-unit-list.component.html',
  styleUrls: ['./associate-user-organization-unit-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AssociateUserOrganizationUnitService
  ]
})
export class AssociateUserOrganizationUnitListComponent extends ListComponentBase<FindOrganizationUnitUsersDto, AssociateUserOrganizationUnitDto> implements OnInit {

  organizationUnitId: number;

  selection = new CustomSelectionModel<AssociationUserOrganizationUnitSelect>(true, []);

  size = 5;

  @Output()
  usersSelected = new EventEmitter<AssociationUserOrganizationUnitSelect[]>();

  @Input()
  set setOrganizationUnitId(organizationUnitId: number) {
    this.organizationUnitId = organizationUnitId;
    if (this.organizationUnitId) {
      this.subscriptionList && this.subscriptionList.unsubscribe();
      this.paginator && this.paginator.firstPage();
      this.filter.next(<FindOrganizationUnitUsersDto>{ organizationUnitId });
    }
  }

  constructor(associateUserOrganizationUnitService: AssociateUserOrganizationUnitService) {
    super(associateUserOrganizationUnitService);
  }

  ngOnInit(): void {
    if (this.organizationUnitId) {
      this.loadDataSource();
    }
    this.selection.changed.pipe(
      takeUntil(componentDestroyed(this)),
      tap((result) => this.usersSelected.emit(result.allSelection))
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
