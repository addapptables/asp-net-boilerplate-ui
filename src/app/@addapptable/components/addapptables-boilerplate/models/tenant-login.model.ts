export interface ITenantLoginInfoDto {
    tenancyName: string;
    name: string;
    id: number;
    editionId: number;
    subscriptionEndDate: Date;
    isInTrialPeriod: boolean;
    isSubscriptionExpired: boolean;
}
