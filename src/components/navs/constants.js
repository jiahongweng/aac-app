import { ROLES } from 'utils/constants';

export const DEFAULT_MENU_TYPE = 'menu-sub-hidden'; // Force to hide sub menu for this dashboard
export const SUB_HIDDEN_BREAKPOINT = 1440;
export const MENU_HIDDEN_BREAKPOINT = 768;

export const MENU_ITEMS = [
  {
    id: 'dashboard',
    icon: 'iconsminds-home',
    label: 'Dashboard',
    to: '/dashboard',
  },
  {
    id: 'users',
    icon: 'iconsminds-business-mens',
    label: 'Users',
    to: '/users',
    permission: [ROLES.ADMIN],
  },
  {
    id: 'organizations',
    icon: 'iconsminds-building',
    label: 'Organizations',
    to: '/organizations',
    permission: [ROLES.ADMIN],
  },
  {
    id: 'products',
    icon: 'iconsminds-blouse',
    label: 'Products',
    to: '/products',
    permission: [ROLES.ADMIN],
  },
  {
    id: 'orders',
    icon: 'iconsminds-checkout',
    label: 'Orders',
    to: '/orders',
  },
];

export const BREADCRUMB_ITEMS = {
  'breadcrumb.home': 'Home',
  'breadcrumb.dashboard': 'Dashboard',
  'breadcrumb.users': 'Users',
  'breadcrumb.organizations': 'Organizations',
  'breadcrumb.settings': 'Settings',
  'breadcrumb.account': 'Account',
  'breadcrumb.organization': 'Organization',
  'breadcrumb.products': 'Products',
  'breadcrumb.add-product': 'Add products',
  'breadcrumb.orders': 'Orders',
};

export const MENU_SET_CLASSNAMES = 'Menu/SET_CLASSNAMES';
export const MENU_CONTAINER_ADD_CLASSNAME = 'Menu/CONTAINER_ADD_CLASSNAME';
export const MENU_CLICK_MOBILE_MENU = 'Menu/CLICK_MOBILE_MENU';
export const MENU_CHANGE_DEFAULT_CLASSES = 'Menu/CHANGE_DEFAULT_CLASSES';
export const MENU_CHANGE_HAS_SUB_ITEM_STATUS =
  'Menu/CHANGE_HAS_SUB_ITEM_STATUS';
