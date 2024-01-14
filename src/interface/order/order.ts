import type { BasicList } from '..';

export interface OrderParams {
  page_no: number;
  page_size: number;
  pay_time_start: string;
  pay_time_end: string;
  suborder_id_out: string;
}

export interface OrderItem {
  id: string;
  live_title: string;
  live_id: string;
  live_start_time: string;
  shop_title: string;
  product_title: string;
  product_id_out: string;
  suborder_id_out: string;
  state: string;
  pay_amount: number;
  transaction_amount: number;
  refund_amount: number;
  created_time_out: string;
  pay_time: string;
  confirm_time: string;
  refund_time: string;
}

export interface OrderResult extends BasicList {
  list: OrderItem[];
}

interface CompleteOrderStat {
  count: number;
  percent: string;
  state: string;
}

interface IncompleteOrderStat {
  count: number;
  day: string;
  source_type_display: string;
}

export interface OverviewReponse {
  complete_order_stats: CompleteOrderStat[];
  import_time_latest: string;
  incomplete_order_stats: IncompleteOrderStat[];
}

export interface OverviewRequest {
  pay_at_max: string;
  pay_at_min: string;
}

export interface OperationItem {
  actor_id: number;
  actor_name: string;
  created_time_out: string;
  id: number;
  object_type_out: string;
}

export interface OperationReponse extends BasicList {
  list: OperationItem[];
}
