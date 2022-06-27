import React from 'react'
// require('@/static/iconfont/iconfont.js')

interface IProps {
  type: string,
  style?: any,
  onClick?: () => void
}

export default function Icon(props: IProps) {
  return (
    <svg className='icon' style={props.style} aria-hidden="true" onClick={props.onClick}>
      <use xlinkHref={`#${props.type}`} />
    </svg>
  )
}