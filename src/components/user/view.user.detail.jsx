import { Drawer } from "antd";
import { useState } from "react";

const ViewUserDetail = (props) => {

    const { setOpen, open, dataUserDetail, setDataUserDetail } = props;
    const [file, setSelectedFile] = useState(null);


    const preViewImage = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        setSelectedFile(URL.createObjectURL(event.target.files[0]));

    }

    console.log(">>>>file", file);


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
                            <div style={{
                                marginTop: "10px",
                                height: '100px', width: '150px',
                                border: '1px solid #ccc'
                            }}>
                                <img
                                    height={100}
                                    width={150}
                                    src={file} alt="" />
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

