import { Injectable, Injector } from '@angular/core';
import { ActionBaseService } from 'src/app/shared/services/action-base.service';
import { ModalService } from '@addapptables/modal';
import { UserOrganizationUnitActionComplete, RemoveUserFromOrganizationUnit } from '@redux/organization-unit/actions/user-organization-unit.actions';
import { selectUserOrganizationUnitActionState } from '@redux/organization-unit/selectors/user-organization-unit.selector';
import { UserOrganizationUnitDto } from '@redux/organization-unit/models/user/user-organization-unit-dto';
import { UserOrganizationUnitFormModalComponent } from '../components/associations/users/user-organization-unit-form-modal/user-organization-unit-form-modal.component';

@Injectable()
export class UserOrganizationUnitActionService extends ActionBaseService {

  constructor(
    injector: Injector,
    private _modalService: ModalService
  ) {
    super(injector, new UserOrganizationUnitActionComplete(), selectUserOrganizationUnitActionState);
  }

  openModalUpsert(organizationId: number) {
    this._modalService.show(UserOrganizationUnitFormModalComponent, organizationId);
  }

  deleteUserOrganizationUnit(organizationUnit: UserOrganizationUnitDto) {
    this.delete(
      this._translateService.instant('general.delete'),
      this._translateService.instant('userOrganizationUnit.areYouSure', { title: organizationUnit.fullName }),
      new RemoveUserFromOrganizationUnit({
        input: {
          id: organizationUnit.id,
          userId: organizationUnit.userId,
          organizationUnitId: organizationUnit.organizationUnitId
        }
      })
    );
  }
}
