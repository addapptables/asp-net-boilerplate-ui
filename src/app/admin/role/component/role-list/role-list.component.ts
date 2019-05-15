import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RoleDataSourceService } from '../../services/role-data-source.service';
import { RoleInputModel } from '@redux/role/models/role-input.model';
import { RoleDto } from '@redux/role/models/role-dto.model';
import { RoleActionService } from '../../services/role-action.service';
import { ListComponentBase } from 'src/app/shared/list/list-component-base';
@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    RoleDataSourceService,
    RoleActionService
  ]
})
export class RoleListComponent extends ListComponentBase<RoleInputModel> {

  constructor(
    roleDataSourceService: RoleDataSourceService,
    private _roleActionService: RoleActionService,
  ) {
    super(roleDataSourceService);
  }

  editRole(role: RoleDto) {
    this._roleActionService.edit(role);
  }

  deleteRole(role: RoleDto) {
    this._roleActionService.deleteRole(role);
  }
}
