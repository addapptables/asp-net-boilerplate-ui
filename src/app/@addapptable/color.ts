import { ElementRef } from '@angular/core';
import { Constructor } from '@angular/material/core/typings/common-behaviors/constructor';


export interface HasElementRef {
    _elementRef: ElementRef;
}


export function mixinColor<T extends Constructor<HasElementRef>>(
    base: T, defaultColor?: string): T {
    return class extends base {
        private _color: string;
        get color(): string { return this._color; }
        set color(value: string) {
            const colorPalette = value || defaultColor;
            if (colorPalette !== this._color) {
                if (this._color) {
                    this._elementRef.nativeElement.classList.remove(`${this._color}`);
                }
                if (colorPalette) {
                    this._elementRef.nativeElement.classList.add(`${colorPalette}`);
                }
                this._color = colorPalette;
            }
        }
        constructor(...args: any[]) {
            super(...args);
            this.color = defaultColor;
        }
    };
}
