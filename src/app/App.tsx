import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { JavaScriptOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { LastLine } from '../css';
import { ClickAnimation } from '../javaScript';

const { Content, Header, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

interface Topic {
  title: string;
  description: string;
  components?: React.ReactNode;
  image?: string;
  href: string;
  element: React.ReactNode | null;
}

interface TopicData {
  [key: string]: {
    title: string;
    icon: React.ReactNode;
    href: string;
    children: Topic[];
  };
}

// Пример данных
const topics: TopicData = {
  JavaScript: {
    title: 'JavaScript',
    icon: <JavaScriptOutlined />,
    href: 'javascript',
    children: [
      {
        title: 'ClickAnimation',
        description: 'Изучение базовых концепций',
        href: '/javascript/click',
        element: <ClickAnimation />,
      },
    ],
  },
  React: {
    title: 'React',
    icon: <JavaScriptOutlined />,
    href: 'react',
    children: [
      {
        title: 'Компоненты в React',
        description: 'Понимание компонентов и их типов',
        href: '/react/components',
        element: null,
      },
    ],
  },
  Redux: {
    title: 'Redux',
    icon: '',
    href: 'redux',
    children: [
      {
        title: 'Основы Redux',
        description: 'Менеджмент состояния',
        href: '/redux/basics',
        element: null,
      },
    ],
  },
  CSS: {
    title: 'CSS',
    icon: '',
    href: 'css',
    children: [
      {
        title: 'Выравнивание последней строки',
        description: 'CSS',
        href: '/css/last_line',
        element: <LastLine />,
      },
    ],
  },
};

// Функция для преобразования данных в элементы меню
const generateMenuItems = (data: TopicData): MenuItem[] => {
  return Object.keys(data).map((key) => ({
    key,
    icon: data[key].icon,
    label: data[key].title,
    children: data[key].children.map((item, index) => ({
      key: `${key}-${index}`,
      label: <Link to={item.href}>{item.title}</Link>,
    })),
  }));
};

const items: MenuItem[] = generateMenuItems(topics);

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 'auto',
  paddingInline: 48,
  backgroundColor: '#4096ff',
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: '93vh',
  backgroundColor: 'whitesmoke',
};

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  height: '100%',
  color: '#fff',
  backgroundColor: '#1677ff',
};

const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
};

export const App: React.FC = () => {
  const [stateOpenKeys, setStateOpenKeys] = useState<string[]>([]);

  const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
    setStateOpenKeys(openKeys);
  };

  return (
    <Router>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>Header</Header>
        <Layout>
          <Sider style={siderStyle}>
            <Menu
              mode="inline"
              openKeys={stateOpenKeys}
              onOpenChange={onOpenChange}
              style={{ width: 'auto', height: 'auto' }}
              items={items}
            />
          </Sider>
          <Content style={contentStyle}>
            <Routes>
              {Object.keys(topics).map((value) =>
                topics[value].children.map(({ href, element }, index) => (
                  <Route
                    key={`${href}-${index}`}
                    path={href}
                    element={element} // Простая страница с описанием
                  />
                )),
              )}
            </Routes>
          </Content>
        </Layout>
        {/*<Footer style={footerStyle}>123</Footer>*/}
      </Layout>
    </Router>
  );
};
