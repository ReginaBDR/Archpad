import './header.scss';
import React, { useState } from 'react';
import LoadingBar from 'react-redux-loading-bar';
import { Home } from './header-components';
import { AdminMenu, EntitiesMenu, AccountMenu } from '../menus';
import { Menu } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { MenuOutlined } from '@ant-design/icons';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isOpenAPIEnabled: boolean;
}

const HeaderComponent = (props: IHeaderProps) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>('1');

  const menuItems: ItemType[] = [
    { key: '1', title: 'Entities', label: props.isAuthenticated && <EntitiesMenu /> },
    {
      key: '2',
      title: 'Administration',
      label: props.isAuthenticated && props.isAdmin && <AdminMenu showOpenAPI={props.isOpenAPIEnabled} />,
    },
    { key: '3', title: 'Account', label: <AccountMenu isAuthenticated={props.isAuthenticated} /> },
  ];

  return (
    <>
      <LoadingBar className="loading-bar" />
      <Menu
        theme="light"
        mode="horizontal"
        className="header-menu"
        overflowedIndicator={<MenuOutlined />}
        selectedKeys={[selectedMenuItem]}
        onClick={e => setSelectedMenuItem(e.key)}
        items={menuItems}
      />
    </>
  );
};

export default HeaderComponent;
