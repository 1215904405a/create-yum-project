import React from 'react';
import {
  // Spin,
  Skeleton,
} from 'antd';

function Loading() {
  return (
    <div className="">
      {/* <Spin tip="Loading..." /> */}
      <Skeleton active={true} paragraph={{ rows: 10, width: 1000 }} />
    </div>
  );
}

export default Loading;
