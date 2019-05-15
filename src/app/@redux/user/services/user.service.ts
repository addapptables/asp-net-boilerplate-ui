import { Injectable, Injector } from '@angular/core';
import { ServiceApiBase } from '@redux/services/service-base';
import { GetUserDto } from '../models/get-user-dto.model';
import { UserDto } from '../models/user-dto.model';
import { CreateUserDto } from '../models/create-user-dto.model';
import { UpdateUserDto } from '../models/update-user-dto.model';
import { PaginatedModel } from '@redux/shared/models/paginated.model';
import { map } from 'rxjs/operators';
import { ChangePasswordDto } from '../models/change-password-dto.model';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ServiceApiBase {

  constructor(injector: Injector) {
    super(injector, '/api/services/app/User');
  }

  getAll(getUserDto: GetUserDto) {
    return this.get<GetUserDto, PaginatedModel<UserDto>>('GetAll', getUserDto).pipe(
      map(x => this._convertDates(x))
    );
  }

  create(createUserDto: CreateUserDto) {
    return this.post<CreateUserDto, UserDto>('Create', createUserDto);
  }

  update(updateUserDto: UpdateUserDto) {
    return this.put<UpdateUserDto, UserDto>('Update', updateUserDto);
  }

  deleteUser(id: number) {
    return this.delete('delete', id);
  }

  changePassword(input: ChangePasswordDto) {
    return this.post<ChangePasswordDto, boolean>('ChangePassword', input);
  }

  private _convertDates(result: PaginatedModel<UserDto>) {
    result.items = result.items.map(
      x => ({ ...x, creationTime: new Date(x.creationTime), lastLoginTime: x.lastLoginTime ? new Date(x.lastLoginTime) : undefined })
    );
    return result;
  }
}
