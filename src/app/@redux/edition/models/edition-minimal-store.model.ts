import { EntityState } from '@ngrx/entity';
import { EditionMinimalDto } from './edition-minimal-dto.model';

export interface EditionMinimalStoreModel extends EntityState<EditionMinimalDto> {
    loading: boolean;
}
