import type { FrameworkItem } from '@/interface/framework/framework';
import type { FrameWorkMode } from '@/utils/consts';

import './index.less';

import { Button, Modal, Space } from 'antd';
import dayjs from 'dayjs';
import { type FC, useState } from 'react';

import { getFrameworkList } from '@/api/framework.api';
import MyButton from '@/components/basic/button';
import MyPage from '@/components/business/page';
import { frameworkDesc } from '@/utils/consts';

import FrameworkForm from './component/framewrokForm';

const { Item: SearchItem } = MyPage.MySearch;

const List: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editFramework, setEditFramework] = useState<FrameworkItem>();

  const showModal = (framework?: FrameworkItem) => {
    setIsModalOpen(true);

    if (framework) {
      const { product_ids, shop_titles, mode, started_at, goal_display, ...rest } = framework;

      const params = {
        ...rest,
        mode: mode.toString(),
        goal: +goal_display,
        started_at: dayjs(started_at),
        product_ids: product_ids ? product_ids.join(',') : '',
        shop_titles: shop_titles ? shop_titles.join(',') : '',
      };

      setEditFramework(params as unknown as FrameworkItem);
    }
  };

  const tableColums = [
    { title: '框架起始时间', width: '200px', dataIndex: 'started_at' },
    { title: '框架ID', width: '200px', dataIndex: 'id' },
    { title: '除退天数', width: '200px', dataIndex: 'exclude_refund_days' },
    { title: '框架名称', width: '200px', dataIndex: 'name' },
    {
      title: '框架模式',
      width: '200px',
      dataIndex: 'mode',
      render: (mode: FrameWorkMode) => {
        return frameworkDesc[mode];
      },
    },
    { title: '框架目标', width: '200px', dataIndex: 'goal_display' },
    {
      title: '操作',
      width: '200px',
      dataIndex: 'live_id',
      render: (id, item: FrameworkItem) => (
        <MyButton onClick={() => showModal(item)} type="primary">
          编辑
        </MyButton>
      ),
    },
  ];

  return (
    <>
      <MyPage
        className="tableList"
        pageApi={getFrameworkList}
        searchRender={
          <>
            <SearchItem name="name_like" type="input" innerProps={{ placeholder: '请输入框架名称' }} />
          </>
        }
        extraOperationRender={
          <div className="operationWrap">
            <Button type="primary" onClick={() => showModal()}>
              新增框架
            </Button>
          </div>
        }
        tableOptions={tableColums}
      ></MyPage>
      <FrameworkForm framework={editFramework} open={isModalOpen} setOpen={v => setIsModalOpen(v)} />
    </>
  );
};

export default List;
