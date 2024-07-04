import { httpClient } from "../http-client";
import { QueryParams, Bean, Pagination } from "./model";

const SLUG = "beans";

export type BeanResponse = {
    items: Bean[];
    totalCount: number;
    pageSize: number;
    currentPage: number;
    totalPages: number;
};

export const getBeans = (params: QueryParams & Pagination & any): Promise<BeanResponse> => {
    const searchParams = new URLSearchParams();
    Object.keys(params).forEach(key => {
        if (params[key] !== undefined) {
            searchParams.set(key, String(params[key]));
        }
    });
    return httpClient.get(`${SLUG}?${searchParams.toString()}`).json<BeanResponse>();
};

export const getBeanById = (id: number | string): Promise<Bean> => {
    return httpClient.get(`${SLUG}/${id}`).json<Bean>();
};

export const updateBean = (bean: Bean): Promise<Bean> => {
    return httpClient.put(`${SLUG}/${bean.beanId}`, { json: bean }).json<Bean>();
};
