import type { FrameworkItem } from '@/interface/framework/framework';

import { Button, Cascader, DatePicker, Form, Input, InputNumber, Modal, Radio, Select, Switch, TreeSelect } from 'antd';
import React, { useEffect, useState } from 'react';

import { creatFramework, editFramework } from '@/api/framework.api';
import { frameworkDesc, FrameWorkMode } from '@/utils/consts';

interface FrameworkFormProps {
  open: boolean;
  framework?: FrameworkItem;
  setOpen: (open: boolean) => void;
}

const FrameworkForm: React.FC<FrameworkFormProps> = ({ open, setOpen, framework }) => {
  const [isModalOpen, setIsModalOpen] = useState(open);
  const [form] = Form.useForm();

  useEffect(() => {
    setIsModalOpen(open);
  }, [open]);

  const handleOk = async () => {
    try {
      form.validateFields().then(values => {
        const { product_ids, shop_titles, mode, ...rest } = values;

        const params = {
          ...rest,
          mode: +mode,
          product_ids: product_ids ? product_ids.split(',').map(Number) : [],
          shop_titles: shop_titles ? shop_titles.split(',') : [],
        };

        if (framework) {
          editFramework(params)
            .then(({ data }) => {
              if (data) {
                handleCancel();
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          creatFramework(params)
            .then(({ data }) => {
              if (data) {
                handleCancel();
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    } catch (errorInfo) {
      console.error('Validation failed:', errorInfo);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setOpen(false);
    form.resetFields();
  };

  return (
    <Modal
      title={framework ? `编辑${framework?.name} 框架` : '新建框架'}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} labelCol={{ span: 4 }} layout="horizontal" initialValues={framework}>
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

export default FrameworkForm;
