import { Injectable, Injector } from '@angular/core';
import { ServiceApiBase } from '@redux/services/service-base';
import { GetContactDto } from '../models/get-contact-dto';
import { PaginatedModel } from '@redux/shared/models/paginated.model';
import { ContactDto } from '../models/contact-dto';
import { CreateContactDto } from '../models/create-contact-dto';
import { UpdateContactDto } from '../models/update-contact-dto';

@Injectable({
  providedIn: 'root'
})
export class ContactService extends ServiceApiBase {

  constructor(injector: Injector) {
    super(injector, '/api/services/app/Contact');
  }

  getAll(getContactDto: GetContactDto) {
    return this.get<GetContactDto, PaginatedModel<ContactDto>>('GetAll', getContactDto);
  }

  create(createContactDto: CreateContactDto) {
    return this.post<CreateContactDto, ContactDto>('Create', createContactDto);
  }

  update(updateContactDto: UpdateContactDto) {
    return this.put<UpdateContactDto, ContactDto>('Update', updateContactDto);
  }

  deleteContact(id: number) {
    return this.delete('delete', id);
  }
}
