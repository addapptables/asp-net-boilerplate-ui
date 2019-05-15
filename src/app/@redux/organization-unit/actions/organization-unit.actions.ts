import { Action } from '@ngrx/store';
import { GetOrganizationUnitDto } from '../models/get-organization-unit-dto.model';
import { OrganizationUnitDto } from '../models/organization-unit-dto.model';
import { CreateOrganizationUnitDto } from '../models/create-organization-unit-dto.model';
import { UpdateOrganizationUnitDto } from '../models/update-organization-unit-dto.model';

export enum OrganizationUnitActionTypes {
  LoadOrganizationUnits = '[OrganizationUnit] Load OrganizationUnits',
  OrganizationUnitsLoaded = '[OrganizationUnit] OrganizationUnits Loaded',
  CreateOrganizationUnit = '[OrganizationUnit] Create OrganizationUnit',
  OrganizationUnitCreated = '[OrganizationUnit] OrganizationUnit Created',
  UpdateOrganizationUnit = '[OrganizationUnit] Update OrganizationUnit',
  OrganizationUnitUpdated = '[OrganizationUnit] OrganizationUnit Updated',
  DeleteOrganizationUnit = '[OrganizationUnit] Delete OrganizationUnit',
  OrganizationUnitDeleted = '[OrganizationUnit] OrganizationUnit Deleted',
  OrganizationUnitActionComplete = '[OrganizationUnit] OrganizationUnit Action Complete',
  OrganizationUnitActionError = '[OrganizationUnit] OrganizationUnit Action Error',
  OrganizationUnitClearStore = '[OrganizationUnit] OrganizationUnit Clear Store',
  CancelOrganizationUnitRequest = '[OrganizationUnit] Cancel OrganizationUnit Request',
}

export class CancelOrganizationUnitRequest implements Action {
  readonly type = OrganizationUnitActionTypes.CancelOrganizationUnitRequest;
}

export class OrganizationUnitClearStore implements Action {
  readonly type = OrganizationUnitActionTypes.OrganizationUnitClearStore;
}

export class OrganizationUnitActionError implements Action {
  readonly type = OrganizationUnitActionTypes.OrganizationUnitActionError;
}

export class OrganizationUnitActionComplete implements Action {
  readonly type = OrganizationUnitActionTypes.OrganizationUnitActionComplete;
}

export class OrganizationUnitDeleted implements Action {
  readonly type = OrganizationUnitActionTypes.OrganizationUnitDeleted;
  constructor(public payload: { id: number }) { }
}

export class DeleteOrganizationUnit implements Action {
  readonly type = OrganizationUnitActionTypes.DeleteOrganizationUnit;
  constructor(public payload: { id: number }) { }
}

export class OrganizationUnitUpdated implements Action {
  readonly type = OrganizationUnitActionTypes.OrganizationUnitUpdated;
  constructor(public payload: { organizationUnit: OrganizationUnitDto }) { }
}

export class UpdateOrganizationUnit implements Action {
  readonly type = OrganizationUnitActionTypes.UpdateOrganizationUnit;
  constructor(public payload: { organizationUnit: UpdateOrganizationUnitDto }) { }
}

export class OrganizationUnitCreated implements Action {
  readonly type = OrganizationUnitActionTypes.OrganizationUnitCreated;
  constructor(public payload: { organizationUnit: OrganizationUnitDto }) { }
}

export class CreateOrganizationUnit implements Action {
  readonly type = OrganizationUnitActionTypes.CreateOrganizationUnit;
  constructor(public payload: { organizationUnit: CreateOrganizationUnitDto }) { }
}

export class OrganizationUnitsLoaded implements Action {
  readonly type = OrganizationUnitActionTypes.OrganizationUnitsLoaded;
  constructor(public payload: { organizationUnits: OrganizationUnitDto[] }) { }
}

export class LoadOrganizationUnits implements Action {
  readonly type = OrganizationUnitActionTypes.LoadOrganizationUnits;
  constructor(public payload: { filter: GetOrganizationUnitDto }) { }
}

