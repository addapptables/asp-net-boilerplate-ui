import { ContactDto } from './contact-dto';
import { StoreModel } from '@redux/shared/models/store.model';

export interface ContactStoreModel extends StoreModel<ContactDto> { }
