import React from 'react';
import { DescriptionsProps, Tag } from 'antd';
import { IProject } from 'app/shared/model/project.model';
import { TextFormat } from 'react-jhipster';
import { APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { renderStatusTag, translateStatusTag } from 'app/shared/util/read-status-tag';

export const project = (projectEntity: IProject): DescriptionsProps['items'] => {
  const statusColor = renderStatusTag(projectEntity.status);
  const statusText = translateStatusTag(projectEntity.status);
  return [
    { key: '1', label: 'Status', children: <Tag color={statusColor}>{statusText}</Tag> },
    { key: '2', label: 'Customer', children: projectEntity.customer ? projectEntity.customer.company : '' },
    {
      key: '3',
      label: 'Start date',
      children: projectEntity.startDate ? <TextFormat value={projectEntity.startDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null,
    },
    {
      key: '4',
      label: 'Deadline',
      children: projectEntity.deadline ? <TextFormat value={projectEntity.deadline} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null,
    },
  ];
};

export const location = (projectEntity: IProject): DescriptionsProps['items'] => {
  return [
    { key: '1', label: 'Street address', children: projectEntity.streetAddress },
    { key: '2', label: 'Postal code', children: projectEntity.postalCode },
    { key: '3', label: 'City', children: projectEntity.city },
    { key: '4', label: 'State province', children: projectEntity.stateProvince },
    { key: '5', label: 'Country', children: projectEntity.country },
  ];
};
