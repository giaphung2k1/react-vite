import { Drawer } from "antd";

const ViewUserDetail = (props) => {

    const { setOpen, open, dataUserDetail, setDataUserDetail } = props;

    console.log(dataUserDetail);

    return (
        <div>
            <Drawer title="Basic Drawer" onClose={() => {
                setDataUserDetail(null)
                setOpen(false)
            }}
                open={open}>
                {dataUserDetail ?
                    <>
                        <p>{dataUserDetail._id}</p>
                        <p>{dataUserDetail.fullName}</p>
                        <p>{dataUserDetail.phone}</p>
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

