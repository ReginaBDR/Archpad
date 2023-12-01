import React from 'react';
import { useNavigate } from 'react-router-dom';
import QueueAnim from 'rc-queue-anim';
import { useAppSelector } from 'app/config/store';
import { Button, Col, Row, Space } from 'antd';
import BannerImage from './banner-image';
import HomeSectionOne from './home-section-1';
import HomeSectionTwo from './home-section-2';
import { bannerData } from './home-data';
import './home.scss';

export const Home = () => {
  const account = useAppSelector(state => state.authentication.account);
  const navigate = useNavigate();
  const { title, paragraphOne, paragraphTwo } = bannerData;

  return (
    <>
      <Row align="middle" className="home-banner" gutter={[20, 20]}>
        <Col xs={24} sm={24} md={10} lg={10} xl={12}>
          <Row justify="center" align="middle">
            <QueueAnim delay={300} ease="easeOutQuart">
              <h1 key="h2">{title}</h1>
              <p key="p">
                {paragraphOne}
                <br />
                {paragraphTwo}
              </p>
              <span key="button">
                {account?.login ? (
                  <Button
                    type="primary"
                    size="large"
                    className="home-banner-btn"
                    onClick={() => {
                      navigate('/project');
                    }}
                  >
                    View your Projects
                  </Button>
                ) : (
                  <Space wrap size="middle">
                    <Button
                      type="primary"
                      size="large"
                      className="home-banner-btn"
                      onClick={() => {
                        navigate('/login');
                      }}
                    >
                      Sign In
                    </Button>
                    <Button
                      type="primary"
                      size="large"
                      className="home-banner-btn"
                      onClick={() => {
                        navigate('/account/register');
                      }}
                    >
                      Register
                    </Button>
                  </Space>
                )}
              </span>
            </QueueAnim>
          </Row>
        </Col>
        <Col xs={24} sm={24} md={14} lg={14} xl={12}>
          <Row justify="end" align="middle">
            <BannerImage />
          </Row>
        </Col>
      </Row>
      <Row gutter={[16, 16]} align="middle" className="background-white">
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
