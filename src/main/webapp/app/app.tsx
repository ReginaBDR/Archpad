import 'react-toastify/dist/ReactToastify.css';
import './app.scss';
import 'app/config/dayjs';
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getSession } from 'app/shared/reducers/authentication';
import { getProfile } from 'app/shared/reducers/application-profile';
import HeaderComponent from 'app/shared/layout/header/header';
import FooterComponent from 'app/shared/layout/footer/footer';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import ErrorBoundary from 'app/shared/error/error-boundary';
import { AUTHORITIES } from 'app/config/constants';
import AppRoutes from 'app/routes';
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

const baseHref = document.querySelector('base').getAttribute('href').replace(/\/$/, '');

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSession());
    dispatch(getProfile());
  }, []);

  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
  const isAdmin = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.ADMIN]));
  const isOpenAPIEnabled = useAppSelector(state => state.applicationProfile.isOpenAPIEnabled);

  return (
    <BrowserRouter basename={baseHref}>
      <Layout style={{ minHeight: '370vh' }}>
        <ToastContainer position={toast.POSITION.TOP_LEFT} className="toastify-container" toastClassName="toastify-toast" />
        <ErrorBoundary>
          <Header style={{ backgroundColor: '#ffff' }}>
            <HeaderComponent isAuthenticated={isAuthenticated} isAdmin={isAdmin} isOpenAPIEnabled={isOpenAPIEnabled} />
          </Header>
        </ErrorBoundary>
        <ErrorBoundary>
          <Content style={{ padding: '0 40px' }}>
            <AppRoutes />
          </Content>
        </ErrorBoundary>
        <Footer style={{ backgroundColor: '#ffff' }}>
          <FooterComponent />
        </Footer>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
