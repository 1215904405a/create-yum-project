import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider, Spin } from 'antd';
import routes from './conf/routes';
import NoMatch from 'components/nomatch';
import Layout from 'components/layout';

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
              {
                routes.map(item => (
                  <Route key={item.path as string} path={item.path} element={item.element} />
                ))
              }
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </Layout>

        </Spin>
      </ConfigProvider >
    );
  }
}

export default App;
