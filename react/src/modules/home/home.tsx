import React, {
  // FC,
  useState,
  useEffect,
  // useMemo,
  // Fragment
} from 'react';
import EnSelect from 'reactcomponent/com/enhance/enSelect';
import BlockForm from 'reactcomponent/com/blockForm';
// import { useLocation } from 'react-router-dom';
import { useBeforeunload } from '@/hooks';
import logo from '../../logo.svg';
import style from './style.less';
    
const list = [{
  name: '肯德基',
  value: '1'
}, {
  name: '黄记煌',
  value: '2'
}]
    
const onChange = (value: any) => {
  console.log(value);
}
    
function Home() {
  useBeforeunload();

  const [joinDto, setJoinDto] = useState({
    joinSiteSelection: false,
    joinName: '百胜',
  });
    
  const formData = [
    {
      type: 'enRadio',
      label: '加盟商自主选址',
      name: 'joinSiteSelection',
      options: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
      span: 8,
    },
    {
      type: 'enInput',
      label: '加盟商',
      name: 'joinName',
      span: 8,
    },
    {
      type: 'enText',
      label: '加盟商类型',
      span: 8,
      text: '类型1'
    },
    {
      type: 'enCustom',
      label: '加盟商保护范围内',
      span: 24,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
        style: {
          'width': 'calc((100% - 36px)/9)',
          'maxWidth': 'none',
          'flex': 'none',
        }
      },
      render: (
        <div className=''>
              自定义
        </div>
      )
    }
  ];
    
  const paramCallback = (changedFields: any, fd: any) => {
    console.log(changedFields);
    console.log(fd);
    setJoinDto(fd);
  }
    
  return (
    <div className={`${style.home} p20`}>
      <img src={logo} className="App-logo" alt="logo" />

      <header>EnSelect: </header>
      <EnSelect label="单独使用" options={list} onChange={onChange} width="106px" noStyle={true} />

      <header>BlockForm: </header>
      <BlockForm
        paramCallback={paramCallback}
        formData={formData}
        initparams={joinDto}
        layout='horizontal'
        noborderBottom={true}
      />
    </div>
  )
}
    
export default Home;
    