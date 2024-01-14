import type { FrameworkItem } from '@/interface/framework/framework';

import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

import { creatFramework, editFramework } from '@/api/framework.api';
import { frameworkDesc, FrameWorkMode } from '@/utils/consts';

interface EditFrameworkFormProps {
  open: boolean;
  framework: FrameworkItem | null;
  onHandleClose: () => void;
}

const EditFrameworkForm: React.FC<EditFrameworkFormProps> = ({ open, framework, onHandleClose }) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      form.validateFields().then(values => {
        const { product_ids, shop_titles, mode, started_at, ...rest } = values;
        const params = {
          ...rest,
          mode: +mode,
          started_at: dayjs(started_at).unix(),
        };

        if (product_ids) {
          params.product_ids = product_ids.split(',');
        }

        if (shop_titles) {
          params.product_ids = shop_titles.split(',');
        }

        if (framework) {
          editFramework(framework.id, params)
            .then(({ data, message: msg }) => {
              // if (data) {
              handleCancel();
              message.success(`${framework.name} 框架已修改`);
              // }
            })
            .catch(err => {
              console.log(err, 'err');
            });
        }
      });
    } catch (errorInfo) {
      console.error('Validation failed:', errorInfo);
    }
  };

  const handleCancel = () => {
    onHandleClose();
  };

  return (
    <Modal
      title={framework ? `编辑 ${framework?.name} 框架` : '新建框架'}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose
    >
      <Form form={form} labelCol={{ span: 4 }} layout="horizontal" initialValues={framework || {}} preserve={false}>
        <Form.Item label="框架名称" name="name" rules={[{ required: true, message: '请输入框架名称' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="起始时间" name="started_at" rules={[{ required: true, message: '请选择起始时间' }]}>
          <DatePicker />
        </Form.Item>
        <Form.Item label="框架模式" name="mode" rules={[{ required: true, message: '请选择框架模式' }]}>
          <Radio.Group>
            <Radio value={FrameWorkMode.payment}>{frameworkDesc[FrameWorkMode.payment]}</Radio>
            <Radio value={FrameWorkMode.transaction}>{frameworkDesc[FrameWorkMode.transaction]}</Radio>
            <Radio value={FrameWorkMode.withdrawal}>{frameworkDesc[FrameWorkMode.withdrawal]}</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="框架目标" name="goal" rules={[{ required: true, message: '请输入框架目标' }]}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="商铺名称" name="shop_titles">
          <Input />
        </Form.Item>
        <Form.Item label="商品ID" name="product_ids">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditFrameworkForm;
