import React, {
  useState,
  useEffect
} from 'react';
import {
  ContainerOutlined,
  DesktopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import classnames from 'classnames';
import Icon from '@/components/icon';
import { Menu } from 'antd';
import style from './style.less';

const items = [{
  label: 'Option 1',
  key: '1',
  icon: <PieChartOutlined />
},{
  label: 'Option 2',
  key: '2',
  icon: <DesktopOutlined />
},{
  label: 'Option 3',
  key: '3',
  icon: <ContainerOutlined />
}]

function Layout({children}: any) {
  const [collapsed, setCollapsed] = useState(true);
  const location = useLocation();
  useEffect(() => {
    console.dir(location);
  }, [location]);

  return (
    <div className={classnames(style.layout, 'flex')}>
      {<div className="common-top flex jc-between al-center">
        <div>
          <Link to="/">首页</Link>
        </div>
        <div className="common-top-right float-right">
          <span className="user-info theme-hover"><b><Icon type='icon-touxiang1' /></b> 用户名</span>
        </div>
      </div>}
      <div className="common-bottom flex">
        {<div className={classnames('common-left', {
          'common-collapsed': collapsed,
        })}
        >
          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
            inlineCollapsed={collapsed}
            items={items}
          />
          <span
            className="collapsed"
            onClick={() => setCollapsed(!collapsed)}
          >
            { !collapsed && <MenuFoldOutlined /> }
            { collapsed && <MenuUnfoldOutlined /> }
          </span>
        </div>}

        <div className="common-right">
          <div className="common-content">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;