

import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Image, Input, Modal, notification, Select, Upload } from "antd";
import { useState } from "react";
import { createBookAPI, uploadImage } from "../../services/api.service";

const BookFormUncontrol = (props) => {


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');


    const [previewOpen, setPreviewOpen] = useState(false);

    const [form] = Form.useForm();
    const { loadBook } = props;

    const [loadingBookCreate, setLoadingBookCreate] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
    };




    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

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
    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });


    const onFinish = async (values) => {

        const uploadImageRes = await uploadImage(values.thumbnail.file, 'book');

        if (uploadImageRes.data) {
            setLoadingBookCreate(true)
            const imageName = uploadImageRes.data.fileUploaded;
            notification.success({
                massage: "Upload image",
                description: "Upload ảnh thành công"
            });

            const createBookRes = await createBookAPI(
                values.title,
                values.author,
                +values.price,
                +values.quantity,
                values.category,
                imageName,
            );

            if (createBookRes.data) {
                notification.success({
                    massage: "Create book",
                    description: "Tạo book thành công"
                });
                setLoadingBookCreate(false)
                loadBook();
                handleCancel();
               

            }

            else {
                notification.error({
                    massage: "Error create book",
                    description: JSON.stringify(createBookRes.message)
                })
                setLoadingBookCreate(false)
            }

            

        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

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
                    okButtonProps={{
                        loading: loadingBookCreate
                    }}
                    title="Add Book" open={isModalOpen} onOk={() => form.submit()} onCancel={handleCancel}>

                    <Form
                        form={form}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        layout='vertical'
                    >
                        <Form.Item
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your title!',
                                },
                            ]}
                            label="Title">
                            <Input
                                placeholder="Title" />
                        </Form.Item>
                        <Form.Item
                            name='author'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your author!',
                                },
                            ]}
                            label="Author">
                            <Input
                                placeholder="Author" />
                        </Form.Item>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your price!',
                                },
                            ]}
                            name='price'
                            label="Price">
                            <Input

                                suffix="đ" />
                        </Form.Item>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your quantity!',
                                },
                            ]}
                            name='quantity'
                            label="Quantity">
                            <Input
                                style={{
                                    width: '100%'
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            name='category'
                            label="Category">
                            <Select

                                defaultValue='Business'
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
                        <Form.Item
                            name='thumbnail'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please upload',
                                },
                            ]}
                        >
                            <Upload
                                listType="picture-circle"
                                onPreview={handlePreview}
                                beforeUpload={() => false}
                                maxCount={1}

                            >
                                {uploadButton}
                            </Upload>
                        </Form.Item>
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

export default BookFormUncontrol;