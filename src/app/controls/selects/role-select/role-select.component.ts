import { Component, ChangeDetectionStrategy, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { RoleMinimalDto } from '@redux/role/models/role-minimal-dto';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AddapptableState } from 'src/app/reducres';
import { selectAllRolesMinimal } from '@redux/role/selectors/role-minimal.selector';
import { tap, map } from 'rxjs/operators';
import { LoadRoleMinimals } from '@redux/role/actions/role-minimal.actions';
import { SelectBaseControlValueAccessor } from '../select-base-control-value-accessor';

@Component({
  selector: 'app-role-select',
  templateUrl: './role-select.component.html',
  styleUrls: ['./role-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RoleSelectComponent),
      multi: true
    }
  ]
})
export class RoleSelectComponent extends SelectBaseControlValueAccessor<number | number[]> implements ControlValueAccessor, OnInit {

  roles$: Observable<RoleMinimalDto[]>;

  @Input()
  customClass;

  constructor(
    private _store: Store<AddapptableState>
  ) {
    super();
  }

  ngOnInit(): void {
    this.roles$ = this._store.pipe(
      select(selectAllRolesMinimal)
    ).pipe(
      map((data) => {
        if (!this.multiple) {
          return [{ id: null, displayName: null, normalizedName: '--' }, ...data];
        }
        return data;
      }),
      tap((data) => {
        if (this.multiple && data.length === 0) {
          this._store.dispatch(new LoadRoleMinimals());
        } else if (data.length === 1) {
          this._store.dispatch(new LoadRoleMinimals());
        }
      })
    );
  }
}
