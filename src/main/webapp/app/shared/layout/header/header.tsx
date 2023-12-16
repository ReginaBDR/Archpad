import './header.scss';
import React, { useState } from 'react';
import LoadingBar from 'react-redux-loading-bar';
import { AdminMenu, AccountMenu } from '../menus';
import { Button, Menu } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { MenuOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isOpenAPIEnabled: boolean;
}

const HeaderComponent = (props: IHeaderProps) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>('1');
  const navigate = useNavigate();

  const menuItems: ItemType[] = [
    {
      key: '1',
      title: 'Projects',
      label: props.isAuthenticated && (
        <Button type="link" onClick={() => navigate('/project')} data-cy="entity">
          Projects
        </Button>
      ),
    },
    {
      key: '2',
      title: 'Contacts',
      label: props.isAuthenticated && (
        <Button type="link" onClick={() => navigate('/contact')} data-cy="entity">
          Contacts
        </Button>
      ),
    },
    {
      key: '3',
      title: 'Administration',
      label: props.isAuthenticated && props.isAdmin && <AdminMenu showOpenAPI={props.isOpenAPIEnabled} />,
    },
    { key: '4', title: 'Account', label: <AccountMenu isAuthenticated={props.isAuthenticated} /> },
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
