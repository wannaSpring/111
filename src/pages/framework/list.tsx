import type { FrameworkItem } from '@/interface/framework/framework';

import './index.less';

import { Button, Modal, Space } from 'antd';
import dayjs from 'dayjs';
import { type FC, useRef, useState } from 'react';

import { getFrameworkList } from '@/api/framework.api';
import MyButton from '@/components/basic/button';
import MyPage from '@/components/business/page';
import { frameworkDesc, FrameWorkMode } from '@/utils/consts';

import FrameworkForm from './component/framewrokForm';
import EditFrameworkForm from './component/framewrokForm/edit';

const { Item: SearchItem } = MyPage.MySearch;

const List: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFramework, setEditFramework] = useState<FrameworkItem | null>(null);
  const childRef = useRef();

  const showModal = (framework?: FrameworkItem) => {
    if (!framework) {
      setIsModalOpen(true);

      return;
    }

    setIsEditModalOpen(true);
    const { product_ids, shop_titles, mode, started_at, goal_display, ...rest } = framework;

    console.log(mode, FrameWorkMode.payment);
    const params = {
      ...rest,
      mode: mode,
      goal: goal_display,
      started_at: dayjs.unix(started_at),
      product_ids: product_ids ? product_ids.join(',') : '',
      shop_titles: shop_titles ? shop_titles.join(',') : '',
    };

    setEditFramework(params as unknown as FrameworkItem);
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

  const onHandleClose = () => {
    setIsModalOpen(false);
    setIsEditModalOpen(false);

    if (childRef.current) {
      childRef.current.load();
    }
  };

  return (
    <>
      <MyPage
        ref={childRef}
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

      <EditFrameworkForm framework={editFramework} open={isEditModalOpen} onHandleClose={onHandleClose} />
      <FrameworkForm open={isModalOpen} onHandleClose={onHandleClose} />
    </>
  );
};

export default List;
