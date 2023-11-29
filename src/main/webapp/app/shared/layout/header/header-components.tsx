import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import { Menu } from 'antd';

export const Home = () => (
  <Menu.Item>
    <Link to="/" className="d-flex align-items-center">
      <span>Home</span>
    </Link>
  </Menu.Item>
);
