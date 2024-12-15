import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { notification, Popconfirm, Table } from "antd";
import BookView from "./book.view";
import { useState } from "react";
import BookUpdateControl from "./book.update.control";
import BookUpdateUncontrol from "./book.update.uncontrol";
import { deleteBookAPI } from "../../services/api.service";

const BookTable = (props) => {
    // Book Table 
    const { data, current, setCurrent,
        pageSize, setPageSize,
        total, loadBook ,loadingTable,
        setLoadingTable} = props;

    const [isModalOpen, setIsModalOpen] = useState(false);
    

    const [bookUpdateDetail, setBookUpdateDetail] = useState({});
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
                        onConfirm={() => handleDeleteBook(record._id)}
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


    const showModal = () => {
        setIsModalOpen(true);
    };

    const clickUpdateBtn = (record) => {

        setBookUpdateDetail(record)
        showModal();
    }
    const handleDeleteBook = async (id) => {
        const deleteRes = await deleteBookAPI(id);
        if (deleteRes.data) {
            notification.success({
                massage: "Delete book",
                description: "Xoa book thành công"
            })

            await loadBook();
        } else {
            notification.error({
                massage: "Error delete book",
                description: JSON.stringify(deleteRes.message)
            })
        }
        
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
                loading={loadingTable}

            />
            {/* <BookUpdateControl
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            bookUpdateDetail={bookUpdateDetail}
            setBookUpdateDetail={setBookUpdateDetail}
            loadBook={loadBook}
            /> */}

            
            <BookUpdateUncontrol
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                bookUpdateDetail={bookUpdateDetail}
                setBookUpdateDetail={setBookUpdateDetail}
                loadBook={loadBook}
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