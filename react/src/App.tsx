import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider, Spin } from 'antd';
import routes from './conf/routes';
import NoMatch from 'components/nomatch';
import Layout from 'components/layout';
// import { hot } from 'react-hot-loader/root'// 配合HotModuleReplacementPlugin 热更新不刷新页面

interface IProps {
  gloading?: boolean
}

class App extends React.Component<IProps> {

  public render() {
    const { gloading = false } = this.props;

    return (
      <ConfigProvider locale={zhCN}>
        <Spin spinning={gloading} tip="加载中..." wrapperClassName={'high-100'}>
          
          <Layout>
            <Routes>
              {/* <Route path="/" element={<Home />} />
                <Route path="about" element={<About />} /> */}
              {
                routes.map(item => (
                  <Route key={item.path as string} path={item.path} element={item.component} />
                ))
              }
              <Route element={<NoMatch />} />
            </Routes>
          </Layout>

        </Spin>
      </ConfigProvider >
    );
  }
}

// export default hot(App);
export default App;
