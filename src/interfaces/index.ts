export * from "./movie";
export * from "./quote";

export interface LordOfTheRingConfigOptions {
    accessToken: string;
}

interface GenericType {
    [key: string]: any;
}

type PaginationOptions = {
    page?: number;
    limit?: number;
    offset?: number;
};

type SortOptions = {
    [key: string]: "asc" | "desc";
};

enum Symbol {
    EqualTo = "$eq",
    GreaterThan = "$gt",
    LessThan = "$lt",
    GreaterThanOrEqualTo = "$gte",
    LessThanOrEqualTo = "$lte",
}

export type FilterOptions = {
    [key: string]: {
        [Symbol.EqualTo]?: string | number;
        [Symbol.GreaterThan]?: string | number;
        [Symbol.LessThan]?: string | number;
        [Symbol.LessThanOrEqualTo]?: string | number;
        [Symbol.GreaterThanOrEqualTo]?: string | number;
    };
};

export type FetchOptions = PaginationOptions & {
    sort?: SortOptions;
    filter?: FilterOptions;
};

export interface PaginationResponseData {
    page: number;
    limit: number;
    pages: number;
    total: number;
}

export interface FetchQueryResponse<D = GenericType> {
    meta?: PaginationResponseData;
    data: D;
}
