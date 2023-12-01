import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntity } from './contact.reducer';
import { Card, Col, Descriptions, DescriptionsProps, Row } from 'antd';

interface IContactDetailProps {
  customerIdProp?: number;
}

export const ContactDetail = (props: IContactDetailProps) => {
  const { customerIdProp } = props;
  const dispatch = useAppDispatch();
  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(customerIdProp || id));
  }, []);

  const contactEntity = useAppSelector(state => state.contact.entity);

  const items: DescriptionsProps['items'] = [
    { key: '1', label: 'Name', children: `${contactEntity.name} ${contactEntity.lastName}` },
    { key: '2', label: 'Company', children: contactEntity.company },
    { key: '3', label: 'Address', children: contactEntity.address },
    { key: '4', label: 'Phone', children: contactEntity.phone },
    { key: '5', label: 'Email', children: contactEntity.email },
    { key: '6', label: 'Role', children: contactEntity.role },
    { key: '7', label: 'Notes', children: contactEntity.notes, span: 1 },
  ];

  return (
    <Row justify="center" style={{ marginTop: '2rem' }}>
      <Col span={22}>
        <Card>
          <Descriptions
            title={contactEntity.company || contactEntity.name}
            layout="vertical"
            column={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 2 }}
            bordered
            items={items}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default ContactDetail;
