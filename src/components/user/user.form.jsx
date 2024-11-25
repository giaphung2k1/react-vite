import { Input, Typography, Button, notification, Modal } from 'antd';
import './user.form.css'
import { useState } from 'react';
import { createUserAPI } from '../../services/api.service';

const UserForm = (props) => {

    const {loadUser} = props;
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };



    const handlesSubmitBtn = async () => {

        const res = await createUserAPI(fullName, email, password, phone);

        if (res.data) {
            notification.success({
                massage: "Create user",
                description: "Tạo user thành công"
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
        setIsModalOpen(false);
        setFullName(null);
        setEmail(null);
        setPassword(null);
        setPhone(null);
        
    }

    return (
        <div className='user-form'>


            <Modal title="Add user"
                open={isModalOpen}
                onOk={handlesSubmitBtn}
                onCancel={() => resetAndCloseModal()}
                maskClosable={false}
                okText="CREATE"
            >
                <div style={{display:'flex',gap:'15px',flexDirection:'column'}}>
                    <div>
                        <Typography.Title level={5}>Fullname</Typography.Title>
                        <Input placeholder="Fullname"
                            value={fullName}
                            onChange={(event) => { setFullName(event.target.value) }}

                        />
                    </div>
                    <div>
                        <Typography.Title level={5}>Email</Typography.Title>
                        <Input placeholder="Email"
                            value={email}
                            onChange={(event) => { setEmail(event.target.value) }}
                        />
                    </div>
                    <div>
                        <Typography.Title level={5}>Password</Typography.Title>
                        <Input.Password placeholder="input password"
                            value={password}
                            onChange={(event) => { setPassword(event.target.value) }}
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



            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3>Table Users</h3>
                <Button
                    onClick={showModal}
                    type='primary'
                >Create User</Button>
            </div>


        </div>
    )
}
export default UserForm;