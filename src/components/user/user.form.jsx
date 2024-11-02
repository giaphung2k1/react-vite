import { Input, Typography, Button } from 'antd';
import './user.form.css'
import { useState } from 'react';
const UserForm = () => {
    const [fullName,setFullName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [phone,setPhone] = useState("");
    // const a = "hungdz"
    
    const  handleClickBtn = () => {
          console.log(">>>> check input",{fullName,email,password,phone});

        
    }
    
    return (
        <div className='user-form'>
            <div>
                <Typography.Title level={5}>Fullname</Typography.Title>
                <Input placeholder="Fullname"
                onChange={(event) => {setFullName(event.target.value)}}
                
                />
            </div>
            <div>
                <Typography.Title level={5}>Email</Typography.Title>
                <Input placeholder="Email" 
                 onChange={(event) => {setEmail(event.target.value)}}
                />
            </div>
            <div>
                <Typography.Title level={5}>Password</Typography.Title>
                <Input.Password placeholder="input password" 
                onChange={(event) => {setPassword(event.target.value)}}
                />
            </div>
            <div>
                <Typography.Title level={5}>Phone</Typography.Title>
                <Input placeholder="Phone" 
                onChange={(event) => {setPhone(event.target.value)}}
                />
            </div>
    
            <div>
                <Button type="primary"
                onClick={handleClickBtn}
                >Submit</Button>
            </div>


        </div>
    )
}
export default UserForm;