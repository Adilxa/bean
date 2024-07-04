import { observer } from "mobx-react-lite";
import { BeanRow, beanModel } from "../../../entities/beans";
import { Result, Space, Spin } from "antd";
import { Bean } from "../../../shared/api/beens/model";
import { useEffect, useRef, useCallback } from "react";
import { BeanFilter } from "../../../features/bean-filter";
import { QueryParams } from "../../../shared/api/beens/model";

export const BeanListPage = observer(() => {
    const { beanStore: { beanListError, isLoading, beanList, getBeanList, hasMore, resetBeanList, currentParams } } = beanModel;
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !isLoading) {
            getBeanList(currentParams, true);
        }
    }, [getBeanList, hasMore, isLoading, currentParams]);

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, {
            root: null,
            rootMargin: "10px",
            threshold: 1.0,
        });

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => {
            if (loadMoreRef.current) {
                observer.unobserve(loadMoreRef.current);
            }
        };
    }, [handleObserver]);

    useEffect(() => {
        getBeanList({}, true);
    }, [getBeanList]);

    const handleFilterChange = (params: QueryParams) => {
        resetBeanList();
        getBeanList(params, false);
    };

    if (beanListError) {
        return <Result status="error" title="Error" subTitle={beanListError} />;
    }

    return (
        <Space direction="vertical" align="center" className="container" style={{ width: "100%", padding: '20px', backgroundColor: '#f0f2f5', minHeight: "100vh" }} size="large">
            <BeanFilter onChange={handleFilterChange} />
            <div style={{
                display: "grid",
                gap: '15px',
                gridTemplateColumns: "1fr 1fr 1fr",
                width: '100%',
            }}>
                {beanList?.map((el: Bean) => (
                    <BeanRow
                        key={el.beanId}
                        {...el}
                    />
                ))}

            </div>

            {
                isLoading == false &&
                !beanList.length &&
                <Result title="No data with this criteria)" />
            }
            {isLoading && <Spin size="large" style={{ margin: '20px 0' }} />}
            <div ref={loadMoreRef} />
        </Space>
    );
});
