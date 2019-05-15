import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AddapptableState } from 'src/app/reducres';
import { ProfileClearStore, CancelProfileRequest } from '@redux/profile/actions/profile.actions';

@Component({
  selector: 'app-profile-layout',
  templateUrl: './profile-layout.component.html',
  styleUrls: ['./profile-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileLayoutComponent implements OnDestroy {

  constructor(private _store: Store<AddapptableState>) { }

  ngOnDestroy(): void {
    this._store.dispatch(new CancelProfileRequest());
    this._store.dispatch(new ProfileClearStore());
  }

}
