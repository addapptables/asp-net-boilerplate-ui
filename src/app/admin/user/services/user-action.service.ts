import { Injectable, Injector } from '@angular/core';
import { ActionBaseService } from 'src/app/shared/services/action-base.service';
import { UserActionComplete, DeleteUser } from '@redux/user/actions/user.actions';
import { selectUserActionState } from '@redux/user/selectors/user.selector';
import { ModalService } from '@addapptables/modal';
import { UserDto } from '@redux/user/models/user-dto.model';
import { UserFormModalComponent } from '../components/user-form-modal/user-form-modal.component';

@Injectable()
export class UserActionService extends ActionBaseService {

  constructor(
    injector: Injector,
    private _modalService: ModalService
  ) {
    super(injector, new UserActionComplete(), selectUserActionState);
  }

  openModalUpsert(user: UserDto) {
    this._modalService.show(UserFormModalComponent, user);
  }

  deleteUser(user: UserDto) {
    this.delete(
      this._translateService.instant('general.delete'),
      this._translateService.instant('user.areYouSure', { title: user.fullName }),
      new DeleteUser({ id: user.id })
    );
  }
}
