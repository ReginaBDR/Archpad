import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Translate, getPaginationState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities } from './contact.reducer';
import Title from 'antd/es/typography/Title';
import { Avatar, Button, Col, Divider, List, Row, Space } from 'antd';
import { IContact } from 'app/shared/model/contact.model';
import { PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

export const Contact = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const contactList = useAppSelector(state => state.contact.entities);
  const loading = useAppSelector(state => state.contact.loading);
  const totalItems = useAppSelector(state => state.contact.totalItems);

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
      <Row justify="space-between" align="middle" style={{ margin: '0 4rem 10px 4rem' }}>
        <Title level={2} data-cy="ContactHeading">
          Contacts
        </Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/contact/new')} data-cy="entityCreateButton">
          Create a Contact
        </Button>
      </Row>
      <Row justify="center" align="middle">
        <Col span={22}>
          <List
            pagination={false}
            bordered
            style={{ backgroundColor: '#ffff' }}
            dataSource={contactList}
            loading={loading}
            renderItem={(item: IContact, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                  title={`${item?.name} ${item?.lastName}`}
                  description={item?.company}
                />
                <Space direction="horizontal" size="small" wrap style={{ maxWidth: '40%' }} split={<Divider type="vertical" />}>
                  <Button type="link" icon={<EyeOutlined />} onClick={() => navigate(`/contact/${item?.id}`)} data-cy="entityDetailsButton">
                    View
                  </Button>
                  <Button
                    type="link"
                    icon={<EditOutlined />}
                    onClick={() => navigate(`/contact/${item?.id}/edit`)}
                    data-cy="entityEditButton"
                  >
                    Edit
                  </Button>
                  <Button
                    type="link"
                    icon={<DeleteOutlined />}
                    onClick={() => navigate(`/contact/${item?.id}/delete`)}
                    data-cy="entityDeleteButton"
                  >
                    Delete
                  </Button>
                </Space>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </div>

    //     {totalItems ? (
    //       <div className={contactList && contactList.length > 0 ? '' : 'd-none'}>
    //         <div className="justify-content-center d-flex">
    //           <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} />
    //         </div>
    //         <div className="justify-content-center d-flex">
    //           <JhiPagination
    //             activePage={paginationState.activePage}
    //             onSelect={handlePagination}
    //             maxButtons={5}
    //             itemsPerPage={paginationState.itemsPerPage}
    //             totalItems={totalItems}
    //           />
    //         </div>
    //       </div>
    //     ) : (
    //       ''
    //     )}
  );
};

export default Contact;
