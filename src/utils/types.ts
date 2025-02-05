export type Item = {
    id: string;
    name: string;
    measurement_units: string;
    description?: string;
    code?: string;
};

export enum SortOrder {
    ASC = "ASC",
    DESC = "DESC",
}
