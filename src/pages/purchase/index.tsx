import dayjs from 'dayjs';
import { type FC } from 'react';

import { getPurchaseOrder } from '@/api/order.api';
import MyPage from '@/components/business/page';

const { Item: SearchItem } = MyPage.MySearch;

const PurchasePage: FC = () => {
  // 获取今天的日期

  // 禁止选择今天之后的日期
  const disabledDate = (current: dayjs.ConfigType) => {
    const today = dayjs().startOf('day');

    if (!current) return false; // 允许清空日期
    const currentDate = dayjs(current).startOf('day');

    return currentDate.isAfter(today);
  };

  const tableColums = [
    { title: '店铺名称', width: '200px', dataIndex: 'shop_title' },
    { title: '订单状态', width: '200px', dataIndex: 'state' },
    { title: '子订单号', width: '200px', dataIndex: 'suborder_id_out' },
    { title: '订单成交金额', width: '200px', dataIndex: 'transaction_amount' },
    { title: '订单创建时间', width: '200px', dataIndex: 'created_time_out' },
    { title: '场次id', width: '200px', dataIndex: 'live_id' },
    { title: '开播时间', width: '200px', dataIndex: 'live_start_time' },
    { title: '场次名称', width: '200px', dataIndex: 'live_title' },
    { title: '订单支付金额', width: '200px', dataIndex: 'pay_amount' },
    { title: '订单支付时间', width: '200px', dataIndex: 'pay_time' },
    { title: '商品id', width: '200px', dataIndex: 'product_id_out' },
    { title: '商品标题', width: '200px', dataIndex: 'product_title' },
    { title: '退款金额', width: '200px', dataIndex: 'refund_amount' },
    { title: '退款成功时间', width: '200px', dataIndex: 'refund_time' },

    {
      title: '订单确收时间',
      width: '200px',
      sortable: false,
      dataIndex: 'confirm_time',
    },
  ];

  const createQueryString = (params: Record<string, string | number>): string => {
    const queryString = Object.keys(params)
      .map(key => `${key}=${params[key]}`)
      .join('&');

    return queryString;
  };

  const handleExport = (values: any) => {
    const params = {
      ...values,
      suborder_id_out: values.suborder_id_out ? values.suborder_id_out : '',
      access_token: localStorage.getItem('MyUserInfo'),
    };

    location.href = '/api/v1/orders/export?' + createQueryString(params);
  };

  return (
    <MyPage
      pageApi={getPurchaseOrder}
      exportFunc={handleExport}
      searchRender={
        <>
          <SearchItem name="suborder_id_out" type="input" innerProps={{ placeholder: '请输入订单号' }} />
          <SearchItem
            name={'pay_time_start,pay_time_end'}
            type="rangePicker"
            innerProps={{
              disabledDate,
            }}
          />
        </>
      }
      tableOptions={tableColums}
    ></MyPage>
  );
};

export default PurchasePage;
