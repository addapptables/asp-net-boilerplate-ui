import { Injectable, Injector } from '@angular/core';
import { ActionBaseService } from 'src/app/shared/services/action-base.service';
import { ModalService } from '@addapptables/modal';
import { RoleOrganizationUnitActionComplete, RemoveRoleFromOrganizationUnit } from '@redux/organization-unit/actions/role-organization-unit.actions';
import { selectRoleOrganizationUnitActionState } from '@redux/organization-unit/selectors/role-organization-unit.selector';
import { RoleOrganizationUnitFormModalComponent } from '../components/associations/roles/role-organization-unit-form-modal/role-organization-unit-form-modal.component';
import { OrganizationUnitRolesListDto } from '@redux/organization-unit/models/role/organization-unit-roles-list-dto';

@Injectable()
export class RoleOrganizationUnitActionService extends ActionBaseService {

  constructor(
    injector: Injector,
    private _modalService: ModalService
  ) {
    super(injector, new RoleOrganizationUnitActionComplete(), selectRoleOrganizationUnitActionState);
  }

  openModalUpsert(organizationId: number) {
    this._modalService.show(RoleOrganizationUnitFormModalComponent, organizationId);
  }

  deleteRoleOrganizationUnit(organizationUnit: OrganizationUnitRolesListDto) {
    this.delete(
      this._translateService.instant('general.delete'),
      this._translateService.instant('roleOrganizationUnit.areYouSure', { title: organizationUnit.normalizedName }),
      new RemoveRoleFromOrganizationUnit({
        input: {
          id: organizationUnit.id,
          roleId: organizationUnit.roleId,
          organizationUnitId: organizationUnit.organizationUnitId
        }
      })
    );
  }
}
