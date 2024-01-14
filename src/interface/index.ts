export interface Locales<T = any> {
  /** Chinese */
  zh_CN: T;
  /** English */
  en_US: T;
}

export type Language = keyof Locales;

export interface PageData<T> {
  page_no: number;
  page_size: number;
  page_count: number;
  item_count: number;
  list: T[];
}

export interface BasicList {
  page_no: number;
  page_size: number;
  page_count: number;
  item_count: number;
}
