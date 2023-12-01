import React, { useState, useEffect } from 'react';
import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { handleRegister, reset } from './register.reducer';
import { Button, Col, Form, Input, Row, message } from 'antd';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';

export const RegisterPage = () => {
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  useEffect(
    () => () => {
      dispatch(reset());
    },
    [],
  );

  const handleValidSubmit = ({ username, email, firstPassword }) => {
    form
      .validateFields()
      .then(() => {
        dispatch(handleRegister({ login: username, email, password: firstPassword, langKey: 'en' }));
      })
      .catch(e => {
        console.error('There was an error on sing in', e);
      });
  };

  const updatePassword = event => setPassword(event.target.value);

  const successMessage = useAppSelector(state => state.register.successMessage);

  useEffect(() => {
    if (successMessage) {
      message.success(successMessage);
    }
  }, [successMessage]);

  return (
    <div className="padding">
      <Row justify="center">
        <Col xs={22} sm={22} md={18} lg={12} xl={12} xxl={12}>
          <Title level={2} id="register-title" data-cy="registerTitle">
            Create your free account
          </Title>
          <Form
            name="register"
            form={form}
            className="login-form"
            initialValues={{}}
            onFinish={handleValidSubmit}
            preserve={false}
            size="large"
            id="register-form"
            layout="vertical"
          >
            <Row gutter={[16, 16]}>
              <Col span="24">
                <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
                  <Input prefix={<UserOutlined />} placeholder="Username or Company" data-cy="username" minLength={1} maxLength={50} />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Email!',
                    },
                    { type: 'email', message: 'The input is not valid E-mail!' },
                  ]}
                >
                  <Input prefix={<MailOutlined />} placeholder="Your email" data-cy="email" minLength={5} maxLength={254} />
                </Form.Item>
                <Form.Item
                  name="firstPassword"
                  rules={[
                    { required: true, message: 'Please input your Password!' },
                    { min: 5, message: 'Please input a password longer than 7 characters' },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    onChange={updatePassword}
                    type="password"
                    placeholder="Password"
                    data-cy="firstPassword"
                    maxLength={50}
                  />
                </Form.Item>
                <PasswordStrengthBar password={password} />
                <Form.Item
                  name="secondPassword"
                  rules={[
                    { required: true, message: 'Please confirm your Password!' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('firstPassword') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('The new password that you entered do not match!'));
                      },
                    }),
                  ]}
                  dependencies={['password']}
                  hasFeedback
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    type="password"
                    placeholder="Confirm the new password"
                    data-cy="secondPassword"
                    minLength={5}
                    maxLength={50}
                  />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" block data-cy="submit">
                    Register
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default RegisterPage;
