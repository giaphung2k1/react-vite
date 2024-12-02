import { useEffect, useState } from "react";
import { Input, Typography, notification, Modal } from 'antd';
import { updateUserAPI } from "../../services/api.service";

const UpdateUserModal = (props) => {
    const {loadUser} = props;
    const [id, setId] = useState("");
    const [fullName, setFullName] = useState("");

    const [phone, setPhone] = useState("");


    const { setIsModalUpdateOpen, IsModalUpdateOpen, dataUpdate, setDataUpdate } = props;

    
    useEffect(() => {
        if (dataUpdate) {
            setId(dataUpdate._id)
            setFullName(dataUpdate.fullName);
            setPhone(dataUpdate.phone);
        }

    }, [dataUpdate])
    const handlesSubmitBtn = async () => {

        const res = await updateUserAPI(id, fullName, phone);

        if (res.data) {
            notification.success({
                massage: "Update user",
                description: "Cập nhật user thành công"
            })
            resetAndCloseModal();
            await loadUser();
        }
        else {
            notification.error({
                massage: "Error create user",
                description: JSON.stringify(res.message)
            })
        }




    }

    const resetAndCloseModal = () => {
        setIsModalUpdateOpen(false);
        setFullName("");
        setPhone(null);
        setId("");
        setDataUpdate(null);

    }
    return (
        <div>
            <Modal title="Update user"
                open={IsModalUpdateOpen}
                onOk={handlesSubmitBtn}
                onCancel={() => resetAndCloseModal()}
                maskClosable={false}
                okText="UPDATE"
            >
                <div style={{ display: 'flex', gap: '15px', flexDirection: 'column' }}>
                    <div>
                        <Typography.Title level={5}>Id</Typography.Title>
                        <Input
                            value={id}
                            disabled
                        />
                    </div>
                    <div>
                        <Typography.Title level={5}>Fullname</Typography.Title>
                        <Input placeholder="Fullname"
                            value={fullName}
                            onChange={(event) => { setFullName(event.target.value) }}

                        />
                    </div>


                    <div>
                        <Typography.Title level={5}>Phone</Typography.Title>
                        <Input placeholder="Phone"
                            value={phone}
                            onChange={(event) => { setPhone(event.target.value) }}
                        />
                    </div>
                </div>

            </Modal>
        </div>
    )
}
export default UpdateUserModal;