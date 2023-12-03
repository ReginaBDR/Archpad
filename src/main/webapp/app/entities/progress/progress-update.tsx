import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { IContact } from 'app/shared/model/contact.model';
import { getEntities as getContacts } from 'app/entities/contact/contact.reducer';
import { getEntities as getProjects } from 'app/entities/project/project.reducer';
import { getEntity, updateEntity, createEntity, reset } from './progress.reducer';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import Title from 'antd/es/typography/Title';

export const ProgressUpdate = () => {
  const { id } = useParams<'id'>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isNew = id === undefined;
  const contacts = useAppSelector(state => state.contact.entities);
  const progressEntity = useAppSelector(state => state.progress.entity);
  const projects = useAppSelector(state => state.project.entities);
  const updating = useAppSelector(state => state.progress.updating);
  const updateSuccess = useAppSelector(state => state.progress.updateSuccess);
  const [form] = Form.useForm();

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }
    dispatch(getContacts({}));
    dispatch(getProjects({}));
    return () => {
      form.resetFields();
    };
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      navigate(-1);
    }
  }, [updateSuccess]);

  // eslint-disable-next-line complexity
  const saveEntity = values => {
    form
      .validateFields()
      .then(() => {
        if (!location?.state?.id) return;
        if (values.id !== undefined && typeof values.id !== 'number') {
          values.id = Number(values.id);
        }
        const entity = {
          ...progressEntity,
          ...values,
          contact: contacts.find(it => it.id.toString() === values?.contact.toString()),
          project: projects.find(it => it.id.toString() === location?.state?.id.toString()),
        };
        if (isNew) {
          dispatch(createEntity(entity));
        } else {
          dispatch(updateEntity(entity));
        }
      })
      .catch(e => {
        console.error('There was an saving the contact', e);
      })
      .finally(() => {
        form.resetFields();
      });
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...progressEntity,
          contact: progressEntity?.contact?.id,
        };

  return (
    <div className="padding">
      <Row justify="center">
        <Col xs={22} sm={22} md={18} lg={18} xl={18} xxl={18}>
          <Title level={2} id="createOrEditLabel" data-cy="ProgressCreateUpdateHeading">
            {isNew ? 'Create a Progress' : 'Edit a Progress'}
          </Title>
          <Form
            name="progress"
            form={form}
            initialValues={defaultValues()}
            preserve={false}
            onFinish={saveEntity}
            size="large"
            id="progress-id"
            layout="vertical"
          >
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Form.Item label="Link" name="link">
                  <Input placeholder="Link" data-cy="link" />
                </Form.Item>
                <Form.Item label="Contact" name="contact">
                  <Select placeholder="Contact" data-cy="contact">
                    {contacts?.map((contact: IContact) => (
                      <Select.Option value={contact.id} key={contact.id}>
                        {contact?.company || contact?.name + ' ' + contact?.lastName || contact?.id}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item label="Notes" name="notes" rules={[{ required: true, message: 'Please input a message' }]}>
                  <Input.TextArea placeholder="Notes" data-cy="notes" rows={7} />
                </Form.Item>
                <Form.Item>
                  <Row justify="end">
                    <Button
                      type="primary"
                      data-cy="entityCreateCancelButton"
                      style={{ marginRight: '10px' }}
                      onClick={() => {
                        navigate(-1);
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

export default ProgressUpdate;
