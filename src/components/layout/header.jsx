import { Menu, message } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { HomeOutlined, UserOutlined, BookOutlined, LoginOutlined, AliwangwangOutlined } from '@ant-design/icons';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { logoutAPI } from '../../services/api.service';
const Header = () => {
  let location = useLocation();


  const [current, setCurrent] = useState('/home');
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  // console.log(">>>>>data", user);

  const onClick = (e) => {
    setCurrent(e.key);
  };



  useEffect(() => {
    if (location) {
      if (current !== location.pathname) {
        setCurrent(location.pathname);
      }
    }
  }, [location, current]);

  const handleLogout = async () => {
    const res = await logoutAPI();
    if (res && res.data) {
      // Clear data
      localStorage.removeItem('access_token');
      setUser({
        id: "",
        email: "",
        phone: "",
        fullName: "",
        role: "",
        avatar: ""
      })
      message.success("Logout thành công")
      navigate('/')
    }
  }
  const items = [
    {
      label: <Link to={'/'}>Home</Link>,
      key: '/home',
      icon: <HomeOutlined />,
    },
    {
      label: <Link to={'users'}>Users</Link>,
      key: '/users',
      icon: <UserOutlined />,
    },
    {
      label: <Link to={'book'}>Book</Link>,
      key: '/book',
      icon: <BookOutlined />

    },
    ...(!user.id) ? [{
      label: <Link to='/login'>Login</Link>,
      key: '/login',
      icon: <LoginOutlined />
    }] : [],

    ...(user.id) ? [{
      label: `Welcome ${user.fullName}`,
      key: '/setting',
      icon: <AliwangwangOutlined />,
      children: [
        {
          key: 'logout',
          label: <span
            onClick={handleLogout}
          >Logout</span>,

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