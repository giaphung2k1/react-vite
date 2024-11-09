import { Table } from 'antd';
import { fetchAllUserAPI } from '../../services/api.service';
import { useEffect, useState } from 'react';
const UserTable = () => {
    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
     
    ];



    const [dataUsers,setDataUsers] = useState([
        {_id: 1, fullName: "Hung", email : "giaphung2k1@gmail.com"},
    
    ]);

    useEffect(() => {
        console.log(">>>>>> run useEffect 111");
        loadUser()
    },[])

    const loadUser = async() => {
        const res = await fetchAllUserAPI();

        setDataUsers(res.data)
        

    }

    

    console.log(">>>>>> run 0000");

    return (
        <div>
            <Table 
            columns={columns} 
            dataSource={dataUsers}
            rowKey={"_id"}
            />
        </div>
    )
}

export default UserTable;