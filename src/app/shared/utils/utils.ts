import { pickBy, mapValues, identity } from 'lodash';

export function removeEmptyOrNil(object: any) {
    if (typeof object === 'object') {
        const removeEmtpyParams = pickBy(object, identity);
        const params = mapValues(removeEmtpyParams, (v) => {
            if (v instanceof Date) {
                return v.toUTCString();
            }
            if (Array.isArray(v)) {
                return v;
            }
            if (typeof v === 'object') {
                return removeEmptyOrNil(v);
            }
            return String(v);
        });
        return params;
    }
    return object;
}
