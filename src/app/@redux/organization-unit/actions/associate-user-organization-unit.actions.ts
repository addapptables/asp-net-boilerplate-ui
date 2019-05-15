import { Action } from '@ngrx/store';
import { FindOrganizationUnitUsersDto } from '../models/user/find-organization-unit-users-dto';
import { AssociateUserOrganizationUnitDto } from '../models/user/associate-user-organization-unit-dto';

export enum AssociateUserOrganizationUnitActionTypes {
  LoadAssociateUserOrganizationUnits = '[AssociateUserOrganizationUnit] Load AssociateUserOrganizationUnits',
  AssociateUserOrganizationUnitsLoaded = '[AssociateUserOrganizationUnit] AssociateUserOrganizationUnits Loaded',
  AssociateUserOrganizationUnitClearStore = '[AssociateUserOrganizationUnit] AssociateUserOrganizationUnit Clear Store',
  CancelAssociateUserOrganizationUnitRequest = '[AssociateUserOrganizationUnit] Cancel AssociateUserOrganizationUnit Request',
}

export class CancelAssociateUserOrganizationUnitRequest implements Action {
  readonly type = AssociateUserOrganizationUnitActionTypes.CancelAssociateUserOrganizationUnitRequest;
}

export class AssociateUserOrganizationUnitClearStore implements Action {
  readonly type = AssociateUserOrganizationUnitActionTypes.AssociateUserOrganizationUnitClearStore;
}

export class LoadAssociateUserOrganizationUnits implements Action {
  readonly type = AssociateUserOrganizationUnitActionTypes.LoadAssociateUserOrganizationUnits;
  constructor(public payload: { filter: FindOrganizationUnitUsersDto }) { }
}

export class AssociateUserOrganizationUnitsLoaded implements Action {
  readonly type = AssociateUserOrganizationUnitActionTypes.AssociateUserOrganizationUnitsLoaded;
  constructor(public payload: { users: AssociateUserOrganizationUnitDto[], total: number }) { }
}
