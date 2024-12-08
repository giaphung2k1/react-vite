import { Menu } from 'antd';
import { Link } from 'react-router-dom';

import { HomeOutlined, UserOutlined, BookOutlined, LoginOutlined, AliwangwangOutlined } from '@ant-design/icons';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/auth.context';
const Header = () => {
  const [current, setCurrent] = useState('home');

  const { user } = useContext(AuthContext);

  console.log(">>>>>data", user);

  const onClick = (e) => {
    setCurrent(e.key);
  };
  const items = [
    {
      label: <Link to={'/'}>Home</Link>,
      key: 'home',
      icon: <HomeOutlined />,
    },
    {
      label: <Link to={'users'}>Users</Link>,
      key: 'users',
      icon: <UserOutlined />,
    },
    {
      label: <Link to={'book'}>Book</Link>,
      key: 'book',
      icon: <BookOutlined />

    },
    ...(!user.id) ? [{
      label: <Link to='/login'>Login</Link>,
      key: 'login',
      icon: <LoginOutlined />
    }] : [],
    
    ...(user.id) ? [{
      label: `Welcome ${user.fullName}`,
      key: 'setting',
      icon: <AliwangwangOutlined />,
      children: [
        {
          key: 'logout',
          label: 'Đăng xuất',

        },
      ],
    }] : [],
    
  ];



  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  )
}

export default Header;