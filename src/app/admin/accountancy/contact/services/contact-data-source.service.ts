import { Injectable } from '@angular/core';
import { DataSourceBase } from 'src/app/shared/services/data-source-base';
import { ContactDto } from '@redux/contact/models/contact-dto';
import { IDatasource } from 'src/app/shared/list/datasource.interface';
import { GetContactDto } from '@redux/contact/models/get-contact-dto';
import { Store } from '@ngrx/store';
import { AddapptableState } from 'src/app/reducres';
import { selectContactLoading, selectContactTotal, selectContactsPage } from '@redux/contact/selectors/contact.selector';
import { CancelContactRequest, LoadContacts } from '@redux/contact/actions/contact.actions';
import { PageQueryModel } from '@redux/shared/models/page-query.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ContactDataSourceService extends DataSourceBase<ContactDto> implements IDatasource<GetContactDto> {

  public displayedColumns: string[] = ['actions', 'identificationType', 'identification', 'names', 'address', 'email', 'phone', 'cellPhone'];

  constructor(_store: Store<AddapptableState>) {
    super(_store, selectContactLoading, selectContactTotal, new CancelContactRequest());
  }

  load(pageQuery: PageQueryModel, getContactDto$: Observable<GetContactDto>, hasNext$: Observable<boolean>) {
    return this.loadData(
      pageQuery,
      hasNext$,
      selectContactsPage,
      getContactDto$.pipe(
        map((getContactDto) => new LoadContacts({
          params: {
            ...getContactDto,
            skipCount: pageQuery.index * pageQuery.size,
            maxResultCount: pageQuery.size
          }
        }))
      ));
  }
}
