import type { Response } from '../api/request';
import type { PageData } from '@/interface';

import Mock from 'mockjs';

import { getTableData } from '@/utils/get-table-page-data';

Mock.setup({
  timeout: 300,
});

export type ArrayElementType<T> = T extends (infer U)[] ? U : any; // Mock the real back-end api structure.

interface PageParams {
  page_size?: number;
  page_no?: number;
}

export function intercepter<T>(data: T): Response<T>;
export function intercepter<T>(data: T, page: PageParams): Response<PageData<T>>;

export function intercepter(data: any, page?: PageParams) {
  if (page) {
    const res = getTableData(Number(page.page_size), Number(page.page_no), data);

    return {
      code: true,
      message: '成功',
      data: res,
    };
  } else {
    return {
      code: true,
      message: '成功',
      data: data,
    };
  }
}

export const mock = Mock;
