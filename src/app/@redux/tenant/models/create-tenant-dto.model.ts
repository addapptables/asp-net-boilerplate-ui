export class CreateTenantDto {
    tenancyName: string;
    name: string;
    adminEmailAddress: string;
    connectionString: string;
    editionId: number;
    isActive: boolean;
}
