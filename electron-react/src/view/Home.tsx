import React from 'react';
import { Layout } from 'antd';

const { Header, Footer, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px'
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  height: '100%',
  background: 'lightgrey',
  padding: '5rem',
  overflow: 'auto',
};

const footerStyle: React.CSSProperties = {
};

const Home = () => (
    <Layout
    style={{
      width: '100%',
      height: '100%'
    }}>
      <Header style={headerStyle}>Header</Header>
      <Content style={contentStyle}><span>Hellooooo</span></Content>
      <Footer style={footerStyle}>Footer</Footer>
    </Layout>
);
export default Home;