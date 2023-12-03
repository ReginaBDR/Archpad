import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { openFile, getPaginationState } from 'react-jhipster';
import { ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities, deleteEntity } from './file.reducer';
import { Button, Col, List, Popconfirm, Row, Tooltip } from 'antd';
import Title from 'antd/es/typography/Title';
import { IFile } from 'app/shared/model/file.model';
import { PlusOutlined, EyeOutlined, DownloadOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface IFileProps {
  projectId?: string;
}

export const File = (props: IFileProps) => {
  const { projectId } = props;
  const dispatch = useAppDispatch();
  const pageLocation = useLocation();
  const navigate = useNavigate();
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState<number | null>(null);

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const fileList = useAppSelector(state => state.file.entities);
  const loading = useAppSelector(state => state.file.loading);
  const totalItems = useAppSelector(state => state.file.totalItems);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: 10,
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

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const confirmDelete = (id: number) => {
    dispatch(deleteEntity(id));
  };

  return (
    <div className="padding">
      <Row justify="space-between" align="middle">
        <Title level={2} data-cy="FileHeading">
          Files
        </Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate('/file/new', { state: { id: null, projectId } })}
          data-cy="entityCreateButton"
        >
          Upload a new File
        </Button>
      </Row>
      <Row gutter={[20, 20]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Row justify="center" align="middle" style={{ width: '100%', height: '100%', backgroundColor: '#ffff' }}>
            <span>Files Viewer is a work on progress</span>
          </Row>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Row justify="center" align="middle">
            <Col span={24}>
              <List
                pagination={{
                  total: totalItems,
                  pageSize: paginationState.itemsPerPage,
                  current: paginationState.activePage,
                  onChange: handlePagination,
                }}
                bordered
                style={{ backgroundColor: '#ffff' }}
                dataSource={fileList}
                loading={loading}
                renderItem={(item: IFile) => (
                  <List.Item>
                    <List.Item.Meta title={item?.name} description={item?.description} />
                    <Row justify="space-evenly" align="middle" style={{ maxWidth: '40%' }}>
                      <Tooltip title="Open">
                        <Button
                          type="link"
                          icon={<EyeOutlined />}
                          onClick={() => navigate(`/file/${item?.id}`)}
                          data-cy="entityDetailsButton"
                        />
                      </Tooltip>
                      <Tooltip title="Download">
                        <Button type="link" icon={<DownloadOutlined />} onClick={openFile(item?.fileContentType, item?.file)} />
                      </Tooltip>
                      <Tooltip title="Edit">
                        <Button
                          type="link"
                          icon={<EditOutlined />}
                          onClick={() => navigate(`/file/${item?.id}/edit`, { state: { id: item?.id, projectId } })}
                          data-cy="entityEditButton"
                        />
                      </Tooltip>
                      <Tooltip title="Delete">
                        <Popconfirm
                          title="Delete"
                          description="Are you sure to delete this file?"
                          open={isDeleteConfirmOpen === item?.id}
                          onConfirm={() => confirmDelete(item?.id)}
                          onCancel={() => setIsDeleteConfirmOpen(null)}
                        >
                          <Button
                            type="link"
                            icon={<DeleteOutlined />}
                            onClick={() => setIsDeleteConfirmOpen(item?.id)}
                            data-cy="entityDeleteButton"
                          />
                        </Popconfirm>
                      </Tooltip>
                    </Row>
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default File;
