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



    const [dataUsers,setDataUsers] = useState([]);

    

    useEffect(() => {
        loadUser()
    },[])




    const loadUser = async() => {
        const res = await fetchAllUserAPI();

        setDataUsers(res.data)
        

    }

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