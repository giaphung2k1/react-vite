import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Table, Popconfirm, notification } from 'antd';
import UpdateUserModal from './update.user.modal';
import { useState } from 'react';
import ViewUserDetail from './view.user.detail';
import { deleteUserAPI } from "../../services/api.service";

const UserTable = (props) => {
    const { dataUsers, loadUser,current,setCurrent,pageSize,setPageSize,total,loadingUserTable} = props;
    const columns = [
        {
            title: '#',
            render: (_, record, index) => {
                return (index+ 1) + (current - 1) * pageSize; 
            }
        },
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
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={() => handleDeleteUser(record._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                    </Popconfirm>

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


    const showModalUserDetail = (record) => {
        showDrawer();
        setDataUserDetail(record);

    }

    const clickUpdateBtn = (record) => {
        setIsModalUpdateOpen(true);
        setDataUpdate(record)

    };



    // Delete

    const handleDeleteUser = async (id) => {

        const res = await deleteUserAPI(id);

        if (res.data) {
            notification.success({
                massage: "Delete user",
                description: "Xoa user thành công"
            })

            await loadUser();
        } else {
            notification.error({
                massage: "Error delete user",
                description: JSON.stringify(res.message)
            })
        }
    }

    const onChange = (pagination, filters, sorter, extra) => { 
        if( pagination && pagination.current){
            if(+current !== +pagination.current){
                setCurrent(+pagination.current)
            }
        }
        if(pagination && pagination.pageSize){
            if(+pageSize !== +pagination.pageSize){
                setPageSize(+pagination.pageSize)
            }
        }
    };



    return (
        <div>
            <Table
                columns={columns}
                dataSource={dataUsers}
                rowKey={"_id"}
                onChange={onChange}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                    }}
                    loading={loadingUserTable}
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
                loadUser={loadUser}
            />


        </div>

    )
}

export default UserTable;