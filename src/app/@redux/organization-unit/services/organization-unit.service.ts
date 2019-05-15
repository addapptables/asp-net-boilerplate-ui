import { Injectable, Injector } from '@angular/core';
import { ServiceApiBase } from '@redux/services/service-base';
import { OrganizationUnitDto } from '../models/organization-unit-dto.model';
import { ListResultDto } from '@redux/shared/models/list-result-dto';
import { CreateOrganizationUnitDto } from '../models/create-organization-unit-dto.model';
import { UpdateOrganizationUnitDto } from '../models/update-organization-unit-dto.model';
import { GetUserOrganizationUnitDto } from '../models/user/get-user-organization-unit-dto';
import { UserOrganizationUnitDto } from '../models/user/user-organization-unit-dto';
import { PaginatedModel } from '@redux/shared/models/paginated.model';
import { FindOrganizationUnitUsersDto } from '../models/user/find-organization-unit-users-dto';
import { AssociateUserOrganizationUnitDto } from '../models/user/associate-user-organization-unit-dto';
import { AddUsersToOrganizationUnitDto } from '../models/add-users-to-organization-unit-dto';
import { RemoveUserFromOrganizationUnitDto } from '../models/user/remove-user-from-organization-unit-dto';
import { removeEmptyOrNil } from 'src/app/shared/utils/utils';
import { RolesToOrganizationUnitDto } from '../models/role/roles-to-organization-unit-dto';
import { OrganizationUnitRolesListDto } from '../models/role/organization-unit-roles-list-dto';
import { GetOrganizationUnitRolesDto } from '../models/role/get-organization-unit-roles-dto';
import { FindOrganizationUnitRolesDto } from '../models/role/find-organization-unit-roles-dto';
import { AssociateRoleToOrganizationUnitDto } from '../models/role/associate-role-to-organization-unit-dto';
import { RoleToOrganizationUnitDto } from '../models/role/role-to-organization-unit-dto';

@Injectable({
  providedIn: 'root'
})
export class OrganizationUnitService extends ServiceApiBase {

  constructor(injector: Injector) {
    super(injector, 'api/services/app/OrganizationUnit');
  }

  getAll() {
    return this.get<ListResultDto<OrganizationUnitDto>>('GetOrganizationUnits');
  }

  getUserOrganizationUnit(input: GetUserOrganizationUnitDto) {
    return this.get<GetUserOrganizationUnitDto, PaginatedModel<UserOrganizationUnitDto>>('GetOrganizationUnitUsers', input);
  }

  getOrganizationUnistMinimal() {
    return this.get<ListResultDto<OrganizationUnitDto>>('GetOrganizationUnistMinimal');
  }

  getRolesOrganizationUnit(input: GetOrganizationUnitRolesDto) {
    return this.get<GetOrganizationUnitRolesDto, PaginatedModel<OrganizationUnitRolesListDto>>('GetOrganizationUnitRoles', input);
  }

  getUsersToAssociate(input: FindOrganizationUnitUsersDto) {
    return this.get<FindOrganizationUnitUsersDto, PaginatedModel<AssociateUserOrganizationUnitDto>>('GetUsers', input);
  }

  getRolesToAssociate(input: FindOrganizationUnitRolesDto) {
    return this.get<FindOrganizationUnitRolesDto, PaginatedModel<AssociateRoleToOrganizationUnitDto>>('GetRoles', input);
  }

  create(input: CreateOrganizationUnitDto) {
    return this.post<CreateOrganizationUnitDto, OrganizationUnitDto>('Create', input);
  }

  addUserToOrganizationUnit(input: AddUsersToOrganizationUnitDto) {
    return this.post<AddUsersToOrganizationUnitDto, ListResultDto<UserOrganizationUnitDto>>('AddUsersToOrganizationUnit', input);
  }

  addRoleToOrganizationUnit(input: RolesToOrganizationUnitDto) {
    return this.post<RolesToOrganizationUnitDto, ListResultDto<OrganizationUnitRolesListDto>>('AddRolesToOrganizationUnit', input);
  }

  update(input: UpdateOrganizationUnitDto) {
    return this.put<UpdateOrganizationUnitDto, OrganizationUnitDto>('Update', input);
  }

  deleteOrganizationUnit(id: number) {
    return this.delete('Delete', id);
  }

  removeUserToOrganizationUnit(input: RemoveUserFromOrganizationUnitDto) {
    const urlSend = this._url + '/RemoveUserFromOrganizationUnit';
    const params = removeEmptyOrNil(input);
    return this._http.delete(urlSend, { params });
  }

  removeRoleToOrganizationUnit(input: RoleToOrganizationUnitDto) {
    const urlSend = this._url + '/RemoveRoleFromOrganizationUnit';
    const params = removeEmptyOrNil(input);
    return this._http.delete(urlSend, { params });
  }
}
