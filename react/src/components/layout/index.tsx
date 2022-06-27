import React, {
  Component
} from 'react';
import {
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import urls, { urlObj } from '@/conf/url';
// import Logo from '@/images/logo.png';
// import TopText from '@/images/top_text.png';
import Icon from '@/components/icon';
// import { userReDetail } from '@/api/user';
import style from './style.less';

class Layout extends Component {

  public tabKeysObj = {} // tab重复问题记录

  public isTabClick = false
  public tabTitle: any;

  public constructor(props: any) {
    super(props);
  }

  public toggleCollapsed = () => {
    const { collapsed }: any = this.state;
    this.setState({
      collapsed: !collapsed,
    });
  };

  public render() {
    const { children, location, username }: any = this.props;

    return (
      <div className={classnames(style.layout, 'flex')}>
        {<div className="common-top flex jc-between al-center">
          <div>
            <Link to="/home">home</Link>
          </div>
          <div className="common-top-right float-right">
            <span className="user-info theme-hover"><b><Icon type='icon-touxiang1' /></b> {username}</span>
          </div>
        </div>}
        <div className="common-bottom flex">
          {<div className={classnames('common-left', {
            'common-collapsed': false,
          })}
          >
            <span
              className="collapsed"
              onClick={this.toggleCollapsed}
            >
              {React.createElement(MenuUnfoldOutlined)}
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
}

export default Layout;