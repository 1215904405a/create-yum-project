import React, {
  // FC,
  useState,
  // useMemo,
  // Fragment
} from 'react';
import { Button, Form } from 'antd';
import EnSelect from 'reactcomponent/com/enhance/enSelect';
import BlockForm from 'reactcomponent/com/blockForm';
    
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
    
function Ifrom() {
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
    },
    // {
    //   type: 'enSelect',
    //   label: '加盟商大类',
    //   rules: [{ required: true, message: '请选择加盟商大类!' }],
    //   name: 'joinCategory',
    //   options: dropDown.joinTypeList.map((item: any) => ({
    //     ...item,
    //     label: item.macroName,
    //     value: item.macroCode
    //   })) || [],
    //   onChange: (value: any, option?: any) => {
    //     setJoinSmallType(option.joinSmallTypeDTOS || [])
    //     setJoinDto({
    //       ...joinDto,
    //       joinCategory: value,
    //       joinSubCategory: ''
    //     })
    //   },
    //   span: 8,
    // },
  ];
    
  const paramCallback = (changedFields: any, fd: any) => {
    console.log(changedFields);
    console.log(fd);
    setJoinDto(fd);
  }
    
  return (
    <div className="p20">
      <header>select: </header>
      <EnSelect label="单独使用" options={list} onChange={onChange} width="106px" noStyle={true} required={true} />
      <Button className="m-l-17">单独使用</Button>
      <Form layout="inline">
        <EnSelect label="form使用" name="pp" options={list} onChange={onChange} width="106px" required={true} />
        <Button>form内使用</Button>
      </Form>
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
    
export default Ifrom;
    