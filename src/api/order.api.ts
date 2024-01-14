import type { OperationReponse, OrderResult, OverviewReponse, OverviewRequest } from '@/interface/order/order';

import { request } from './request';

/** order */
export const getPurchaseOrder = (data: any) => request<OrderResult>('get', '/orders', data);
/**dashboard */
export const getPurchaseOverview = (data: OverviewRequest) => request<OverviewReponse>('get', '/orders/board', data);
/** operation */
export const getOperationList = (data: any) => request<OperationReponse>('get', '/operation_records', data);
/** 登出接口 */
// export const exportPurchaseOrder = (data: LogoutParams) => request<LogoutResult>('delete', '/user/access_token', data);
