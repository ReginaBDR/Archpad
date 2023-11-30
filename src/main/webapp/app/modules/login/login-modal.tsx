import React from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Checkbox, Col, Form, Input, Modal, Row, Space } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

export interface ILoginModalProps {
  showModal: boolean;
  loginError: boolean;
  handleLogin: (username: string, password: string, rememberMe: boolean) => void;
  handleClose: () => void;
}

const LoginModal = (props: ILoginModalProps) => {
  const { loginError, handleLogin, handleClose } = props;
  const [form] = Form.useForm();

  const handleLoginSubmit = (values: { username: string; password: string; rememberMe: boolean }) => {
    form
      .validateFields()
      .then(() => {
        handleLogin(values.username, values.password, values.rememberMe);
      })
      .catch(e => {
        console.error('There was an error on sing in', e);
      });
  };

  return (
    <Modal open={props.showModal} onCancel={handleClose} title="Sign in" okText="Sign in" footer={null}>
      <Form
        name="login"
        form={form}
        className="login-form"
        initialValues={{ rememberMe: true }}
        onFinish={handleLoginSubmit}
        preserve={false}
        size="large"
      >
        <Row gutter={[16, 16]}>
          <Col span="24">
            {loginError ? (
              <Alert type="error" data-cy="loginError" message="Failed to sign in! Please check your credentials and try again." />
            ) : null}
          </Col>
          <Col span="24">
            <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
              <Input prefix={<UserOutlined />} placeholder="Username" data-cy="username" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
              <Input prefix={<LockOutlined />} type="password" placeholder="Password" data-cy="password" />
            </Form.Item>
            <Form.Item>
              <Form.Item name="rememberMe" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Link style={{ float: 'right' }} to="/account/reset/request" data-cy="forgetYourPasswordSelector">
                Forgot password
              </Link>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ marginBottom: '10px' }} block>
                Log in
              </Button>
              Or <Link to="/account/register">register now!</Link>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default LoginModal;
