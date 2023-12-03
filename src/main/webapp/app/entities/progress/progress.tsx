import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getPaginationState } from 'react-jhipster';
import { ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities, getEntity } from './progress.reducer';
import { Button, Card, Col, Row, Timeline, TimelineItemProps } from 'antd';
import Title from 'antd/es/typography/Title';
import { PlusOutlined } from '@ant-design/icons';
import { IProgress } from 'app/shared/model/progress.model';
import ProgressDetail from './progress-detail';

interface IProgressProps {
  projectId?: string;
}

export const Progress = (props: IProgressProps) => {
  const { projectId } = props;
  const dispatch = useAppDispatch();
  const pageLocation = useLocation();
  const navigate = useNavigate();
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );
  const [progressItems, setProgressItems] = useState<TimelineItemProps[]>([]);
  const [selectedProgress, setSelectedProgress] = useState<number | null>(null);
  const progressList = useAppSelector(state => state.progress.entities);
  const loading = useAppSelector(state => state.progress.loading);
  const totalItems = useAppSelector(state => state.progress.totalItems);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      }),
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (pageLocation.search !== endURL) {
      navigate(`${pageLocation.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(pageLocation.search);
    const page = params.get('page');
    const sort = params.get(SORT);
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [pageLocation.search]);

  useEffect(() => {
    if (progressList.length > 0 && !loading) {
      const data: TimelineItemProps[] = progressList.map((progress: IProgress) => {
        return {
          key: progress.id,
          label: (
            <Button type="text" onClick={() => setSelectedProgress(progress.id)}>
              {progress?.contact?.company || 'Unknown user'}
            </Button>
          ),
          children: (
            <Button type="link" onClick={() => setSelectedProgress(progress.id)}>
              {progress?.notes}
            </Button>
          ),
        };
      });
      setProgressItems(data);
    }
    return () => {
      setProgressItems([]);
    };
  }, [progressList, loading]);

  useEffect(() => {
    if (progressList.length > 0) {
      setSelectedProgress(progressList[0].id);
    }
    return () => {
      setSelectedProgress(null);
    };
  }, [progressList]);

  useEffect(() => {
    if (!selectedProgress) return;
    dispatch(getEntity(selectedProgress));
  }, [selectedProgress]);

  return (
    <div className="padding" style={{ width: '100%' }}>
      <Title level={2} data-cy="ProgressHeading">
        Progress Tracking
      </Title>
      <Row gutter={[20, 20]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Row justify="end" align="middle">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => navigate('/progress/new', { state: { id: projectId } })}
              data-cy="entityCreateButton"
            >
              Add Progress
            </Button>
          </Row>
          <Row justify="center" align="middle" style={{ marginTop: '2rem' }}>
            <Col span={24} style={{ overflowY: 'auto', overflowX: 'hidden' }}>
              <Timeline mode="left" items={progressItems} />
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Row justify="center">
            <Card style={{ width: '100%' }}>{selectedProgress && <ProgressDetail projectId={projectId} />}</Card>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Progress;
