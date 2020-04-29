export const DEFAULT_MENU_TYPE = 'menu-default';
export const SUB_HIDDEN_BREAKPOINT = 1440;
export const MENU_HIDDEN_BREAKPOINT = 768;

export const MENU_ITEMS = [
  {
    id: 'dashboard',
    icon: 'iconsminds-home',
    label: 'Dashboard',
    to: '/',
  },
  {
    id: 'employees',
    icon: 'iconsminds-business-mens',
    label: 'Employees',
    to: '/employees',
  },
  {
    id: 'projects',
    icon: 'iconsminds-pie-chart-3',
    label: 'Projects',
    to: '/projects',
  },
];

export const BREADCRUMB_ITEMS = {
  'breadcrumb.home': 'Home',
  'breadcrumb.dashboard': 'Dashboard',
  'breadcrumb.users': 'Users',
  'breadcrumb.account': 'Account',
};

export const MENU_SET_CLASSNAMES = 'Menu/SET_CLASSNAMES';
export const MENU_CONTAINER_ADD_CLASSNAME = 'Menu/CONTAINER_ADD_CLASSNAME';
export const MENU_CLICK_MOBILE_MENU = 'Menu/CLICK_MOBILE_MENU';
export const MENU_CHANGE_DEFAULT_CLASSES = 'Menu/CHANGE_DEFAULT_CLASSES';
export const MENU_CHANGE_HAS_SUB_ITEM_STATUS =
  'Menu/CHANGE_HAS_SUB_ITEM_STATUS';
