import { Injectable, Injector } from '@angular/core';
import { ActionBaseService } from 'src/app/shared/services/action-base.service';
import { ModalService } from '@addapptables/modal';
import { EditionActionComplete, DeleteEdition } from '@redux/edition/actions/edition.actions';
import { selectEditionActionState } from '@redux/edition/selectors/edition.selector';
import { EditionDto } from '@redux/edition/models/edition-dto.model';
import { EditionFormModalComponent } from '../components/edition-form-modal/edition-form-modal.component';

@Injectable()
export class EditionActionService extends ActionBaseService {

  constructor(
    injector: Injector,
    private _modalService: ModalService
  ) {
    super(injector, new EditionActionComplete(), selectEditionActionState);
  }

  openModalUpsert(edition: EditionDto) {
    this._modalService.show(EditionFormModalComponent, edition);
  }

  deleteEdition(edition: EditionDto) {
    this.delete(
      this._translateService.instant('general.delete'),
      this._translateService.instant('edition.areYouSure', { title: edition.displayName }),
      new DeleteEdition({ id: edition.id })
    );
  }
}
