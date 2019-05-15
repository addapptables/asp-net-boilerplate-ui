import { Store, Action } from '@addapptables/ngrx-actions';
import { ProfileStoreModel } from '../models/profile-store.model';
import { ProfileDto } from '../models/profile-dto.model';
import { ActionType } from '@redux/shared/models/action-type.model';
import {
    LoadProfile,
    ProfileLoaded,
    UpdateProfile,
    ProfileUpdated,
    CancelProfileRequest,
    ProfileClearStore,
    ProfileActionComplete,
    ProfileActionError
} from '../actions/profile.actions';


@Store<ProfileStoreModel>({
    profile: <ProfileDto>{},
    ActionState: ActionType.none,
    loading: false,
    loadingAction: false
})
export class ProfileStore {

    @Action(LoadProfile)
    loadProfile(state: ProfileStoreModel) {
        return { ...state, loading: true };
    }

    @Action(ProfileLoaded)
    profileLoaded(state: ProfileStoreModel, { payload: { profile } }: ProfileLoaded) {
        return { ...state, loading: false, profile };
    }

    @Action(UpdateProfile)
    UpdateProfile(state: ProfileStoreModel) {
        return { ...state, loadingAction: true };
    }

    @Action(ProfileUpdated)
    profileUpdated(state: ProfileStoreModel, { payload: { profile } }: ProfileLoaded) {
        return { ...state, loadingAction: false, profile, ActionState: ActionType.success };
    }

    @Action(CancelProfileRequest)
    cancelProfileRequest(state: ProfileStoreModel) {
        return { ...state, loadingAction: false, loading: false };
    }

    @Action(ProfileActionComplete)
    profileActionComplete(state: ProfileStoreModel) {
        return { ...state, ActionState: ActionType.none };
    }

    @Action(ProfileActionError)
    profileActionError(state: ProfileStoreModel) {
        return { ...state, ActionState: ActionType.error, loadingAction: false };
    }

    @Action(ProfileClearStore)
    profileClearStore(state: ProfileStoreModel) {
        return { ...state, loadingAction: false, loading: false, profile: {}, ActionState: ActionType.none };
    }

}
