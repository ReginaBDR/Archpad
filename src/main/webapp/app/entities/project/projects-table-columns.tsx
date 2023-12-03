/* eslint-disable object-shorthand */
import React from 'react';
import { ColumnsType } from 'antd/es/table';
import { IProject } from 'app/shared/model/project.model';
import { Button, Space, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { TextFormat } from 'react-jhipster';
import { APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { renderStatusTag, translateStatusTag } from 'app/shared/util/read-status-tag';
import { FolderOpenTwoTone } from '@ant-design/icons';

export const columns: ColumnsType<IProject> = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    sorter: (a, b) => a.id - b.id,
    defaultSortOrder: 'ascend',
    render: value => {
      return <Link to={`/project/${value}`}>{value}</Link>;
    },
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Beginning',
    dataIndex: 'startDate',
    key: 'startDate',
    render: value => {
      return <TextFormat type="date" value={value} format={APP_LOCAL_DATE_FORMAT} />;
    },
  },
  {
    title: 'Deadline',
    dataIndex: 'deadline',
    key: 'deadline',
    render: value => {
      return <TextFormat type="date" value={value} format={APP_LOCAL_DATE_FORMAT} />;
    },
  },
  {
    title: 'Customer',
    dataIndex: 'customer',
    key: 'customer',
    width: '10%',
    render: (text, record, index) => {
      return record?.customer?.company || record?.customer?.id;
    },
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (_, { status }) => {
      const color = renderStatusTag(status);
      return (
        <Tag color={color} key={status}>
          {translateStatusTag(status)}
        </Tag>
      );
    },
  },
  {
    title: 'City',
    dataIndex: 'city',
    key: 'city',
  },
  {
    title: 'State',
    dataIndex: 'stateProvince',
    key: 'stateProvince',
    width: '7%',
  },
  {
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
    width: '10%',
  },
  {
    title: 'Action',
    key: 'action',
    fixed: 'right',
    width: '7%',
    render: (_, record) => (
      <Space size="middle">
        <Link to={`/project/${record.id}`}>
          <Button type="link" icon={<FolderOpenTwoTone />}>
            Open
          </Button>
        </Link>
      </Space>
    ),
  },
];
