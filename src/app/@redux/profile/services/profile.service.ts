import { Injectable, Injector } from '@angular/core';
import { ServiceApiBase } from '@redux/services/service-base';
import { ProfileDto } from '../models/profile-dto.model';
import { UpdateProfileDto } from '../models/update-profile-dto.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends ServiceApiBase {

  constructor(injector: Injector) {
    super(injector, 'api/services/app/Profile');
  }

  getProfile() {
    return this.get<ProfileDto>('GetProfile');
  }

  update(profile: UpdateProfileDto) {
    return this.put<UpdateProfileDto, ProfileDto>('UpdateProfile', profile);
  }
}
