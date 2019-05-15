import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { LoadPermissions, CancelLoadPermissions } from '@redux/permission/actions/permission.actions';
import { PermissionTreeModel } from '../models/permission-tree.model';
import { PermissionDto } from '@redux/permission/models/permission-dto.model';
import { selectAllPermissions } from '@redux/permission/selectors/permission.selector';
import { map, tap, takeUntil } from 'rxjs/operators';
import { DataSource } from '@angular/cdk/collections';
import { AddapptableState } from 'src/app/reducres';

@Injectable()
export class PermissionTreeService extends DataSource<PermissionTreeModel> {

  private _unsubscribeAll: Subject<PermissionDto[]> = new Subject();

  private permissions: PermissionDto[] = [];

  permissions$: Observable<PermissionDto[]>;

  constructor(private _store: Store<AddapptableState>) {
    super();
    this.initialize();
  }

  initialize() {
    this.permissions$ = this._store.pipe(
      select(selectAllPermissions)
    );
  }

  connect(): Observable<PermissionTreeModel[]> {
    return this._getDataSourcePermission().pipe(
      takeUntil(this._unsubscribeAll)
    );
  }

  disconnect(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
    this._store.dispatch(new CancelLoadPermissions());
  }

  private _getDataSourcePermission() {
    return this.permissions$.pipe(
      tap((permissions) => {
        if (permissions.length === 0) {
          this._store.dispatch(new LoadPermissions());
        } else {
          this.permissions = permissions;
        }
      }),
      map((permissions) => this._buildPermissionTree(permissions))
    );
  }

  private _getAllChildrenByName(name: string, childrens: string[]): string[] {
    const permission = this.permissions.filter(x => x.parentName === name);
    if (permission.length > 0) {
      const allChildrens = permission.map(x => [x.name, ...this._getAllChildrenByName(x.name, [...childrens])]);
      const result = allChildrens.reduce((res, currentArr) => res.concat(currentArr), []);
      return result;
    }
    return childrens;
  }

  private _buildPermissionTree(permissions: PermissionDto[]): PermissionTreeModel[] {
    return permissions
      .filter(x => !x.parentName)
      .map(x => <PermissionTreeModel>{
        name: x.name,
        displayName: x.displayName,
        hasParent: false,
        level: 0,
        children: this._buildChildren(permissions, x.name, 1)
      });
  }

  private _buildChildren(permissions: PermissionDto[], parentName: string, level: number): PermissionTreeModel[] {
    return permissions.filter(x => x.parentName === parentName).map(x => <PermissionTreeModel>{
      name: x.name,
      displayName: x.displayName,
      hasParent: true,
      level: level,
      parentName: parentName,
      children: this._buildChildren(permissions, x.name, level + 1)
    });
  }
}
