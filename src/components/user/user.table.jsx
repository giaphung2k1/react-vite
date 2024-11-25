import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import UpdateUserModal from './update.user.modal';
import { useState } from 'react';


const UserTable = (props) => {
    const {dataUsers} = props;
    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            render: (_, record) => {
                return (
                    <>
                    <a href="#">{record._id}</a>
                    </>
                )
            }
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div style={{display:"flex", gap:"20px"}}>
                <EditOutlined onClick={() => clickUpdateBtn(record)} style={{cursor:'pointer',color:"orange"}}/>
                <DeleteOutlined style={{cursor:"pointer", color:"red"}}/>
                </div>
            ),
          },
     
    ];

    const [IsModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate,setDataUpdate] = useState(null);


    const clickUpdateBtn = (record) => {
        setIsModalUpdateOpen(true);
        setDataUpdate(record)

    };

    return (
        <div>
            <Table 
            columns={columns} 
            dataSource={dataUsers}
            rowKey={"_id"}
            />
            <UpdateUserModal
            IsModalUpdateOpen={IsModalUpdateOpen}
            setIsModalUpdateOpen={setIsModalUpdateOpen}
            dataUpdate={dataUpdate}
            setDataUpdate={setDataUpdate}
            />
        </div>
        
    )
}

export default UserTable;