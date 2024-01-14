export function formatSearch(se: string) {
  se = decodeURIComponent(se);
  se = se.substr(1); //从起始索引号提取字符串中指定数目的字符
  const arr = se.split('&'); //把字符串分割为字符串数组
  const obj: Record<string, string> = {};
  let newarr = [];

  arr.forEach((v, i) => {
    //数组遍历
    console.log(v);
    console.log(i);
    newarr = v.split('=');

    if (typeof obj[newarr[0]] === 'undefined') {
      obj[newarr[0]] = newarr[1];
    }
  });

  return obj;
}

export function transformObject<T extends Record<string, any>>(obj: T): T {
  const newObj: { [key: string]: any } = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && key.includes(',')) {
      const newKeys = key.split(',').map(k => k.trim());
      const values = obj[key];

      newKeys.forEach((newKey, index) => {
        newObj[newKey] = Array.isArray(values) ? values[index] : values;
      });
    } else {
      newObj[key] = obj[key];
    }
  }

  return newObj as T;
}

interface Option {
  label: string;
  value: string;
}

export const convertObjectToOptions = (obj: Record<string, string>): Option[] => {
  return Object.entries(obj).map(([value, label]) => ({
    label,
    value,
  }));
};

export const checkModes = (arr: string[], frameworkModeOptions: any[], symbol: string): number[] => {
  const defaultAllSelect = arr.length === 1 && arr.includes(symbol);
  const allSelect = arr.length === frameworkModeOptions.length - 1 && !arr.includes(symbol);

  const includesNegativeOne = defaultAllSelect || allSelect;

  const newValue = includesNegativeOne
    ? frameworkModeOptions.map(item => item.value)
    : arr.filter(item => item > symbol);

  return newValue;
};
