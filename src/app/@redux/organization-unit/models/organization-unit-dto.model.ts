export class OrganizationUnitDto {
    id: number;
    parentId: number;
    code: string;
    displayName: string;
    memberCount: number;
    lastModificationTime: Date;
    lastModifierUserId: number;
    creationTime: Date;
    creatorUserId: number;
}
