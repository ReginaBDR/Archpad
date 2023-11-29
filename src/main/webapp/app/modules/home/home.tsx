import './home.scss';
import React from 'react';
import { redirect } from 'react-router-dom';
import QueueAnim from 'rc-queue-anim';
import { useAppSelector } from 'app/config/store';
import { Button, Col, Row } from 'antd';
import BannerImage from './banner-image';
import HomeSectionOne from './home-section-1';
import HomeSectionTwo from './home-section-2';

export const Home = () => {
  const account = useAppSelector(state => state.authentication.account);

  return (
    <>
      <Row align="middle" className="home-banner" gutter={[20, 20]}>
        <Col xs={24} sm={24} md={10} lg={10} xl={12}>
          <Row justify="center" align="middle">
            <QueueAnim delay={300} ease="easeOutQuart">
              <h1 key="h2">Welcome to Archipad</h1>
              <p key="p">
                Your all-in-one solution for efficient and seamless architecture project management. <br /> Unleash the full potential of
                your projects with our intuitive and feature-rich platform designed specifically for architects and project teams.
              </p>
              {!account?.login && (
                <span key="button">
                  <Button
                    type="primary"
                    size="large"
                    onClick={() => {
                      redirect('/login');
                    }}
                  >
                    Login
                  </Button>
                </span>
              )}
            </QueueAnim>
          </Row>
        </Col>
        <Col xs={24} sm={24} md={14} lg={14} xl={12}>
          <Row justify="end" align="middle">
            <BannerImage />
          </Row>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <HomeSectionOne />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <HomeSectionTwo />
        </Col>
      </Row>
    </>
  );
};

export default Home;
