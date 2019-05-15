export class RoleDto {
    id: number;
    name: string;
    displayName: string;
    normalizedName: string;
    description: string;
    isStatic: boolean;
    permissions: string[];
}
