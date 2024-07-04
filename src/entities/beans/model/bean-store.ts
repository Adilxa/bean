import { makeAutoObservable, runInAction } from "mobx";
import { QueryParams, Bean, Pagination } from "../../../shared/api/beens/model";
import { getBeans, getBeanById, updateBean, BeanResponse } from "../../../shared/api/beens";

class BeanStore {
    beanList: Bean[] = [];
    bean?: Bean;
    isLoading = false;
    beanListError = "";
    beanError = "";
    isUpdateLoading = false;
    pageIndex = 1;
    hasMore = true;
    currentParams: QueryParams = {};

    constructor() {
        makeAutoObservable(this);
    }

    getBeanList = async (params: QueryParams = {}, withPagination = true) => {
        if (this.isLoading || (!withPagination && !this.hasMore)) return;

        try {
            this.isLoading = true;
            const paginationParams: Pagination = withPagination ? { pageIndex: this.pageIndex, pageSize: 10 } : {};
            const combinedParams = { ...this.currentParams, ...params, ...paginationParams };
            const response: BeanResponse = await getBeans(combinedParams);
            runInAction(() => {
                this.isLoading = false;
                if (withPagination && response.items.length < paginationParams.pageSize) {
                    this.hasMore = false;
                }
                this.beanList = withPagination ? [...this.beanList, ...response.items] : response.items;
                if (withPagination) {
                    this.pageIndex += 1;
                }
                if (!withPagination) {
                    this.currentParams = { ...params };
                }
            });
        } catch (err: Error | any) {
            if (err instanceof Error) {
                runInAction(() => {
                    this.isLoading = false;
                    this.beanListError = err.message;
                });
            }
        }
    };

    getBean = async (id: string | number) => {
        try {
            this.isLoading = true;
            const data = await getBeanById(id);
            runInAction(() => {
                this.isLoading = false;
                this.bean = data;
            });
        } catch (err: Error | any) {
            if (err instanceof Error) {
                runInAction(() => {
                    this.isLoading = false;
                    this.beanError = err.message;
                });
            }
        }
    };

    updateBean = async (bean: Bean) => {
        try {
            this.isUpdateLoading = true;
            await updateBean(bean);
            runInAction(() => {
                this.isUpdateLoading = false;
            });
        } catch (e) {
            runInAction(() => {
                this.isUpdateLoading = false;
            });
            throw e;
        }
    };

    resetBeanList = () => {
        this.beanList = [];
        this.pageIndex = 1;
        this.hasMore = true;
    };
}

export const beanStore = new BeanStore();
