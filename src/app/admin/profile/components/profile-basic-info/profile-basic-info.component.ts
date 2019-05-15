import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AddapptableState } from 'src/app/reducres';
import { ProfileDto } from '@redux/profile/models/profile-dto.model';
import { selectProfile, selectProfileLoading } from '@redux/profile/selectors/profile.selector';
import { LoadProfile } from '@redux/profile/actions/profile.actions';
import { SingleSourceBase } from 'src/app/shared/services/single-soruce-base';

@Component({
  selector: 'app-profile-basic-info',
  templateUrl: './profile-basic-info.component.html',
  styleUrls: ['./profile-basic-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileBasicInfoComponent extends SingleSourceBase<ProfileDto> {

  constructor(_store: Store<AddapptableState>) {
    super(_store, selectProfile, new LoadProfile(), selectProfileLoading);
  }

}
