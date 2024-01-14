import type { MyAsideProps } from '../aside';
import type { MyRadioCardssOption } from '../radio-cards';
import type { MyTabsOption } from '../tabs';
import type { MyResponse } from '@/api/request';
import type { PageData } from '@/interface';
import type { FormInstance } from 'antd';
import type { ColumnsType } from 'antd/es/table/interface';

import { css } from '@emotion/react';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';

import MyTable from '@/components/core/table';
import { useStates } from '@/utils/use-states';

import MyAside from '../aside';
import MyRadioCards from '../radio-cards';
import MySearch from '../search';
import MyTabs from '../tabs';

interface SearchApi {
  (params?: any): MyResponse<PageData<any>>;
}

type ParseDataType<S> = S extends (params?: any) => MyResponse<PageData<infer T>> ? T : S;

export type MyPageTableOptions<S> = ColumnsType<S>;
export interface PageProps<S> {
  searchRender?: React.ReactNode;
  pageApi?: S;
  exportFunc?: (value: any) => void;
  onFormChange?: (values: FormInstance<S>) => void;
  pageParams?: object;
  tableOptions?: MyPageTableOptions<ParseDataType<S>>;
  tableRender?: (data: MyPageTableOptions<ParseDataType<S>>[]) => React.ReactNode;
  extraOperationRender?: React.ReactNode;
  asideData?: MyAsideProps['options'];
  asideKey?: string;
  asideValue?: string | number;
  radioCardsData?: MyRadioCardssOption[];
  radioCardsValue?: string | number;
  asideTreeItemRender?: MyAsideProps['titleRender'];
  tabsData?: MyTabsOption[];
  tabsValue?: string | number;
  className?: string;
}

export interface RefPageProps {
  setAsideCheckedKey: (key?: string) => void;
  load: (data?: object) => Promise<void>;
}

const BasePage = <S extends SearchApi>(props: PageProps<S>, ref: React.Ref<RefPageProps>) => {
  const {
    pageApi,
    pageParams,
    searchRender,
    extraOperationRender,
    exportFunc,
    tableOptions,
    tableRender,
    asideKey,
    asideData,
    asideValue,
    onFormChange,
    asideTreeItemRender,
    radioCardsData,
    radioCardsValue,
    tabsData,
    tabsValue,
    className,
  } = props;
  const [pageData, setPageData] = useStates<PageData<ParseDataType<S>>>({
    page_size: 50,
    page_no: 1,
    item_count: 0,
    list: [],
    page_count: 0,
  });

  const [asideCheckedKey, setAsideCheckedKey] = useState(asideValue);

  useEffect(() => {
    if (asideData) {
      setAsideCheckedKey(asideData[0].key);
    }
  }, [asideData]);

  const getPageData = useCallback(
    async (params: Record<string, any> = {}) => {
      if (asideKey && !asideCheckedKey) return;

      if (pageApi) {
        const obj = {
          ...params,
          ...pageParams,
          page_size: pageData.page_size,
          page_no: pageData.page_no,
          [asideKey!]: asideCheckedKey,
        };
        const { data } = await pageApi(obj);

        if (data) {
          setPageData({ item_count: data.item_count, list: data.list });
        }
      }
    },
    [pageApi, pageParams, asideKey, asideCheckedKey, pageData.page_size, pageData.page_no],
  );

  useEffect(() => {
    getPageData();
  }, [getPageData]);

  const onSearch = (searchParams: Record<string, any>) => {
    getPageData(searchParams);
  };

  const onSelectAsideTree: MyAsideProps['onSelect'] = ([key]) => {
    setAsideCheckedKey(key);
  };

  const onPageChange = (page_no: number, page_size?: number) => {
    setPageData({ page_no });

    if (page_size) {
      setPageData({ page_size });
    }
  };

  useImperativeHandle(ref, () => ({
    setAsideCheckedKey,
    load: (data?: object) => getPageData(data),
  }));

  return (
    <div css={styles} className={className}>
      {tabsData && <MyTabs className="tabs" options={tabsData} defaultValue={tabsData[0].value || tabsValue} />}
      <div className="tabs-main">
        {asideData && (
          <MyAside
            options={asideData}
            selectedKeys={asideCheckedKey ? [asideCheckedKey] : undefined}
            titleRender={asideTreeItemRender}
            onSelect={onSelectAsideTree}
          />
        )}
        <div className="aside-main">
          {searchRender && (
            <MySearch
              className="search"
              onSearch={onSearch}
              onFormChange={onFormChange}
              exportFunc={exportFunc}
              extraOperationRender={extraOperationRender}
            >
              {searchRender}
            </MySearch>
          )}
          {radioCardsData && (
            <MyRadioCards options={radioCardsData} defaultValue={radioCardsValue || radioCardsData[0].value} />
          )}
          {tableOptions && (
            <div className="table">
              <MyTable
                height="100%"
                dataSource={pageData.list}
                columns={tableOptions}
                pagination={{
                  current: pageData.page_no,
                  pageSize: pageData.page_size,
                  total: pageData.item_count,
                  onChange: onPageChange,
                }}
              >
                {tableRender?.(pageData.list)}
              </MyTable>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const BasePageRef = forwardRef(BasePage) as <S extends SearchApi>(
  props: PageProps<S> & { ref?: React.Ref<RefPageProps> },
) => React.ReactElement;

type BasePageType = typeof BasePageRef;

interface MyPageType extends BasePageType {
  MySearch: typeof MySearch;
  MyTable: typeof MyTable;
  MyAside: typeof MyAside;
}

const MyPage = BasePageRef as MyPageType;

MyPage.MySearch = MySearch;
MyPage.MyTable = MyTable;
MyPage.MyAside = MyAside;

export default MyPage;

const styles = css`
  display: flex;
  flex-direction: column;
  .tabs-main {
    flex: 1;
    display: flex;
    overflow: hidden;
  }
  .search {
    margin-bottom: 10px;
  }

  .aside-main {
    display: flex;
    flex: 1;
    overflow: hidden;
    flex-direction: column;
    @media screen and (max-height: 800px) {
      overflow: auto;
    }
  }

  .table {
    flex: 1;
    overflow: hidden;
    @media screen and (max-height: 800px) {
      overflow: auto;
      min-height: 500px;
    }
  }
`;
