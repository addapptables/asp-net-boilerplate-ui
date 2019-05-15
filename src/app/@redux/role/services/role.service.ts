import { Injectable, Injector } from '@angular/core';
import { ServiceApiBase } from '@redux/services/service-base';
import { RoleInputModel } from '../models/role-input.model';
import { RoleDto } from '../models/role-dto.model';
import { PaginatedModel } from '@redux/shared/models/paginated.model';
import { CreateRoleDto } from '../models/create-role-dto';
import { RoleEditDto } from '../models/role-edit-dto';
import { RoleForEdit } from '../models/role-for-edit-dto';
import { RoleMinimalDto } from '../models/role-minimal-dto';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends ServiceApiBase {

  constructor(injector: Injector) {
    super(injector, 'api/services/app/Role');
  }

  getAll(roleInput: RoleInputModel) {
    return this.get<RoleInputModel, PaginatedModel<RoleDto>>('GetAll', roleInput);
  }

  getAllMinimal() {
    return this.get<RoleMinimalDto[]>('GetRoles');
  }

  getRoleForEdit(id: number) {
    return this.get<{ id: number }, RoleForEdit>('GetRoleForEdit', { id });
  }

  create(role: CreateRoleDto) {
    return this.post<CreateRoleDto, RoleDto>('Create', role);
  }

  update(role: RoleEditDto) {
    return this.put<RoleEditDto, RoleDto>('Update', role);
  }

  deleteRole(id: number) {
    return this.delete('Delete', id);
  }
}
