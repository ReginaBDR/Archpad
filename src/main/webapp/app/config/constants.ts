export const AUTHORITIES = {
  ADMIN: 'ROLE_ADMIN',
  USER: 'ROLE_USER',
};

export const messages = {
  DATA_ERROR_ALERT: 'Internal Error',
};

export const APP_DATE_FORMAT = 'DD/MM/YY HH:mm';
export const APP_TIMESTAMP_FORMAT = 'DD/MM/YY HH:mm:ss';
export const APP_LOCAL_DATE_FORMAT = 'DD/MM/YYYY';
export const APP_LOCAL_DATETIME_FORMAT = 'YYYY-MM-DDTHH:mm';
export const APP_WHOLE_NUMBER_FORMAT = '0,0';
export const APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT = '0,0.[00]';
export const colorPrimary = '#0077C8';
export const colorPrimaryHover = '#0099CC';
export const menuHover = '#f2f6fa';

export const themeStyles = {
  components: {
    Button: {
      colorPrimary,
      colorPrimaryBorder: colorPrimary,
      colorPrimaryHover,
      borderRadius: 4,
      colorLink: colorPrimary,
      colorLinkHover: colorPrimaryHover,
    },
    Menu: {
      itemSelectedColor: colorPrimary,
      itemSelectedBg: colorPrimaryHover,
      itemHoverBg: colorPrimaryHover,
    },
    Dropdown: {
      colorPrimary,
      colorPrimaryBorder: colorPrimary,
      controlItemBgHover: menuHover,
      controlItemBgActive: menuHover,
    },
  },
};
