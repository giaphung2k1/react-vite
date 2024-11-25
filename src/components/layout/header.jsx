import { Menu } from 'antd';
import { Link, NavLink } from 'react-router-dom';

import { HomeOutlined, UserOutlined, BookOutlined } from '@ant-design/icons';
import { useState } from 'react';
const Header = () => {
    const [current, setCurrent] = useState('home');
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