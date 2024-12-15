import { PlusOutlined } from "@ant-design/icons";
import { Form, Image, Input, Modal, notification, Select, Upload } from "antd";
import { useEffect, useState } from "react";
import { updateBookAPI, uploadImage } from "../../services/api.service";

const BookUpdateUncontrol = (props) => {
    const { isModalOpen, setIsModalOpen, bookUpdateDetail, setBookUpdateDetail, loadBook } = props;
    const [previewImage, setPreviewImage] = useState('');
    const [previewOpen, setPreviewOpen] = useState(false);

    const [form] = Form.useForm();

    const [fileList, setFileList] = useState([]);

    const [loadingBookUpdate, setLoadingBookUpdate] = useState(false);


    useEffect(() => {
        if (bookUpdateDetail._id) {
            form.setFieldsValue({
                title: bookUpdateDetail.mainText,
                author: bookUpdateDetail.author,
                price: bookUpdateDetail.price,
                quantity: bookUpdateDetail.quantity,
                category: bookUpdateDetail.category
            })

            if (bookUpdateDetail.thumbnail) {
                getBase64ImageFromUrl(`${import.meta.env.VITE_BACKEND_URL}/images/book/${bookUpdateDetail.thumbnail}`)
                    .then(result => {
                        setFileList([
                            {
                                thumbUrl: result
                            }
                        ])
                    }
                    )
                    .catch(err => console.error(err));
            }
        }

    }, [bookUpdateDetail])


    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });


    const getBase64ImageFromUrl = async (imageUrl) => {
        var res = await fetch(imageUrl);
        var blob = await res.blob();

        return new Promise((resolve, reject) => {
            var reader = new FileReader();
            reader.addEventListener("load", function () {
                resolve(reader.result);
            }, false);

            reader.onerror = () => {
                return reject(this);
            };
            reader.readAsDataURL(blob);
        })
    }




    const handlePreview = async (file) => {

        if (file.name) {
            if (!file.url && !file.preview) {

                file.preview = await getBase64(file.originFileObj);
            }
            setPreviewImage(file.url || file.preview);
        }
        else {
            setPreviewImage(file.thumbUrl);
        }


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



    const handleSubmitForm = async (values) => {

        const { title,
            author,
            price,
            quantity,
            category } = values;

        const _id = bookUpdateDetail._id;



        if (fileList.length > 0) {
            if (fileList[0].name) {
                setLoadingBookUpdate(true);
                const uploadImageRes = await uploadImage(fileList[0].originFileObj, 'book');
                if (uploadImageRes.data) {
                    const imageName = uploadImageRes.data.fileUploaded;
                    notification.success({
                        massage: "Upload image",
                        description: "Upload ảnh thành công"
                    });


                    const updateBookRes = await updateBookAPI(
                        _id,
                        title,
                        author,
                        +price,
                        +quantity,
                        category,
                        imageName,
                    );

                    if (updateBookRes.data) {
                        notification.success({
                            massage: "Update book",
                            description: "Cập nhật book thành công"
                        });
                        setLoadingBookUpdate(false);
                        loadBook();
                        handleCancel();

                    }
                    else {
                        setLoadingBookUpdate(false);
                        notification.error({
                            massage: "Error update book",
                            description: JSON.stringify(updateBookRes.message)
                        })
                    }



                }
            }
            else {
                setLoadingBookUpdate(true);
                const updateBookRes = await updateBookAPI(
                    _id,
                    title,
                    author,
                    +price,
                    +quantity,
                    category,
                );

                if (updateBookRes.data) {
                    notification.success({
                        massage: "Update book",
                        description: "Cập nhật book thành công"
                    });

                    setLoadingBookUpdate(false);
                    loadBook();
                    handleCancel();

                }
                else {
                    setLoadingBookUpdate(false);
                    notification.error({
                        massage: "Error update book",
                        description: JSON.stringify(updateBookRes.message)
                    })
                }
            }
        } else {
            const imageName = null;
            setLoadingBookUpdate(true);
            const updateBookRes = await updateBookAPI(
                _id,
                title,
                author,
                +price,
                +quantity,
                category,
                imageName
            );

            if (updateBookRes.data) {
                notification.success({
                    massage: "Update book",
                    description: "Cập nhật book thành công"
                });

                setLoadingBookUpdate(false);
                loadBook();
                handleCancel();

            }
            else {
                setLoadingBookUpdate(false);
                notification.error({
                    massage: "Error update book",
                    description: JSON.stringify(updateBookRes.message)
                })
            }

        }



    };
    const handleCancel = () => {
        form.setFieldsValue({
            title: null,
            author: null,
            price: null,
            quantity: null,
            category: 'Business'
        })
        setFileList([]);
        setIsModalOpen(false);
        setBookUpdateDetail({});
    };



    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '30px'
        }}>
            <div>
                <Modal
                    maskClosable={false}

                    title="Update Book" open={isModalOpen} onOk={() => form.submit()} onCancel={handleCancel}>
                    <Form
                        form={form}
                        okButtonProps={{
                            loading: loadingBookUpdate
                        }}
                        onFinish={handleSubmitForm}
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
                            name="author"
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
                            name="price"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your price!',
                                },
                            ]}
                            label="Price">
                            <Input


                                suffix="đ" />
                        </Form.Item>
                        <Form.Item
                            name="quantity"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your quantity!',
                                },
                            ]}
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

export default BookUpdateUncontrol;