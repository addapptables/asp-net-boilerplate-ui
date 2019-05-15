import { Action } from '@ngrx/store';
import { ProfileDto } from '../models/profile-dto.model';
import { UpdateProfileDto } from '../models/update-profile-dto.model';

export enum ProfileActionTypes {
  LoadProfile = '[Profile] Load Profile',
  ProfileLoaded = '[Profile] ProfileLoaded',
  UpdateProfile = '[Profile] Update Profile',
  ProfileUpdated = '[Profile] Profile Updated',
  CancelProfileRequest = '[Profile] Cancel Profile Request',
  ProfileActionComplete = '[Profile] Profile Action Complete',
  ProfileActionError = '[Profile] Profile Action Error',
  ProfileClearStore = '[Profile] Profile Clear Store',
}

export class ProfileClearStore implements Action {
  readonly type = ProfileActionTypes.ProfileClearStore;
}

export class ProfileActionError implements Action {
  readonly type = ProfileActionTypes.ProfileActionError;
}

export class ProfileActionComplete implements Action {
  readonly type = ProfileActionTypes.ProfileActionComplete;
}

export class LoadProfile implements Action {
  readonly type = ProfileActionTypes.LoadProfile;
}

export class ProfileLoaded implements Action {
  readonly type = ProfileActionTypes.ProfileLoaded;
  constructor(public payload: { profile: ProfileDto }) { }
}

export class UpdateProfile implements Action {
  readonly type = ProfileActionTypes.UpdateProfile;
  constructor(public payload: { profile: UpdateProfileDto }) { }
}

export class ProfileUpdated implements Action {
  readonly type = ProfileActionTypes.ProfileUpdated;
  constructor(public payload: { profile: ProfileDto }) { }
}

export class CancelProfileRequest implements Action {
  readonly type = ProfileActionTypes.CancelProfileRequest;
}
