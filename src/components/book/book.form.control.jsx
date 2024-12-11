import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Image, Input, Modal, notification, Select, Upload } from "antd";
import { useState } from "react";
import { createBookAPI, uploadImage } from "../../services/api.service";

const BookFormControl = (props) => {


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');


    const [previewOpen, setPreviewOpen] = useState(false);

    const [title, setTitle] = useState(null);
    const [author, setAuthor] = useState(null);
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [category, setCategory] = useState('Business');
    const [fileList, setFileList] = useState([]);

    const {loadBook}= props;

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        if (fileList[0]) {
            const uploadImageRes = await uploadImage(fileList[0].originFileObj, 'book');
            if (uploadImageRes.data) {

                const imageName = uploadImageRes.data.fileUploaded;
                notification.success({
                    massage: "Upload image",
                    description: "Upload ảnh thành công"
                });

                const createBookRes = await createBookAPI(
                    title,
                    author,
                    +price,
                    +quantity,
                    category,
                    imageName,
                );

                if (createBookRes.data) {
                    notification.success({
                        massage: "Create book",
                        description: "Tạo book thành công"
                    });
                    loadBook();
                    handleCancel();

                }
                else {
                    notification.error({
                        massage: "Error create book",
                        description: JSON.stringify(createBookRes.message)
                    })
                }



            }
        }


    };
    const handleCancel = () => {
        setTitle(null);
        setAuthor(null);
        setPrice(0)
        setQuantity(1);
        setCategory('Business');
        setFileList([]);
        setIsModalOpen(false);
    };


    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '30px'
        }}>
            <h2>Books</h2>
            <div>
                <Button type="primary" onClick={showModal}>
                    Open Modal
                </Button>
                <Modal 
                maskClosable={false}
                title="Add Book" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <Form
                        layout='vertical'
                    >
                        <Form.Item label="Title">
                            <Input
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                                placeholder="Title" />
                        </Form.Item>
                        <Form.Item label="Author">
                            <Input
                                value={author}
                                onChange={(event) => setAuthor(event.target.value)}
                                placeholder="Author" />
                        </Form.Item>
                        <Form.Item label="Price">
                            <Input
                                onChange={(event) => setPrice(event.target.value)}
                                value={price}
                               
                                suffix="đ" />
                        </Form.Item>
                        <Form.Item label="Quantity">
                            <Input
                                onChange={(event) => setQuantity(event.target.value)}
                                value={quantity}
                                style={{
                                    width: '100%'
                                }}
                                defaultValue={1} />
                        </Form.Item>
                        <Form.Item label="Category">
                            <Select
                                onChange={(event) => setCategory(event)}
                                defaultValue={category}
                                value={category}
                                options={[
                                    { value: 'Business', label: 'Business' },
                                    { value: 'Arts', label: 'Arts' },
                                    { value: 'Teen', label: 'Teen' },
                                    { value: 'Cooking', label: 'Cooking' },
                                    { value: 'Entertainment', label: 'Entertainment' },
                                    { value: 'History', label: 'History' },
                                    { value: 'Music', label: 'Music' },
                                    { value: 'Sports', label: 'Sports' },
                                    { value: 'Comics', label: 'Comics' },
                                    { value: 'Travel', label: 'Travel' },
                                ]}
                            />
                        </Form.Item>

                        <Upload
                            listType="picture-circle"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                            beforeUpload={() => false}
                        >
                            {fileList.length >= 1 ? null : uploadButton}
                        </Upload>
                        {previewImage && (
                            <Image
                                wrapperStyle={{
                                    display: 'none',
                                }}
                                preview={{
                                    visible: previewOpen,
                                    onVisibleChange: (visible) => setPreviewOpen(visible),
                                    afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                }}
                                src={previewImage}
                            />
                        )}
                    </Form>
                </Modal>
            </div>
        </div >
    )
}

export default BookFormControl;