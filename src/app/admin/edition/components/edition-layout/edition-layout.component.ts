import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AddapptableState } from 'src/app/reducres';
import { EditionActionService } from '../../services/edition-action.service';
import { EditionDto } from '@redux/edition/models/edition-dto.model';
import { EditionClearStore } from '@redux/edition/actions/edition.actions';

@Component({
  selector: 'app-edition-layout',
  templateUrl: './edition-layout.component.html',
  styleUrls: ['./edition-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditionLayoutComponent implements OnDestroy {

  constructor(
    private _store: Store<AddapptableState>,
    private _editionActionService: EditionActionService
  ) { }

  createEdition() {
    this._editionActionService.openModalUpsert(<EditionDto>{});
  }

  ngOnDestroy(): void {
    this._store.dispatch(new EditionClearStore());
  }

}
