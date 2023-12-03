import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { IContact } from 'app/shared/model/contact.model';
import { getEntity, updateEntity, createEntity, reset } from './contact.reducer';
import { Button, Col, Form, Input, Row } from 'antd';
import Title from 'antd/es/typography/Title';

export const ContactUpdate = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<'id'>();
  const isNew = id === undefined;
  const contactEntity: IContact = useAppSelector(state => state.contact.entity);
  const updating = useAppSelector(state => state.contact.updating);
  const updateSuccess = useAppSelector(state => state.contact.updateSuccess);
  const [form] = Form.useForm();

  const handleClose = () => {
    navigate('/contact' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  // eslint-disable-next-line complexity
  const saveEntity = values => {
    form
      .validateFields()
      .then(() => {
        if (values.id !== undefined && typeof values.id !== 'number') {
          values.id = Number(values.id);
        }
        if (values.phone !== undefined && typeof values.phone !== 'number') {
          values.phone = Number(values.phone);
        }
        const entity = {
          ...contactEntity,
          ...values,
        };
        if (isNew) {
          dispatch(createEntity(entity));
        } else {
          dispatch(updateEntity(entity));
        }
      })
      .catch(e => {
        console.error('There was an saving the contact', e);
      });
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...contactEntity,
        };

  return (
    <div className="padding">
      <Row justify="center">
        <Col xs={22} sm={22} md={18} lg={18} xl={18} xxl={18}>
          <Title level={2} id="createOrEditLabel" data-cy="ContactCreateUpdateHeading">
            {isNew ? 'Create a Contact' : 'Edit a Contact'}
          </Title>
          <Form
            name="contact"
            form={form}
            initialValues={defaultValues()}
            onFinish={saveEntity}
            size="large"
            id="contact-id"
            layout="vertical"
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input a name' }]}>
                  <Input placeholder="Project Name" data-cy="name" />
                </Form.Item>
                <Form.Item label="Last Name" name="lastName">
                  <Input placeholder="Last Name" data-cy="lastName" />
                </Form.Item>
                <Form.Item label="Company Name" name="company">
                  <Input placeholder="Company" data-cy="company" />
                </Form.Item>
                <Form.Item label="Address" name="address">
                  <Input placeholder="Address" data-cy="address" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                <Form.Item label="Phone" name="phone">
                  <Input placeholder="Phone" data-cy="phone" />
                </Form.Item>
                <Form.Item label="Email" name="email">
                  <Input placeholder="Email" data-cy="email" />
                </Form.Item>
                <Form.Item label="Role" name="role">
                  <Input placeholder="Role" data-cy="role" />
                </Form.Item>
                <Form.Item label="Notes" name="notes">
                  <Input.TextArea placeholder="Notes" data-cy="notes" rows={7} />
                </Form.Item>

                <Form.Item>
                  <Row justify="end">
                    <Button
                      type="primary"
                      data-cy="entityCreateCancelButton"
                      style={{ marginRight: '10px' }}
                      onClick={() => {
                        navigate('/contact');
                      }}
                    >
                      Go Back
                    </Button>
                    <Button type="primary" htmlType="submit" data-cy="submit" disabled={updating}>
                      Save
                    </Button>
                  </Row>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default ContactUpdate;
