import { Injectable, Injector } from '@angular/core';
import { ServiceApiBase } from '@redux/services/service-base';
import { GetEditionDto } from '../models/get-edition-dto.model';
import { EditionDto } from '../models/edition-dto.model';
import { CreateEditionDto } from '../models/create-edition-dto.model';
import { UpdateEditionDto } from '../models/update-edition-dto.model';
import { PaginatedModel } from '@redux/shared/models/paginated.model';
import { EditionMinimalDto } from '../models/edition-minimal-dto.model';

@Injectable({
  providedIn: 'root'
})
export class EditionService extends ServiceApiBase {

  constructor(injector: Injector) {
    super(injector, 'api/services/app/Edition');
  }

  getAll(input: GetEditionDto) {
    return this.get<GetEditionDto, PaginatedModel<EditionDto>>('GetAll', input);
  }

  getAllMinimal() {
    return this.get<EditionMinimalDto[]>('GetAllEditionMinimal');
  }

  create(input: CreateEditionDto) {
    return this.post<CreateEditionDto, EditionDto>('Create', input);
  }

  update(input: UpdateEditionDto) {
    return this.put<UpdateEditionDto, EditionDto>('Update', input);
  }

  deleteEdition(id: number) {
    return this.delete('Delete', id);
  }

}
