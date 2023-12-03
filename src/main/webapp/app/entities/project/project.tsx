import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getPaginationState } from 'react-jhipster';
import { PlusOutlined } from '@ant-design/icons';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities } from './project.reducer';
import { columns } from './projects-table-columns';
import { Button, Row, Table, TableProps } from 'antd';
import Title from 'antd/es/typography/Title';
import { IProject } from 'app/shared/model/project.model';

export const Project = () => {
  const dispatch = useAppDispatch();
  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const projectList = useAppSelector(state => state.project.entities);
  const loading = useAppSelector(state => state.project.loading);
  const totalItems = useAppSelector(state => state.project.totalItems);

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

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const onChange: TableProps<IProject>['onChange'] = (pagination, filters, sorter, extra) => {
    // eslint-disable-next-line no-console
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <div className="padding">
      <Row justify="space-between" style={{ marginBottom: '10px' }}>
        <Title level={2} data-cy="ProjectHeading">
          Welcome to your Projects view
        </Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/project/new')} data-cy="entityCreateButton">
          Create a new Project
        </Button>
      </Row>
      <Row>
        <Table
          columns={columns}
          dataSource={projectList}
          rowKey={'id'}
          scroll={{ x: 'max-content', y: '70vh' }}
          pagination={{
            total: totalItems,
            pageSize: paginationState.itemsPerPage,
            current: paginationState.activePage,
            onChange: handlePagination,
          }}
          onChange={onChange}
          loading={loading}
        />
      </Row>
    </div>
  );
};

export default Project;
