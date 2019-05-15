import { trigger, state, style, transition, animate } from '@angular/animations';

export function menuActive() {
    return trigger('animateMenu', [
        state('true', style({
            'background-color': 'white',
            color: 'rgba(60,72,88,.8)',
            'box-shadow': '0 4px 20px 0 rgba(0,0,0,.14), 0 7px 10px -5px rgba(60,72,88,.4)'
        })),
        transition('false => true', [
            animate('0.5s')
        ]),
        transition('true => false', [
            animate('0.3s')
        ]),
    ]);
}

export function menuMiniActive() {
    return trigger('animateMenuMini', [
        state('true', style({
            'width': '93px',
            position: 'absolute',
            'height': '100%'
        })),
        transition('false => true', [
            animate('0.2s')
        ])
    ]);
}
