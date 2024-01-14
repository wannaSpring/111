import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';

import './index.less';

import { Checkbox, Divider, Form } from 'antd';
import React, { useEffect, useState } from 'react';

const CheckboxGroup = Checkbox.Group;

interface SelectAllCheckboxProps {
  options: {
    label: string;
    value: any;
    disabled?: boolean;
  }[];
  initialValues: string[];
  label: string;
  name: string;
  form: any;
}

const SelectAllCheckbox: React.FC<SelectAllCheckboxProps> = ({ options, initialValues, label, name, form }) => {
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(initialValues);
  const [checkAll, setCheckAll] = useState<boolean>(initialValues.length === options.length);

  useEffect(() => {
    setCheckAll(checkedList.length === options.length);
  }, [checkedList, options]);

  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
    setCheckAll(list.length === options.length);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    const newCheckedList = e.target.checked ? options.map(item => item.value) : [];

    setCheckedList(newCheckedList);
    form.setFieldValue(name, newCheckedList);
    setCheckAll(e.target.checked);
  };

  return (
    <div className="allSelectCheckbox">
      <span className="label">{`${label}: `}</span>
      <Checkbox indeterminate={!checkAll && checkedList.length > 0} checked={checkAll} onChange={onCheckAllChange}>
        全选
      </Checkbox>
      <Form.Item name={name}>
        <CheckboxGroup options={options} value={checkedList} onChange={onChange} />
      </Form.Item>
    </div>
  );
};

export default SelectAllCheckbox;
