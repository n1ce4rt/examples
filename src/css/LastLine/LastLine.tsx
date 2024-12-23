import React from 'react';
import { Flex, Typography } from 'antd';
import Title from 'antd/es/typography/Title';
import { Wrapper } from '../../components';
// CSS alignment of the last line

export const LastLine = () => {
  return (
    <Wrapper>
      <Flex vertical align="center" gap={24} justify="space-between">
        <Title>CSS выравнивание последней строки </Title>
        <div style={{ color: 'black', textAlignLast: 'right', width: '500px' }}>
          Тут у нас для приера много текста! Тут у нас для приера много текста!
          Тут у нас для приера много текста! Тут у нас для приера много текста!
          Тут у нас для приера много текста! А последнее слово нужно выровнять
          по правой стороне
        </div>
        <code>text-align-last: right</code>
        <Typography.Paragraph>
          text-align-last CSS-свойство описывает как выравнивается последняя
          строка в блоке или строка, идущая сразу перед принудительным разрывом
          строки
        </Typography.Paragraph>
      </Flex>
    </Wrapper>
  );
};
