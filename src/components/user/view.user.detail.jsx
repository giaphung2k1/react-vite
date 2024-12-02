import { Button, Drawer, notification } from "antd";
import { useState } from "react";
import { updateUserAvatarAPI, uploadImage } from "../../services/api.service";

const ViewUserDetail = (props) => {

    const { setOpen, open, dataUserDetail, setDataUserDetail,loadUser } = props;
    const [file, setSelectedFile] = useState(null);


    const preViewImage = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        setSelectedFile(event.target.files[0]);

    }

    const handleSaveImage = async () => {
        const resUploadImage = await uploadImage(file,'avatar');
        
        if(resUploadImage.data){
            
            notification.success({
                massage: "Upload image",
                description: "Upload ảnh thành công"
            })

            const newAvatar = resUploadImage.data.fileUploaded;

            const resUpdateUserAvatarAPI = await updateUserAvatarAPI(dataUserDetail._id,dataUserDetail.fullName,dataUserDetail.phone,newAvatar);

            if(resUpdateUserAvatarAPI.data){
                setOpen(false)
                setSelectedFile(null);
                setDataUserDetail(null);
                await loadUser();
                notification.success({
                    massage: "Update user avatar",
                    description: "Cập nhật avatar thành công"
                })

                console.log(">>>>resUpdateUserAvatarAPI",resUpdateUserAvatarAPI);
                
            }
            else{
                notification.error({
                    massage: "Error update avatar",
                    description: JSON.stringify(resUpdateUserAvatarAPI.message)
                })
            }
            
           
           
        }else{
            notification.error({
                massage: "Error upload image",
                description: JSON.stringify(resUploadImage.message)
            })
            
        }
        
    }

    return (
        <div>
            <Drawer
                title="Chi tiết User"
                width={"40vw"}
                onClose={() => {
                    setDataUserDetail(null)
                    setOpen(false)
                }}
                open={open}>
                {dataUserDetail ?
                    <>
                        <p>Id: {dataUserDetail._id}</p>
                        <p>Full name: {dataUserDetail.fullName}</p>
                        <p>Email: {dataUserDetail.email}</p>
                        <p>Phone: {dataUserDetail.phone}</p>
                        <div style={{
                            marginTop: "10px",
                            height: '100px', width: '150px',
                            border: '1px solid #ccc'
                        }}>
                            <img
                                height={100}
                                width={150}
                                src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataUserDetail.avatar}`} alt="" />
                        </div>


                        <label
                            htmlFor="btnUpload"
                            style={{
                                display: "block",
                                width: "fit-content",
                                marginTop: "15px",
                                padding: "5px 10px",
                                background: "orange",
                                borderRadius: "5px",
                                cursor: "pointer"
                            }}
                        >Upload avatar</label>
                        <input type="file"
                            onChange={(event) => preViewImage(event)}
                            name="avatar"
                            hidden id="btnUpload" />

                        {file &&
                        <div>
                            <div style={{
                                marginTop: "10px",
                                height: '100px', width: '150px',
                                border: '1px solid #ccc'
                            }}>
                                <img
                                    height={100}
                                    width={150}
                                    src={URL.createObjectURL(file)} alt="" />
                            </div>
                            <Button  
                            onClick={handleSaveImage}
                            style={{marginTop:'20px'}} 
                            type="primary">Save</Button>
                        </div>
                            
                        }
                       

                    </>
                    :
                    <>
                        <p>Không có dữ liệu</p>
                    </>

                }
            </Drawer>
        </div>
    )
}

export default ViewUserDetail;

