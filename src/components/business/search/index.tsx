import type { MyFormProps } from '@/components/core/form';
import type { FormInstance } from 'antd';

import { css } from '@emotion/react';

import MyButton from '@/components/basic/button';
import MyForm from '@/components/core/form';
import { useLocale } from '@/locales';
import { transformObject } from '@/utils/formatSearch';

interface SearchProps<T> extends MyFormProps<T> {
  onSearch: (values: T) => void;
  onFormChange: (values: FormInstance<T>) => void;
  exportFunc?: (values: T) => void;
  extraOperationRender?: React.ReactNode;
}

const BaseSearch = <T extends object>(props: SearchProps<T>) => {
  const { children, onSearch, onFormChange, exportFunc, extraOperationRender, ...rest } = props;
  const [form] = MyForm.useForm<T>();
  const { formatMessage } = useLocale();

  const onSubmit = async () => {
    const values = await form.validateFields();

    if (values) {
      onSearch(transformObject(values));
    }
  };

  const onExport = async () => {
    const values = await form.validateFields();

    if (values && exportFunc) {
      exportFunc(transformObject(values));
    }
  };

  const onChange = async () => {
    // const values = form.getFieldsValue();

    onFormChange(form);
  };

  return (
    <div css={styles}>
      <MyForm {...rest} form={form} layout="inline" onChange={onChange}>
        {children}
        <MyForm.Item>
          <MyButton type="primary" onClick={onSubmit}>
            {formatMessage({ id: 'component.search.request' })}
          </MyButton>

          <MyButton onClick={() => form.resetFields()}>{formatMessage({ id: 'component.search.reset' })}</MyButton>
          {exportFunc ? (
            <MyButton onClick={onExport}>{formatMessage({ id: 'component.search.export' })}</MyButton>
          ) : null}
        </MyForm.Item>
        {extraOperationRender ? extraOperationRender : null}
      </MyForm>
    </div>
  );
};

const MySearch = Object.assign(BaseSearch, {
  Item: MyForm.Item,
});

export default MySearch;

const styles = css`
  padding: 0 8px;
  .ant-form-item {
    // margin-bottom: 20px;
  }
`;
