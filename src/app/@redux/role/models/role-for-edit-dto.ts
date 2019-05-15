import { RoleDto } from './role-dto.model';

export class RoleForEdit {
    role: RoleDto;
    grantedPermissionNames: string[];
}
