import {
  Component, OnInit, ChangeDetectionStrategy
  , Input, Self, Optional, ElementRef, OnDestroy, DoCheck, HostBinding
} from '@angular/core';
import { ControlValueAccessor, NgControl, NgForm, FormGroupDirective } from '@angular/forms';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { EditionMinimalDto } from '@redux/edition/models/edition-minimal-dto.model';
import { Store, select } from '@ngrx/store';
import { AddapptableState } from 'src/app/reducres';
import { selectAllEditionsMinimal } from '@redux/edition/selectors/edition-minimal.selector';
import { map, tap } from 'rxjs/operators';
import { LoadEditionMinimals } from '@redux/edition/actions/edition-minimal.actions';
import { MatFormFieldControl, ErrorStateMatcher, _MatSelectMixinBase } from '@angular/material';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

let nextUniqueId = 0;

@Component({
  selector: 'app-edition-select',
  templateUrl: './edition-select.component.html',
  styleUrls: ['./edition-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: MatFormFieldControl, useExisting: EditionSelectComponent }
  ]
})
export class EditionSelectComponent extends _MatSelectMixinBase
  implements ControlValueAccessor, OnInit, MatFormFieldControl<any>, OnDestroy, DoCheck {

  private _placeholder: string;

  private _required = false;

  @HostBinding('attr.aria-describedby')
  _ariaDescribedby: string;

  focused = false;

  value: any;

  stateChanges = new Subject<any>();

  id = `edition-select-${nextUniqueId++}`;

  shouldLabelFloat: boolean;

  controlType = 'edition-select';

  valueSubject = new BehaviorSubject<number | number[]>(null);

  value$ = this.valueSubject.asObservable();

  disabled: boolean;

  editions$: Observable<EditionMinimalDto[]>;

  @Input()
  multiple: boolean;

  @Input()
  get placeholder(): string { return this._placeholder; }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }

  get empty(): boolean {
    return !this.value;
  }

  @Input()
  get required() {
    return this._required;
  }

  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }

  constructor(
    elementRef: ElementRef,
    _defaultErrorStateMatcher: ErrorStateMatcher,
    @Optional() _parentForm: NgForm,
    @Optional() _parentFormGroup: FormGroupDirective,
    @Self() @Optional() public ngControl: NgControl,
    private _store: Store<AddapptableState>
  ) {
    super(elementRef, _defaultErrorStateMatcher, _parentForm,
      _parentFormGroup, ngControl);
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    this.editions$ = this._store.pipe(
      select(selectAllEditionsMinimal)
    ).pipe(
      map((data) => {
        if (!this.multiple) {
          return [{ id: null, displayName: '--' }, ...data];
        }
        return data;
      }),
      tap((data) => {
        if (this.multiple && data.length === 0) {
          this._store.dispatch(new LoadEditionMinimals());
        } else if (data.length === 1) {
          this._store.dispatch(new LoadEditionMinimals());
        }
      })
    );
  }

  ngDoCheck() {
    if (this.ngControl) {
      this.updateErrorState();
    }
  }

  propagateChange = (_: any) => { };
  onTouched: any = () => { };

  onChange($event) {
    this.valueSubject.next($event.value);
    this.value = $event.value;
    this.propagateChange($event.value);
    this.stateChanges.next();
  }

  openedChange($event: boolean) {
    if (!$event) {
      this.focused = true;
      this.onTouched();
      this.stateChanges.next();
    }
  }

  writeValue(obj: any): void {
    this.valueSubject.next(obj);
    this.value = obj;
    this.stateChanges.next();
  }

  setDescribedByIds(ids: string[]): void {
    this._ariaDescribedby = ids.join(' ');
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onContainerClick(): void { }

  ngOnDestroy() {
    this.stateChanges.complete();
  }
}
