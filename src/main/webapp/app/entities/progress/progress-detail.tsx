import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntity } from './progress.reducer';
import { Button, Descriptions, DescriptionsProps, Row } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { IProgress } from 'app/shared/model/progress.model';

interface IProgressDetailProps {
  progressId?: number;
}

export const ProgressDetail = (props: IProgressDetailProps) => {
  const { progressId } = props;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (progressId !== undefined) {
      dispatch(getEntity(progressId));
    }
  }, [dispatch, progressId]);

  const progressEntity: IProgress = useAppSelector(state => state.progress.entity);

  const items: DescriptionsProps['items'] = [
    { key: '1', label: 'Link reference', children: progressEntity.link },
    {
      key: '2',
      label: 'Contact attached',
      children: progressEntity.contact ? `${progressEntity?.contact?.name || ''} ${progressEntity?.contact?.lastName || ''}` : 'None',
    },
    { key: '3', label: 'Changelog notes', children: progressEntity.notes },
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
            onClick={() => navigate(`/progress/${progressEntity.id}/edit`)}
            data-cy="entityEditButton"
          >
            Edit
          </Button>
          <Button
            type="text"
            size="middle"
            icon={<DeleteOutlined />}
            onClick={() => navigate(`/progress/${progressEntity.id}/delete`)}
            data-cy="entityDeleteButton"
          >
            Delete
          </Button>
        </Row>
      }
    />
  );
};

export default ProgressDetail;
