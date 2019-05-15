import { FormattedStringValueExtracter } from './formatted-string-value-extracter';

export class SubdomainTenancyNameFinder {
    static getCurrentTenancyNameOrNull(rootAddress: string, tenancyNamePlaceHolderInUrl: string): string {
        if (rootAddress.indexOf(tenancyNamePlaceHolderInUrl) < 0) {
            return null;
        }
        const currentRootAddress = document.location.href;
        const formattedStringValueExtracter = new FormattedStringValueExtracter();
        const values: any[] = formattedStringValueExtracter.IsMatch(
            currentRootAddress,
            rootAddress,
        );
        if (!values.length) {
            return null;
        }

        return values[0];
    }
}
