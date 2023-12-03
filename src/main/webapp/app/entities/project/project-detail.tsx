import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntity, deleteEntity } from './project.reducer';
import { Button, Col, Descriptions, Popconfirm, Row, Space, Tabs } from 'antd';
import Title from 'antd/es/typography/Title';
import { IProject } from 'app/shared/model/project.model';
import { project, location } from './project-description-columns';
import Contact from '../contact';
import ContactDetail from '../contact/contact-detail';
import Progress from '../progress/progress';
import File from '../file/file';

export const ProjectDetail = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<'id'>();
  const [activeTabKey, setActiveTabKey] = useState<string>('1');
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const projectEntity: IProject = useAppSelector(state => state.project.entity);

  const confirmDelete = () => {
    dispatch(deleteEntity(id));
    navigate('/project');
  };

  const tabContent = [
    {
      label: 'Project details',
      key: '1',
      children: (
        <Row style={{ padding: '1rem 0', backgroundColor: '#ffff' }} justify="center" align="middle">
          <Col span={22}>
            <Row justify="space-between">
              <Title level={2} data-cy="projectDetailsHeading">
                {`Project ${projectEntity.name}`}
              </Title>
              <Space size="small" wrap>
                <Button type="primary" onClick={() => navigate(-1)} data-cy="entityDetailsBackButton" icon={<ArrowLeftOutlined />}>
                  Go back
                </Button>
                <Button type="primary" onClick={() => navigate(`/project/${projectEntity.id}/edit`)} icon={<EditOutlined />}>
                  Edit
                </Button>
                <Popconfirm
                  title="Delete"
                  description="Are you sure to delete this project?"
                  open={isDeleteConfirmOpen}
                  onConfirm={confirmDelete}
                  onCancel={() => setIsDeleteConfirmOpen(false)}
                >
                  <Button type="primary" onClick={() => setIsDeleteConfirmOpen(true)} icon={<DeleteOutlined />}>
                    Delete
                  </Button>
                </Popconfirm>
              </Space>
            </Row>
            <Row justify="center" style={{ marginTop: '2rem' }}>
              <Descriptions
                items={project(projectEntity)}
                labelStyle={{ color: '#06142e', fontWeight: '600' }}
                column={{ xs: 1, sm: 1, md: 2, lg: 4, xl: 4, xxl: 4 }}
              />
            </Row>
            <Row justify="center" style={{ marginTop: '2rem' }}>
              <Descriptions
                title="Location details"
                labelStyle={{ color: '#b7b7b7' }}
                items={location(projectEntity)}
                column={{ xs: 1, sm: 1, md: 2, lg: 3, xl: 3, xxl: 3 }}
              />
            </Row>
            <Row justify="center" style={{ marginTop: '2rem' }}>
              <Progress projectId={id} />
            </Row>
          </Col>
        </Row>
      ),
    },
    {
      label: 'Customer details',
      key: '2',
      children: <ContactDetail customerIdProp={projectEntity?.customer?.id} />,
    },
    {
      label: 'Project Contacts',
      key: '3',
      children: <Contact />,
    },
    {
      label: 'Project Files',
      key: '4',
      children: <File projectId={id} />,
    },
  ];

  return (
    <Row justify="center" className="padding">
      <Tabs
        tabPosition="top"
        activeKey={activeTabKey}
        items={tabContent}
        centered
        style={{ width: '-webkit-fill-available' }}
        onChange={(key: string) => {
          setActiveTabKey(key);
        }}
      />
    </Row>
  );
};

export default ProjectDetail;
