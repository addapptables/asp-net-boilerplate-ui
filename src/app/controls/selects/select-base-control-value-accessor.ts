import { ControlValueAccessor } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Input } from '@angular/core';

export class SelectBaseControlValueAccessor<T> implements ControlValueAccessor {

    valueSubject = new BehaviorSubject<T>(null);

    value$ = this.valueSubject.asObservable();

    disabled: boolean;

    @Input()
    multiple: boolean;

    @Input()
    required: boolean;

    propagateChange = (_: any) => { };
    onTouched: any = () => { };

    onChange($event) {
        this.valueSubject.next($event.value);
        this.propagateChange($event.value);
    }

    openedChange($event: boolean) {
        !$event && this.onTouched();
    }

    writeValue(obj: any): void {
        this.valueSubject.next(obj);
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
}
