import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { openFile, byteSize, Translate, getPaginationState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities } from './file.reducer';
import { Avatar, Button, Col, List, Row, Tooltip } from 'antd';
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

  const handleSyncList = () => {
    sortEntities();
  };

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = paginationState.sort;
    const order = paginationState.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    } else {
      return order === ASC ? faSortUp : faSortDown;
    }
  };

  return (
    <div className="padding">
      <Row justify="space-between" align="middle">
        <Title level={2} data-cy="FileHeading">
          Files
        </Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/file/new')} data-cy="entityCreateButton">
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
                pagination={false}
                bordered
                style={{ backgroundColor: '#ffff' }}
                dataSource={fileList}
                loading={loading}
                renderItem={(item: IFile, index) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                      title={item?.name}
                      description={item?.description}
                    />
                    <Row justify="space-evenly" align="middle" style={{ maxWidth: '40%' }}>
                      {/* <span>{item?.progress?.id}</span>
                      <span>{item?.project?.id}</span>
                      <span>{item?.fileContentType}</span> */}
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
                          onClick={() => navigate(`/file/${item?.id}/edit`)}
                          data-cy="entityEditButton"
                        />
                      </Tooltip>
                      <Tooltip title="Delete">
                        <Button
                          type="link"
                          icon={<DeleteOutlined />}
                          onClick={() => navigate(`/file/${item?.id}/delete`)}
                          data-cy="entityDeleteButton"
                        />
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
    // {/* <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} /> */}
    // {/* <JhiPagination
    //   activePage={paginationState.activePage}
    //   onSelect={handlePagination}
    //   maxButtons={5}
    //   itemsPerPage={paginationState.itemsPerPage}
    //   totalItems={totalItems}
    // /> */}
  );
};

export default File;
