import React from 'react';
import { Button, Dropdown, MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';

export const AccountMenu = ({ isAuthenticated = false }) => {
  const navigate = useNavigate();

  const items: MenuProps['items'] = [
    !isAuthenticated && {
      key: '1',
      label: (
        <Button type="link" onClick={() => navigate('/login')} data-cy="login" id="login-item">
          Sign in
        </Button>
      ),
    },
    !isAuthenticated && {
      key: '2',
      label: (
        <Button type="link" onClick={() => navigate('/account/register')} data-cy="register">
          Register
        </Button>
      ),
    },
    isAuthenticated && {
      key: '3',
      label: (
        <Button type="link" onClick={() => navigate('/account/settings')} data-cy="settings">
          Settings
        </Button>
      ),
    },
    isAuthenticated && {
      key: '4',
      label: (
        <Button type="link" onClick={() => navigate('/account/password')} data-cy="passwordItem">
          Password
        </Button>
      ),
    },
    isAuthenticated && {
      key: '5',
      label: (
        <Button type="link" onClick={() => navigate('/logout')}>
          Sign out
        </Button>
      ),
    },
  ];

  return (
    <Dropdown menu={{ items }}>
      <span>Account</span>
    </Dropdown>
  );
};

export default AccountMenu;
