import { Button, Drawer } from "antd";

const ViewUserDetail = (props) => {

    const { setOpen, open, dataUserDetail, setDataUserDetail } = props;


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
                        <div>
                            <img 
                            height={100}
                            width={150}
                            src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataUserDetail.avatar}`} alt="" />
                        </div>
                        

                        <label 
                        htmlFor="btnUpload"
                        style={{
                            display:"block",
                            width:"fit-content",
                            marginTop:"15px",
                            padding:"5px 10px",
                            background:"orange",
                            borderRadius:"5px",
                            cursor:"pointer"
                        }}
                        >Upload avatar</label>
                        <input type="file" hidden id="btnUpload"/>
                   
                        
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

