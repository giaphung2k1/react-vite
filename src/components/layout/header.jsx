import { Menu } from 'antd';
import { Link } from 'react-router-dom';

import { HomeOutlined, UserOutlined, BookOutlined, SettingOutlined } from '@ant-design/icons';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/auth.context';
const Header = () => {
    const [current, setCurrent] = useState('home');

    const {user} = useContext(AuthContext);

    console.log(">>>>>data",user);
    
    const onClick = (e) => {
        console.log('click ', e);
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
            label:<Link to={'book'}>Book</Link>,
            key: 'book',
            icon: <BookOutlined />
            
        },
        {
            label: 'Setting',
            key: 'SubMenu',
            icon: <SettingOutlined />,
            children: [
              {
                type: 'group',
                label: <Link to='/login'>Login</Link>,
                
              },
              {
                type: 'group',
                label: <Link to='/register'>Register</Link>,
                
              },
            ],
          },
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