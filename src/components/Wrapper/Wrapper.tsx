import React from 'react';
import { Content } from 'antd/es/layout/layout';
import { theme } from 'antd';

interface IProps {
  children: React.ReactNode;
}

export const Wrapper: React.FC<IProps> = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Content
      style={{
        height: 'auto',
        width: '50%',
        margin: '10vh auto',
        position: 'relative',

        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      {children}
    </Content>
  );
};
