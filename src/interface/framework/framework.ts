import type { BasicList } from '..';

export interface FrameworkItem {
  code: string;
  exclude_refund_days: number;
  goal_display: string;
  id: number;
  is_recycle: number;
  mode: number;
  name: string;
  product_ids: number[];
  remark: string;
  shop_titles: string[];
  started_at: number;
}

export interface FramewrokListResponse extends BasicList {
  list: FrameworkItem[];
}

export interface FramewrokResponse {
  id: number;
}

export interface ConsumeTaskItem {
  amount_completed: string;
  goal_display: string;
  id: number;
  live_count: number;
  mode_display: string;
  name: string;
  progress: string;
  started_time: string;
  state: number;
}

export interface ConsumeTaskResponse extends BasicList {
  list: ConsumeTaskItem[];
}
