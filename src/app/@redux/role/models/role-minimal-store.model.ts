import { RoleMinimalDto } from './role-minimal-dto';
import { EntityState } from '@ngrx/entity';

export interface RoleMinimalStoreModel extends EntityState<RoleMinimalDto> {
    loading: boolean;
}
