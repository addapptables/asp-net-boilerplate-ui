import { EditionMinimalDto } from '@redux/edition/models/edition-minimal-dto.model';

export class TenantDto {
    tenancyName: string;
    name: string;
    isActive: boolean;
    editionId: number;
    connectionString: string;
    edition: EditionMinimalDto;
    subscriptionEndDate: Date;
    isInTrialPeriod: boolean;
    isSubscriptionExpired: boolean;
    nextPrice: number;
    id: number;
}
