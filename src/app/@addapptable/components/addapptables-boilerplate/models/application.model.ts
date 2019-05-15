export interface IApplicationInfoDto {
    version: string | undefined;
    releaseDate: Date;
    features: { [key: string]: boolean; } | undefined;
}
