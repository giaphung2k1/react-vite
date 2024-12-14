import { PlusOutlined } from "@ant-design/icons";
import {  Form, Image, Input, Modal, notification, Select, Upload } from "antd";
import { useEffect, useState } from "react";
import {  updateBookAPI, uploadImage } from "../../services/api.service";

const BookUpdateControl = (props) => {
    const { isModalOpen, setIsModalOpen, bookUpdateDetail, setBookUpdateDetail, loadBook } = props;
    const [previewImage, setPreviewImage] = useState('');
    const [previewOpen, setPreviewOpen] = useState(false);

    const [title, setTitle] = useState(null);
    const [_id, setId] = useState(null);
    const [author, setAuthor] = useState(null);
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [category, setCategory] = useState('Business');
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        if (bookUpdateDetail._id) {
            setId(bookUpdateDetail._id)
            setTitle(bookUpdateDetail.mainText)
            setAuthor(bookUpdateDetail.author)
            setPrice(bookUpdateDetail.price)
            setQuantity(bookUpdateDetail.quantity)
            setCategory(bookUpdateDetail.category)
            if(bookUpdateDetail.thumbnail){
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



    const handleOk = async () => {

        console.log(">>>fileList", fileList);
        if (fileList.length > 0) {
            if (fileList[0].name) {
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
                        loadBook();
                        handleCancel();

                    }
                    else {
                        notification.error({
                            massage: "Error update book",
                            description: JSON.stringify(updateBookRes.message)
                        })
                    }



                }
            }
            else {

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


                    loadBook();
                    handleCancel();

                }
                else {
                    notification.error({
                        massage: "Error update book",
                        description: JSON.stringify(updateBookRes.message)
                    })
                }
            }
        } else {
            const imageName= null;
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


                loadBook();
                handleCancel();

            }
            else {
                notification.error({
                    massage: "Error update book",
                    description: JSON.stringify(updateBookRes.message)
                })
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
        setBookUpdateDetail({});
    };


    console.log(">>>bookUpdateDetail", bookUpdateDetail);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '30px'
        }}>
            <div>
                <Modal
                    maskClosable={false}
                    title="Update Book" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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

export default BookUpdateControl;