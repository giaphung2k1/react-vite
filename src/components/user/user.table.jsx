import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Table, Drawer } from 'antd';
import UpdateUserModal from './update.user.modal';
import { useState } from 'react';
import ViewUserDetail from './view.user.detail';


const UserTable = (props) => {
    const { dataUsers, loadUser } = props;
    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            render: (_, record) => {
                return (
                    <>
                        <a href="#"
                            onClick={() => showModalUserDetail(record)}

                        >{record._id}</a>
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
                <div style={{ display: "flex", gap: "20px" }}>
                    <EditOutlined onClick={() => clickUpdateBtn(record)} style={{ cursor: 'pointer', color: "orange" }} />
                    <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                </div>
            ),
        },

    ];

    const [IsModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);
    const [dataUserDetail, setDataUserDetail] = useState(null);


    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };


    const showModalUserDetail = (record) => {
        showDrawer();
        setDataUserDetail(record);

    }

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
                loadUser={loadUser}
            />

            <ViewUserDetail
            setOpen={setOpen} 
            open={open}
            dataUserDetail={dataUserDetail}
            setDataUserDetail={setDataUserDetail}
            />
        </div>

    )
}

export default UserTable;