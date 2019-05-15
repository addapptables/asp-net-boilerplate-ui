import { Injectable, Injector } from '@angular/core';
import { ActionBaseService } from 'src/app/shared/services/action-base.service';
import { ModalService } from '@addapptables/modal';
import { OrganizationUnitActionComplete, DeleteOrganizationUnit } from '@redux/organization-unit/actions/organization-unit.actions';
import { selectOrganizationUnitActionState } from '@redux/organization-unit/selectors/organization-unit.selector';
import { OrganizationUnitDto } from '@redux/organization-unit/models/organization-unit-dto.model';
import { OrganizationUnitFormModalComponent } from '../components/organization-unit-form-modal/organization-unit-form-modal.component';

@Injectable()
export class OrganizationUnitActionService extends ActionBaseService {

  constructor(
    injector: Injector,
    private _modalService: ModalService
  ) {
    super(injector, new OrganizationUnitActionComplete(), selectOrganizationUnitActionState);
  }

  openModalUpsert(organizationUnit: OrganizationUnitDto) {
    this._modalService.show(OrganizationUnitFormModalComponent, organizationUnit);
  }

  deleteOrganizationUnit(organizationUnit: OrganizationUnitDto) {
    this.delete(
      this._translateService.instant('general.delete'),
      this._translateService.instant('organizationUnit.areYouSure', { title: organizationUnit.displayName }),
      new DeleteOrganizationUnit({ id: organizationUnit.id })
    );
  }
}
