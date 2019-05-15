import { OrganizationUnitMinimalDto } from './organization-unit-minimal-dto.model';
import { EntityState } from '@ngrx/entity';

export interface OrganizationUnitMinimalStoreModel extends EntityState<OrganizationUnitMinimalDto> {
    loading: boolean;
}
