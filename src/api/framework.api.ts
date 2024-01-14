import type {
  ConsumeTaskResponse,
  FrameworkItem,
  FramewrokListResponse,
  FramewrokResponse,
} from '@/interface/framework/framework';

import { request } from './request';

/** order */
export const getFrameworkList = (data: any) => request<FramewrokListResponse>('get', '/frames', data);
// creat
export const creatFramework = (data: FrameworkItem) => request<FramewrokResponse>('post', '/frames', data);
// edit
export const editFramework = (id: number, data: FrameworkItem) =>
  request<FramewrokResponse>('put', `/frames/${id}`, data);
// consume
export const getConsumeTask = (data: any) => request<ConsumeTaskResponse>('get', '/frame_tasks', data);
//delete consume
export const delConsumeTask = (id: string) => request<ConsumeTaskResponse>('delete', `/frame_tasks/${id}`);
