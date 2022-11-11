import React from 'react'
import SharedLayout from './SharedLayout';
import { Typography } from 'antd';
const { Title } = Typography;

const Forex = () => {
  return (
    <>
      <Title level={2} className="heading">Forex</Title>
      <SharedLayout />
    </>
  )
}

export default Forex