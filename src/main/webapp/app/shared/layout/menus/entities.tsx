import React from 'react';
import { Button, Dropdown, MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';

export const EntitiesMenu = () => {
  const navigate = useNavigate();

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Button type="link" onClick={() => navigate('/project')}>
          Projects
        </Button>
      ),
    },
    {
      key: '2',
      label: (
        <Button type="link" onClick={() => navigate('/contact')}>
          Contacts
        </Button>
      ),
    },
  ];

  return (
    <Dropdown menu={{ items }} data-cy="entity">
      <span>Menu</span>
    </Dropdown>
  );
};
