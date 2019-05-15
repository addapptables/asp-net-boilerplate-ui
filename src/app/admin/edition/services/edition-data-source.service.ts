import { Injectable } from '@angular/core';
import { EditionDto } from '@redux/edition/models/edition-dto.model';
import { DataSourceBase } from 'src/app/shared/services/data-source-base';
import { IDatasource } from 'src/app/shared/list/datasource.interface';
import { GetEditionDto } from '@redux/edition/models/get-edition-dto.model';
import { Store } from '@ngrx/store';
import { AddapptableState } from 'src/app/reducres';
import { selectEditionLoading, selectEditionTotal, selectEditionsPage } from '@redux/edition/selectors/edition.selector';
import { CancelEditionRequest, LoadEditions } from '@redux/edition/actions/edition.actions';
import { PageQueryModel } from '@redux/shared/models/page-query.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class EditionDataSourceService extends DataSourceBase<EditionDto> implements IDatasource<GetEditionDto> {

  public displayedColumns: string[] = ['actions', 'name', 'isFree', 'price', 'editionType', 'trialDayCount', 'numberOfUsers'];

  constructor(_store: Store<AddapptableState>) {
    super(_store, selectEditionLoading, selectEditionTotal, new CancelEditionRequest());
  }

  load(pageQuery: PageQueryModel, getEditionDto$: Observable<GetEditionDto>, hasNext$: Observable<boolean>) {
    return this.loadData(
      pageQuery,
      hasNext$,
      selectEditionsPage,
      getEditionDto$.pipe(
        map((getUserDto) => new LoadEditions({
          filter: {
            ...getUserDto,
            skipCount: pageQuery.index * pageQuery.size,
            maxResultCount: pageQuery.size
          }
        }))
      ));
  }
}
