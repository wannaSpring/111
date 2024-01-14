import type { MenuList } from '@/interface/layout/menu.interface';

const localMenuList: MenuList = [
  {
    code: 'dashboard',
    label: {
      zh_CN: '首页',
      en_US: 'Dashboard',
    },
    icon: 'dashboard',
    path: '/dashboard',
  },
  {
    code: 'purchase',
    label: {
      zh_CN: '订单',
      en_US: 'Purchase Order',
    },
    icon: 'purchase',
    path: '/purchase',
  },
  {
    code: 'framework',
    label: {
      zh_CN: '框架',
      en_US: 'framework',
    },
    icon: 'framework',
    path: '/framework',
    children: [
      {
        code: 'frameworkList',
        label: {
          zh_CN: '框架清单',
          en_US: 'List Of Framework',
        },
        path: '/framework/list',
      },
      {
        code: 'consumeTake',
        label: {
          zh_CN: '消耗任务',
          en_US: 'Consume Task',
        },
        path: '/framework/consumeTake',
      },
    ],
  },

  // {
  //   code: 'guide',
  //   label: {
  //     zh_CN: '引导',
  //     en_US: 'Guide',
  //   },
  //   icon: 'guide',
  //   path: '/guide',
  // },
  // {
  //   code: 'permission',
  //   label: {
  //     zh_CN: '权限',
  //     en_US: 'Permission',
  //   },
  //   icon: 'permission',
  //   path: '/permission',
  //   children: [
  //     {
  //       code: 'notFound',
  //       label: {
  //         zh_CN: '404',
  //         en_US: '404',
  //       },
  //       path: '/permission/404',
  //     },
  //   ],
  // },
  // {
  //   code: 'component',
  //   label: {
  //     zh_CN: '组件',
  //     en_US: 'Component',
  //   },
  //   icon: 'permission',
  //   path: '/component',
  //   children: [
  //     {
  //       code: 'componentForm',
  //       label: {
  //         zh_CN: '表单',
  //         en_US: 'Form',
  //       },
  //       path: '/component/form',
  //     },
  //     {
  //       code: 'componentTable',
  //       label: {
  //         zh_CN: '表格',
  //         en_US: 'Table',
  //       },
  //       path: '/component/table',
  //     },
  //     {
  //       code: 'componentSearch',
  //       label: {
  //         zh_CN: '查询',
  //         en_US: 'Search',
  //       },
  //       path: '/component/search',
  //     },
  //     {
  //       code: 'componentAside',
  //       label: {
  //         zh_CN: '侧边栏',
  //         en_US: 'Aside',
  //       },
  //       path: '/component/aside',
  //     },
  //     {
  //       code: 'componentTabs',
  //       label: {
  //         zh_CN: '选项卡',
  //         en_US: 'Tabs',
  //       },
  //       path: '/component/tabs',
  //     },
  //     {
  //       code: 'componentRadioCards',
  //       label: {
  //         zh_CN: '单选卡片',
  //         en_US: 'Radio Cards',
  //       },
  //       path: '/component/radio-cards',
  //     },
  //   ],
  // },

  // {
  //   code: 'business',
  //   label: {
  //     zh_CN: '业务',
  //     en_US: 'Business',
  //   },
  //   icon: 'permission',
  //   path: '/business',
  //   children: [
  //     {
  //       code: 'basic',
  //       label: {
  //         zh_CN: '基本',
  //         en_US: 'Basic',
  //       },
  //       path: '/business/basic',
  //     },
  //     {
  //       code: 'withSearch',
  //       label: {
  //         zh_CN: '带查询',
  //         en_US: 'WithSearch',
  //       },
  //       path: '/business/with-search',
  //     },
  //     {
  //       code: 'withAside',
  //       label: {
  //         zh_CN: '带侧边栏',
  //         en_US: 'WithAside',
  //       },
  //       path: '/business/with-aside',
  //     },
  //     {
  //       code: 'withRadioCard',
  //       label: {
  //         zh_CN: '带单选卡片',
  //         en_US: 'With Nav Tabs',
  //       },
  //       path: '/business/with-radio-cards',
  //     },
  //     {
  //       code: 'withTabs',
  //       label: {
  //         zh_CN: '带选项卡',
  //         en_US: 'With Tabs',
  //       },
  //       path: '/business/with-tabs',
  //     },
  //   ],
  // },
];

export default localMenuList;

export enum FrameWorkMode {
  payment = 1,
  transaction = 2,
  withdrawal = 3,
}

export const frameworkDesc = {
  [FrameWorkMode.payment]: '支付消耗',
  [FrameWorkMode.transaction]: '成交消耗',
  [FrameWorkMode.withdrawal]: '除退消耗',
};

export enum OrderBy {
  OrderSort = 0,
  ReverseSort = 1,
}

export const OrderByDesc = {
  [OrderBy.OrderSort]: '顺序排序',
  [OrderBy.ReverseSort]: '倒序倒序',
};

export enum Status {
  ConsumeWill = '1',
  Consuming = '2',
  Consumed = '3',
  Extra = '4',
  Disabled = '5',
}

export const StatusDesc = {
  [Status.ConsumeWill]: '未消耗',
  [Status.Consuming]: '消耗中',
  [Status.Consumed]: '已完成',
  [Status.Extra]: '已超额',
  [Status.Disabled]: '已失效',
};
