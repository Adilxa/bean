export type Bean = {
    beanId: number | string;
    groupName: string[];
    ingredients: string[];
    flavorName: string;
    description: string;
    colorGroup: string;
    backgroundColor: string;
    imageUrl: string;
    glutenFree: boolean;
    sugarFree: boolean;
    seasonal: boolean;
    kosher: boolean;
}


export type QueryParams = {
    groupName?: string;
    flavorName?: string;
    colorGroup?: string;
    glutenFree?: boolean;
    sugarFree?: boolean;
    seasonal?: boolean;
    kosher?: boolean;
    withPagination?: boolean
}


export type Pagination = {
    pageIndex?: any;
    pageSize?: any;
    withPagination?: boolean
}