import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { deleteEntity } from './progress.reducer';
import { Button, Descriptions, DescriptionsProps, Popconfirm, Row } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { IProgress } from 'app/shared/model/progress.model';
import { useNavigate } from 'react-router-dom';

export const ProgressDetail = (props: { projectId?: string }) => {
  const { projectId } = props;
  const dispatch = useAppDispatch();
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const progressEntity: IProgress = useAppSelector(state => state.progress.entity);

  const confirmDelete = () => {
    dispatch(deleteEntity({ id: progressEntity.id, projectId })).then(() => {
      setIsDeleteConfirmOpen(false);
    });
  };

  const items: DescriptionsProps['items'] = [
    { key: '1', label: 'Link Reference', children: progressEntity.link || 'None' },
    {
      key: '2',
      label: 'Contact Attached',
      children: progressEntity?.contact ? `${progressEntity?.contact?.name || ''} ${progressEntity?.contact?.lastName || ''}` : 'None',
    },
    { key: '3', label: 'Changelog Notes', children: progressEntity.notes },
  ];

  return (
    <Descriptions
      layout="vertical"
      column={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1 }}
      style={{ width: '100%' }}
      bordered
      items={items}
      extra={
        <Row justify="center" align="middle">
          <Button
            type="text"
            size="middle"
            icon={<EditOutlined />}
            onClick={() => navigate(`/progress/${progressEntity.id}/edit`, { state: { id: projectId } })}
            data-cy="entityEditButton"
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete"
            description="Are you sure to delete this progress?"
            open={isDeleteConfirmOpen}
            onConfirm={confirmDelete}
            onCancel={() => setIsDeleteConfirmOpen(false)}
          >
            <Button
              type="text"
              size="middle"
              icon={<DeleteOutlined />}
              onClick={() => setIsDeleteConfirmOpen(true)}
              data-cy="entityDeleteButton"
            >
              Delete
            </Button>
          </Popconfirm>
        </Row>
      }
    />
  );
};

export default ProgressDetail;
