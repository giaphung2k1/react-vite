import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm, Table } from "antd";
import BookView from "./book.view";
import { useState } from "react";

const BookTable = (props) => {
    // Book Table 
    const { data, current, setCurrent,
        pageSize, setPageSize,
        total } = props;

    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            render: (text, record, index) => {
                return (index + 1) + (current - 1) * pageSize
            }
        },
        {
            title: 'Id',
            dataIndex: '_id',
            key: '_id',
            render: (text, record, index) => {
                return <a
                    onClick={() => handleBookView(record)}
                    href='#'>{text}</a>
            }
        },
        {
            title: 'Title',
            dataIndex: 'mainText',
            key: 'mainText',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text, record, index, action) => {
                if (text) {
                    return (
                        text.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                    )
                }

            }
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Author',
            dataIndex: 'author',
            key: 'author',
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

    const onChange = (event) => {
        if (+event.current !== +current) {
            setCurrent(+event.current)
        }
        if (event.pageSize !== pageSize) {
            setPageSize(event.pageSize)
        }

    }

    const clickUpdateBtn = () => {

    }
    const handleDeleteUser = () => {

    }
    // Book View
    const [openDrawer, setopenDrawer] = useState(false);
    const [bookDetail, setBookDetail] = useState({})

    const handleBookView = (record) => {
        setBookDetail(record);
        showDrawer()
    }
    const showDrawer = () => {
        setopenDrawer(true);
    };


    return (
        <>
            <Table
                rowKey={(record) => record._id}
                columns={columns}
                dataSource={data}
                onChange={onChange}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                    }}


            />

            <BookView
                openDrawer={openDrawer}
                bookDetail={bookDetail}
                setopenDrawer={setopenDrawer}
            />
        </>
    )
}
export default BookTable;