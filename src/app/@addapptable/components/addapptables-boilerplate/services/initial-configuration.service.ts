import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ConfigurationModel } from '../models/configuration.model';
import { SubdomainTenancyNameFinder } from '../helpers/subdomain-tenancy-name-finder.helper';
import { PlatformLocation } from '@angular/common';


@Injectable()
export class InitialConfigurationService {

    private configurationModel: ConfigurationModel;

    constructor(private _http: HttpClient) { }

    get configuration() {
        return this.configurationModel;
    }

    loadInitialConfiguration(platformLocation: PlatformLocation) {
        const baseHrefFromDOM = platformLocation.getBaseHrefFromDOM();
        const appBaseUrl = document.location.origin + baseHrefFromDOM;
        return this._http.get<ConfigurationModel>(appBaseUrl + '/assets/app-configuration.json').pipe(
            tap((result) => {
                this.configurationModel = result;
                const tenancyName = SubdomainTenancyNameFinder.getCurrentTenancyNameOrNull(
                    result.appBaseUrl,
                    result.tenancyNamePlaceHolderInUrl
                );
                this.configurationModel.appBaseUrlFormat = result.appBaseUrl;
                if (tenancyName == null) {
                    this.configurationModel.appBaseUrl = result.appBaseUrl.replace(
                        this.configurationModel.tenancyNamePlaceHolderInUrl + '.',
                        '',
                    ) + baseHrefFromDOM;
                    this.configurationModel.remoteServiceBaseUrl = result.remoteServiceBaseUrl.replace(
                        this.configurationModel.tenancyNamePlaceHolderInUrl + '.',
                        '',
                    ) + baseHrefFromDOM;
                } else {
                    this.configurationModel.appBaseUrl = result.appBaseUrl.replace(
                        this.configurationModel.tenancyNamePlaceHolderInUrl,
                        tenancyName,
                    ) + baseHrefFromDOM;
                    this.configurationModel.remoteServiceBaseUrl = result.remoteServiceBaseUrl.replace(
                        this.configurationModel.tenancyNamePlaceHolderInUrl,
                        tenancyName,
                    ) + baseHrefFromDOM;
                }
            })
        );
    }
}
