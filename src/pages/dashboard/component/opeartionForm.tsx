import type { FrameworkItem } from '@/interface/framework/framework';
import type { FrameWorkMode } from '@/utils/consts';

import { Button, Modal, Space } from 'antd';
import dayjs from 'dayjs';
import { type FC, useState } from 'react';

import { getFrameworkList } from '@/api/framework.api';
import { getOperationList } from '@/api/order.api';
import MyButton from '@/components/basic/button';
import MyPage from '@/components/business/page';
import { frameworkDesc } from '@/utils/consts';

const { Item: SearchItem } = MyPage.MySearch;

const OperationTable: FC = () => {
  const [recoverId, setCoverId] = useState('');
  const [editFramework, setEditFramework] = useState<FrameworkItem>();

  const tableColums = [
    { title: '操作账号', width: '200px', dataIndex: 'actor_name' },
    { title: '操作时间', width: '200px', dataIndex: 'created_time_out' },
    { title: '操作事件', width: '200px', dataIndex: 'object_type_out' },
    {
      title: '操作',
      width: '200px',
      dataIndex: 'id',
      render: (id: string, item: FrameworkItem, index: number) => (
        <MyButton onClick={() => showModal(id)} type="primary" disabled={index !== 0}>
          撤回
        </MyButton>
      ),
    },
  ];

  const showModal = (id: string) => {
    setCoverId(id);
  };

  const handleOK = () => {
    console.log(recoverId);
  };

  const handleCancel = () => {
    setCoverId('');
  };

  return (
    <>
      <MyPage className="tableList" pageApi={getOperationList} tableOptions={tableColums}></MyPage>
      <Modal title="撤回操作" onOk={handleOK} onCancel={handleCancel} open={!!recoverId}>
        将撤回此次操作上传的数据文件，数据库中相应数据变更将回滚至上一个版本
      </Modal>
    </>
  );
};

export default OperationTable;
