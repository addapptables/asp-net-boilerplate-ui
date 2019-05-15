import { NgModule } from '@angular/core';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileLayoutComponent } from './components/profile-layout/profile-layout.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileBasicInfoComponent } from './components/profile-basic-info/profile-basic-info.component';
import { ReduxRegisterModule } from '@addapptables/ngrx-actions';
import { ProfileStore } from '@redux/profile/stores/profile.store';
import { EffectsModule } from '@ngrx/effects';
import { ProfileEffects } from '@redux/profile/effects/profile.effects';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { SharedFormsModule } from 'src/app/shared/shared-forms-module.module';
import { CropImageModule } from 'src/app/controls/crop-image/crop-image.module';
import { ProfileChangePasswordComponent } from './components/profile-change-password/profile-change-password.component';

@NgModule({
  declarations: [
    ProfileLayoutComponent,
    ProfileBasicInfoComponent,
    ProfileFormComponent,
    ProfileChangePasswordComponent
  ],
  imports: [
    SharedModule,
    SharedFormsModule,
    ProfileRoutingModule,
    CropImageModule,
    ReduxRegisterModule.forFeature('profile', { store: ProfileStore }),
    EffectsModule.forFeature([ProfileEffects])
  ]
})
export class ProfileModule { }
