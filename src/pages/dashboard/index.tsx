import type { PageData } from '@/interface';
import type { OverviewReponse } from '@/interface/order/order';
import type { FrameWorkMode, Status } from '@/utils/consts';

import './index.less';

import { UploadOutlined } from '@ant-design/icons';
import { Checkbox, DatePicker, Form, Input, message, Modal, Radio, Spin, Upload } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import { type FC, useCallback, useState } from 'react';

import { getPurchaseOverview } from '@/api/order.api';
import MyButton from '@/components/basic/button';
import MyForm from '@/components/core/form';
import MyTable from '@/components/core/table';
import { useLocale } from '@/locales';

import OperationTable from './component/opeartionForm';

const { RangePicker } = DatePicker;

const DashBoardPage: FC = () => {
  const [form] = MyForm.useForm();
  const { formatMessage } = useLocale();
  const [data, setData] = useState<OverviewReponse>();
  const [isUploading, setIsUploading] = useState(false);

  const incompleteColums = [
    {
      title: '订单日期',
      width: '200px',
      dataIndex: 'day',
      render: (day: string) => {
        return dayjs(day);
      },
    },
    { title: '缺失部分', width: '200px', dataIndex: 'source_type_display' },

    { title: '缺失条数', width: '200px', dataIndex: 'count', render: (count: string) => `${count} 条` },
  ];

  const handleUpload = async (options: { file: any; onSuccess: any; onError: any }) => {
    const { file, onSuccess, onError } = options;
    const formData = new FormData();

    formData.append('files', file);

    try {
      setIsUploading(true);
      const response = await axios.post('/api/v1/orders', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Token': localStorage.getItem('MyUserInfo') as string,
        },
      });

      onSuccess(response.data);
      message.success('上传成功');
    } catch (error) {
      onError(error);
      message.error('上传失败');
    } finally {
      setIsUploading(false);
    }
  };

  const handleChange = (info: { file: { status: string; name: any } }) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 文件上传成功.`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 文件上传失败.`);
    }
  };

  const onSubmit = async () => {
    const values = await form.validateFields();
    const params = {
      pay_time_max: values.pay_time[0],
      pay_time_min: values.pay_time[1],
    };

    getPurchaseOverview(params).then(({ data }) => {
      setData(data);
    });
  };

  return (
    <div className="DashBoardPageWrap">
      <Form form={form} className="searchWrap">
        <div className="left">
          <Form.Item name="pay_time" label="数据筛选" rules={[{ required: true, message: '请选择时间范围' }]}>
            <RangePicker />
          </Form.Item>
        </div>

        <MyButton type="primary" onClick={onSubmit}>
          {formatMessage({ id: 'component.search.request' })}
        </MyButton>
        <Upload multiple accept=".xlsx, .xls" customRequest={handleUpload} onChange={handleChange} fileList={[]}>
          <MyButton type="primary" onClick={onSubmit} icon={<UploadOutlined />} loading={isUploading}>
            {formatMessage({ id: 'component.search.import' })}
          </MyButton>
        </Upload>
      </Form>
      <div className="table">
        异常数据：数据库创建信息握手过程中，存在单方面表格信息未导入。
        <MyTable height="100%" dataSource={data?.incomplete_order_stats} columns={incompleteColums}></MyTable>
      </div>
      <OperationTable />
    </div>
  );
};

export default DashBoardPage;
