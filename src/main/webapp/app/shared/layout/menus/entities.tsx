import React from 'react';
import { Button, Dropdown, MenuProps } from 'antd';
import { useNavigate } from 'react-router';

export const EntitiesMenu = () => {
  const navigate = useNavigate();

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Button type="link" onClick={() => navigate('/project')}>
          Project
        </Button>
      ),
    },
    {
      key: '2',
      label: (
        <Button type="link" onClick={() => navigate('/contact')}>
          Contact
        </Button>
      ),
    },
    {
      key: '3',
      label: (
        <Button type="link" onClick={() => navigate('/file')}>
          File
        </Button>
      ),
    },
    {
      key: '4',
      label: (
        <Button type="link" onClick={() => navigate('/progress')}>
          Progress
        </Button>
      ),
    },
  ];

  return (
    <Dropdown menu={{ items }} data-cy="entity">
      <span>Entities</span>
    </Dropdown>
  );
};
