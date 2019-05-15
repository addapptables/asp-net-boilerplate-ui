import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { menus } from './data';
import { MenuModel } from '@addapptables/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  getAllMenus(): Observable<MenuModel[]> {
    return of(menus);
  }

}
