import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { IContact } from 'app/shared/model/contact.model';
import { getEntities as getContacts } from 'app/entities/contact/contact.reducer';
import { ProjectStatus } from 'app/shared/model/enumerations/project-status.model';
import { getEntity, updateEntity, createEntity, reset } from './project.reducer';
import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import Title from 'antd/es/typography/Title';
import { translateStatusTag } from 'app/shared/util/read-status-tag';
import { IProject } from 'app/shared/model/project.model';
import dayjs from 'dayjs';

export const ProjectUpdate = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<'id'>();
  const isNew = id === undefined;
  const [form] = Form.useForm();
  const contacts: IContact[] = useAppSelector(state => state.contact.entities);
  const projectEntity: IProject = useAppSelector(state => state.project.entity);
  const updating = useAppSelector(state => state.project.updating);
  const updateSuccess = useAppSelector(state => state.project.updateSuccess);
  const projectStatusValues = Object.keys(ProjectStatus);

  const handleClose = () => {
    navigate('/project' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }
    dispatch(getContacts({}));
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
        const entity = {
          ...projectEntity,
          ...values,
          customer: contacts.find((it: IContact) => it.id.toString() === values.customer.toString()),
        };
        if (isNew) {
          dispatch(createEntity(entity));
        } else {
          dispatch(updateEntity(entity));
        }
      })
      .catch(e => {
        console.error('There was an saving the project', e);
      });
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...projectEntity,
          startDate: dayjs(projectEntity?.startDate, 'YYYY-MM-DD'),
          deadline: dayjs(projectEntity?.deadline, 'YYYY-MM-DD'),
          customer: projectEntity?.customer?.id,
        };

  return (
    <div className="padding">
      <Row justify="center">
        <Col xs={22} sm={22} md={18} lg={18} xl={18} xxl={18}>
          <Title level={2} id="createOrEditLabel" data-cy="ProjectCreateUpdateHeading">
            {isNew ? 'Create a Project' : 'Edit a Project'}
          </Title>
          <Form
            name="project"
            form={form}
            initialValues={defaultValues()}
            onFinish={saveEntity}
            size="large"
            id="project-id"
            layout="vertical"
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input a project name' }]}>
                  <Input placeholder="Project Name" data-cy="name" minLength={1} maxLength={50} />
                </Form.Item>
                <Form.Item label="Street Address" name="streetAddress">
                  <Input placeholder="Address" data-cy="streetAddress" />
                </Form.Item>
                <Form.Item label="Postal Code" name="postalCode">
                  <Input placeholder="Postal Code" data-cy="postalCode" />
                </Form.Item>
                <Form.Item label="City" name="city">
                  <Input placeholder="City" data-cy="city" />
                </Form.Item>
                <Form.Item label="State Province" name="stateProvince">
                  <Input placeholder="State" data-cy="stateProvince" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                <Form.Item label="Country" name="country">
                  <Input placeholder="Country" data-cy="country" />
                </Form.Item>
                <Form.Item
                  label="Start Date"
                  name="startDate"
                  rules={[{ type: 'object' as const, required: true, message: 'Please select the start date' }]}
                >
                  <DatePicker data-cy="startDate" style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                  label="Deadline"
                  name="deadline"
                  rules={[{ type: 'object' as const, required: true, message: 'Please select the deadline' }]}
                >
                  <DatePicker data-cy="deadline" style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item label="Customer" name="customer" rules={[{ required: true, message: 'Please select a contact' }]}>
                  <Select placeholder="Customer" data-cy="customer">
                    {contacts?.map((contact: IContact) => (
                      <Select.Option value={contact.id} key={contact.id}>
                        {contact?.company || contact?.name + ' ' + contact?.lastName || contact?.id}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item label="Status" name="status" rules={[{ required: true, message: 'Please select a status' }]}>
                  <Select placeholder="Status" data-cy="status">
                    {projectStatusValues.map((projectStatus: ProjectStatus) => (
                      <Select.Option value={projectStatus} key={projectStatus}>
                        {translateStatusTag(projectStatus)}
                      </Select.Option>
                    ))}
                  </Select>
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

export default ProjectUpdate;
