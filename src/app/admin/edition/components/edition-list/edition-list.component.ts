import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ListComponentBase } from 'src/app/shared/list/list-component-base';
import { GetEditionDto } from '@redux/edition/models/get-edition-dto.model';
import { EditionDataSourceService } from '../../services/edition-data-source.service';
import { EditionDto } from '@redux/edition/models/edition-dto.model';
import { EditionActionService } from '../../services/edition-action.service';

@Component({
  selector: 'app-edition-list',
  templateUrl: './edition-list.component.html',
  styleUrls: ['./edition-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    EditionDataSourceService,
    EditionActionService
  ]
})
export class EditionListComponent extends ListComponentBase<GetEditionDto> implements OnInit {

  constructor(
    editionDataSourceService: EditionDataSourceService,
    private _editionActionService: EditionActionService
  ) {
    super(editionDataSourceService);
  }

  editEdition(edition: EditionDto) {
    this._editionActionService.openModalUpsert(edition);
  }

  deleteEdition(edition: EditionDto) {
    this._editionActionService.deleteEdition(edition);
  }

}
