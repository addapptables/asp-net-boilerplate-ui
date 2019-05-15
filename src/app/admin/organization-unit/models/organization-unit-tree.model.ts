export class OrganizationUnitTreeModel {
    id: number;
    displayName: string;
    parentId: number;
    hasParent: boolean;
    level: number;
    memberCount: number;
    children: OrganizationUnitTreeModel[];
}
