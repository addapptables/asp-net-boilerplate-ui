import { Injectable, OnDestroy, Injector } from '@angular/core';
import { RoleService } from '@redux/role/services/role.service';
import { RoleDto } from '@redux/role/models/role-dto.model';
import { takeUntil, map, tap } from 'rxjs/operators';
import { ModalService } from '@addapptables/modal';
import { RoleFormModalComponent } from '../component/role-form-modal/role-form-modal.component';
import { componentDestroyed } from 'src/app/shared/utils/component-destroyed';
import { DeleteRole, RoleActionComplete } from '@redux/role/actions/role.actions';
import { selectRoleActionState } from '@redux/role/selectors/role.selector';
import { ActionBaseService } from 'src/app/shared/services/action-base.service';

@Injectable()
export class RoleActionService extends ActionBaseService implements OnDestroy {

  constructor(
    injector: Injector,
    private _roleService: RoleService,
    private _modalService: ModalService,
  ) {
    super(injector, new RoleActionComplete(), selectRoleActionState);
  }

  edit(role: RoleDto) {
    this._roleService.getRoleForEdit(role.id).pipe(
      takeUntil(componentDestroyed(this)),
      map(result => ({ ...result.role, permissions: result.grantedPermissionNames })),
      tap(roleDto => this._modalService.show(RoleFormModalComponent, roleDto))
    ).subscribe();
  }

  deleteRole(role: RoleDto) {
    this.delete(
      this._translateService.instant('general.delete'),
      this._translateService.instant('role.areYouSure', { title: role.normalizedName }),
      new DeleteRole({ id: role.id })
    );
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
