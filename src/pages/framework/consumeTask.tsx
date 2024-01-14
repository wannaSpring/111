import type { PageData } from '@/interface';
import type { FrameworkItem } from '@/interface/framework/framework';
import type { FrameWorkMode, Status } from '@/utils/consts';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';

import './index.less';

import { Checkbox, Form, Input, message, Modal, Radio } from 'antd';
import { type FC, useCallback, useState } from 'react';

import { delConsumeTask, getConsumeTask, getFrameworkList } from '@/api/framework.api';
import MyButton from '@/components/basic/button';
import MyPage from '@/components/business/page';
import MyForm from '@/components/core/form';
import MyTable from '@/components/core/table';
import { useLocale } from '@/locales';
import { frameworkDesc, OrderBy, OrderByDesc, StatusDesc } from '@/utils/consts';
import { convertObjectToOptions, transformObject } from '@/utils/formatSearch';
import { useStates } from '@/utils/use-states';

import SelectAllCheckbox from './component/selectAllCheckBox';

const Consumetask: FC = () => {
  const [form] = MyForm.useForm();
  const sortOptions = convertObjectToOptions(OrderByDesc);
  const frameworkModeOptions = [...convertObjectToOptions(frameworkDesc)];
  const statusOptions = [...convertObjectToOptions(StatusDesc)];
  const { formatMessage } = useLocale();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [pageData, setPageData] = useStates<PageData<ParseDataType<S>>>({
    page_size: 50,
    page_no: 1,
    item_count: 0,
    list: [],
    page_count: 0,
  });
  const tableColums = [
    { title: '框架起始时间', width: '200px', dataIndex: 'started_at' },
    { title: '框架ID', width: '200px', dataIndex: 'id' },
    { title: '框架名称', width: '200px', dataIndex: 'name' },
    {
      title: '框架模式',
      width: '200px',
      dataIndex: 'mode',
      render: (mode: FrameWorkMode) => {
        return frameworkDesc[mode];
      },
    },
    {
      title: '当前状态',
      width: '200px',
      dataIndex: 'state',
      render: (state: Status) => {
        return StatusDesc[state];
      },
    },

    { title: '框架目标', width: '200px', dataIndex: 'goal_display' },
    { title: '发生场次', width: '200px', dataIndex: 'live_count' },
    { title: '完成量', width: '200px', dataIndex: 'amount_completed' },
    { title: '完成进度', width: '200px', dataIndex: 'progress' },
    {
      title: '操作',
      width: '200px',
      dataIndex: 'id',
      render: (id: string) => <MyButton onClick={() => onDelete(id)}>作废</MyButton>,
    },
  ];

  const onDelete = (id: string) => {
    delConsumeTask(id)
      .then(() => {
        setIsModalOpen(true);
        message.success(`${id} 框架已被移入回收站`);
      })
      .catch(() => {
        message.error(`操作失败`);
      });
  };

  const getPageData = useCallback(
    async (params: Record<string, any> = {}) => {
      const obj = {
        ...params,
        page_size: pageData.page_size,
        page_no: pageData.page_no,
      };

      console.log(obj);
      const { data } = await getConsumeTask(obj);

      if (data) {
        setPageData({ item_count: data.item_count, list: data.list });
      }
    },
    [pageData.page_size, pageData.page_no],
  );

  const onSearch = (searchParams: Record<string, any>) => {
    getPageData(searchParams);
  };

  const onSubmit = async () => {
    const values = await form.validateFields();

    if (values) {
      onSearch(values);
    }
  };

  const onPageChange = (page_no: number, page_size?: number) => {
    setPageData({ page_no });

    if (page_size) {
      setPageData({ page_size });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="consumeTaskWrap">
      <Form
        form={form}
        className="searchWrap"
        initialValues={{
          modes_json_arr: frameworkModeOptions.map(item => item.value),
          states_json_arr: statusOptions.map(item => item.value),
          order_by: '0',
        }}
      >
        <div className="left">
          <Form.Item name="order_by" label="排列方式">
            <Radio.Group options={sortOptions} />
          </Form.Item>

          <SelectAllCheckbox
            form={form}
            options={frameworkModeOptions}
            initialValues={frameworkModeOptions.map(item => item.value)}
            label={'框架模式'}
            name={'modes_json_arr'}
          ></SelectAllCheckbox>
          <SelectAllCheckbox
            form={form}
            options={statusOptions}
            initialValues={statusOptions.map(item => item.value)}
            label={'当前状态'}
            name={'states_json_arr'}
          ></SelectAllCheckbox>
        </div>

        <div className="right">
          <MyButton type="primary" onClick={onSubmit}>
            {formatMessage({ id: 'component.search.request' })}
          </MyButton>
        </div>
      </Form>
      <div className="table">
        <MyTable
          height="100%"
          dataSource={pageData.list}
          columns={tableColums}
          pagination={{
            current: pageData.page_no,
            pageSize: pageData.page_size,
            total: pageData.item_count,
            onChange: onPageChange,
          }}
        ></MyTable>
      </div>
      <Modal title={'作废'} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        选中的内容将被移入回收站
      </Modal>
    </div>
  );
};

export default Consumetask;
