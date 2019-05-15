import { Injector } from '@angular/core';
import { AppSessionService } from './services/app-session.service';
import { InitialConfigurationService } from './services/initial-configuration.service';
import { switchMap, finalize } from 'rxjs/operators';
import { PlatformLocation } from '@angular/common';
import { Type } from '@angular/core';

export function appInitializerFactory(injector: Injector) {
    return () => {
        return new Promise<boolean>((resolve) => {
            const typeInicialConfiguration = InitialConfigurationService as Type<InitialConfigurationService>;
            const initialConfigurationService = injector.get<InitialConfigurationService>(typeInicialConfiguration);
            const platformLocation: PlatformLocation = injector.get<PlatformLocation>(PlatformLocation as Type<PlatformLocation>);
            initialConfigurationService.loadInitialConfiguration(platformLocation).pipe(
                switchMap(() => {
                    const appSessionService: AppSessionService = injector.get(AppSessionService);
                    return appSessionService.init();
                })
            ).pipe(
                finalize(() => resolve())
            )
                .subscribe(() => {
                    resolve();
                });
        });
    };
}
