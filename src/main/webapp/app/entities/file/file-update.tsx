import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { IProject } from 'app/shared/model/project.model';
import { getEntities as getProjects } from 'app/entities/project/project.reducer';
import { IProgress } from 'app/shared/model/progress.model';
import { getEntities as getProgresses } from 'app/entities/progress/progress.reducer';
import { IFile } from 'app/shared/model/file.model';
import { getEntity, updateEntity, createEntity, reset } from './file.reducer';
import { Button, Col, Form, Input, Row } from 'antd';
import Title from 'antd/es/typography/Title';
import { InboxOutlined } from '@ant-design/icons';
import Dragger from 'antd/es/upload/Dragger';

export const FileUpdate = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isNew = location?.state?.id === null;
  const [form] = Form.useForm();
  const projects: IProject[] = useAppSelector(state => state.project.entities);
  const progresses: IProgress[] = useAppSelector(state => state.progress.entities);
  const updating = useAppSelector(state => state.file.updating);
  const updateSuccess = useAppSelector(state => state.file.updateSuccess);
  const [uploadedFile, setUploadedFile] = useState<File | Blob | null>(null);

  const handleClose = () => {
    setUploadedFile(null);
    form.resetFields();
    navigate(-1);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(location?.state?.id));
    }
    dispatch(getProjects({}));
    dispatch(getProgresses({}));
  }, []);

  const fileEntity: IFile = useAppSelector(state => state.file.entity);

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
          ...fileEntity,
          ...values,
          project: projects.find(it => it.id.toString() === location?.state?.projectId.toString()),
          progress: null, // progresses.find(it => it.id.toString() === values.progress.toString()),
        };

        if (isNew) {
          dispatch(createEntity(entity));
        } else {
          dispatch(updateEntity(entity));
        }
      })
      .catch(e => {
        console.error('There was an error uploading the file', e);
      });
  };

  const defaultValues = () => (isNew ? {} : { ...fileEntity });

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div className="padding">
      <Row justify="center">
        <Col xs={22} sm={22} md={18} lg={18} xl={18} xxl={18}>
          <Title level={2} id="createOrEditLabel" data-cy="FileCreateUpdateHeading">
            {isNew ? 'Upload a File' : 'Edit a File'}
          </Title>
          <Form name="file" form={form} initialValues={defaultValues()} onFinish={saveEntity} size="large" id="file-id" layout="vertical">
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: 'Please input a name',
                    },
                  ]}
                >
                  <Input placeholder="Name" data-cy="name" />
                </Form.Item>
                <Form.Item label="Description" name="description">
                  <Input placeholder="Description" data-cy="description" />
                </Form.Item>
                <Form.Item
                  name="file"
                  // valuePropName="fileList"
                  data-cy="file"
                  getValueFromEvent={normFile}
                  style={{ width: '100%' }}
                  rules={[
                    {
                      required: true,
                      message: 'Please upload a file',
                    },
                  ]}
                >
                  <Dragger
                    accept="image/*,.pdf,.xlsx"
                    disabled={uploadedFile !== null}
                    listType="picture"
                    multiple={false}
                    maxCount={1}
                    showUploadList={{ showRemoveIcon: false }}
                    beforeUpload={(file: File) => setUploadedFile(file)}
                    customRequest={({ onSuccess, onError }) => {
                      onSuccess(uploadedFile);
                    }}
                  >
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined rev={undefined} />
                    </p>
                    <p className="ant-upload-text">Click or drag a file to this area to upload</p>
                    <p className="ant-upload-hint">Support for a single upload in .xlsx, .pdf, .txt .ifc and image formats</p>
                  </Dragger>
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

export default FileUpdate;
