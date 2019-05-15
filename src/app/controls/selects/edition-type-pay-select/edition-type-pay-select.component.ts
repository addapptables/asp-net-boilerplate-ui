import { Component, ChangeDetectionStrategy, Input, Self, Optional, HostBinding, OnDestroy, ElementRef, DoCheck } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ControlValueAccessor, NgControl, NgForm, FormGroupDirective } from '@angular/forms';
import { MatFormFieldControl, ErrorStateMatcher, _MatSelectMixinBase } from '@angular/material';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { FocusMonitor } from '@angular/cdk/a11y';

let nextUniqueId = 0;

@Component({
  selector: 'app-edition-type-pay-select',
  templateUrl: './edition-type-pay-select.component.html',
  styleUrls: ['./edition-type-pay-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: MatFormFieldControl, useExisting: EditionTypePaySelectComponent }
  ],
})
export class EditionTypePaySelectComponent extends _MatSelectMixinBase
  implements ControlValueAccessor, MatFormFieldControl<any>, OnDestroy, DoCheck {

  private _placeholder: string;

  private _required = false;

  @HostBinding('attr.aria-describedby')
  _ariaDescribedby: string;

  focused = false;

  value: any;

  stateChanges = new Subject<any>();

  id = `edition-type-pay-select-${nextUniqueId++}`;

  shouldLabelFloat: boolean;

  controlType = 'edition-type-pay-select';

  valueSubject = new BehaviorSubject<number | number[]>(null);

  value$ = this.valueSubject.asObservable();

  disabled: boolean;

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

  propagateChange = (_: any) => { };
  onTouched: any = () => { };

  constructor(
    elementRef: ElementRef,
    _defaultErrorStateMatcher: ErrorStateMatcher,
    @Optional() _parentForm: NgForm,
    @Optional() _parentFormGroup: FormGroupDirective,
    private fm: FocusMonitor,
    private elRef: ElementRef<HTMLElement>,
    @Self() @Optional() public ngControl: NgControl
  ) {
    super(elementRef, _defaultErrorStateMatcher, _parentForm,
      _parentFormGroup, ngControl);
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
    fm.monitor(elRef.nativeElement, true).subscribe(origin => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
  }

  ngDoCheck() {
    if (this.ngControl) {
      this.updateErrorState();
    }
  }

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

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  setDescribedByIds(ids: string[]): void {
    this._ariaDescribedby = ids.join(' ');
  }

  onContainerClick(): void { }

  ngOnDestroy() {
    this.stateChanges.complete();
    this.fm.stopMonitoring(this.elRef.nativeElement);
  }
}
