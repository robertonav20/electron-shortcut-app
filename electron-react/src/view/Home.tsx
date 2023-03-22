import { Layout } from 'antd';
import FooterComponent from '../component/FooterComponent';
import MenuComponent from '../component/MenuComponent';
import View from './View';

import "../style/home-style.scss"

const { Header, Footer, Content } = Layout;

const Home = () => (
    <Layout className="layout">
      <Header><MenuComponent/></Header>
      <Content className="content"><View/></Content>
      <Footer><FooterComponent/></Footer>
    </Layout>
);
export default Home;