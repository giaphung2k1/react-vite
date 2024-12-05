
import { Button, Checkbox, Col, Flex, Form, Input, notification, Row } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { loginAPI } from '../services/api.service';
import { useState } from 'react';

const LoginPage = () => {
    const navigate = useNavigate();
    const [isLoading,setIsLoading] = useState(false);
    const onFinish = async (values) => {
        setIsLoading(true)
        const {email, password} = values;
        const res = await loginAPI(email,password);
        if(res && res.data){
            notification.success({
                massage: "Login Successfully",
                description: "Login thành công"
            })
            navigate('/')
        }else{
            notification.error({
                massage: "Login error",
                description: JSON.stringify(res.message)
            })
        }

        
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (

        <Form
            name="basic"
            layout='vertical'
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            style={{
                marginTop: '50px'
            }}

        >
            <Row justify='center'>
                <h1>Login</h1>
            </Row>
            <Row justify='center'>
                <Col xs={6} md={6}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please input your email!"
                            },
                            {
                                type: "email",
                                message: "The input is not valid E-mail!"
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify='center'>
                <Col xs={6} md={6}>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify='center'>
                <Col xs={6} md={6}>
                    <Form.Item>
                        <Flex justify="space-between" align="center">
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                            <Link to="/">Go to home page</Link>
                        </Flex>
                    </Form.Item>
                </Col>
            </Row>
            <Row justify='center'>
                <Col xs={6} md={6}>
                    <Form.Item>
                        <Button 
                        loading={isLoading}
                        block type="primary" htmlType="submit">
                            Log in
                        </Button>
                        or <Link to="/register">Register now!</Link>
                    </Form.Item>
                </Col>
            </Row>


        </Form>
    );
}

export default LoginPage;