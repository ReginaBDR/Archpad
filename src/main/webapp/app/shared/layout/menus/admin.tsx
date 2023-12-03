import React from 'react';
import { Button, Dropdown, MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';

export const AdminMenu = ({ showOpenAPI }) => {
  const navigate = useNavigate();

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Button type="link" onClick={() => navigate('/admin/user-management')}>
          User management
        </Button>
      ),
    },
    {
      key: '2',
      label: (
        <Button type="link" onClick={() => navigate('/admin/metrics')}>
          Metrics
        </Button>
      ),
    },
    {
      key: '3',
      label: (
        <Button type="link" onClick={() => navigate('/admin/health')}>
          Health
        </Button>
      ),
    },
    {
      key: '4',
      label: (
        <Button type="link" onClick={() => navigate('/admin/configuration')}>
          Configuration
        </Button>
      ),
    },
    {
      key: '5',
      label: (
        <Button type="link" onClick={() => navigate('/admin/logs')}>
          Logs
        </Button>
      ),
    },
    showOpenAPI && {
      key: '6',
      label: (
        <Button type="link" onClick={() => navigate('/admin/docs')}>
          API
        </Button>
      ),
    },
  ];

  return (
    <Dropdown menu={{ items }} data-cy="adminMenu">
      <span>Administration</span>
    </Dropdown>
  );
};

export default AdminMenu;
