export class PermissionTreeModel {
    name: string;
    displayName: string;
    hasParent: boolean;
    children: PermissionTreeModel[];
    level: number;
    parentName: string;
}
