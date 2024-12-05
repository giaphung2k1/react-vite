import { Button, Col, Flex, Form, Input, notification, Row } from "antd";
import { registerAPI } from "../services/api.service";
import { Link, useNavigate } from "react-router-dom";
const RegisterPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const onFinish = async (values) => {


        const { fullName, email, password, phone } = values;
        const res = await registerAPI(fullName, email, password, phone);

        if (res && res.data) {
            notification.success({
                massage: "Register user",
                description: "Register thành công"
            })
            navigate('/login')

        }
        else {
            notification.error({
                massage: "Register user error",
                description: JSON.stringify(res.message)
            })
        }


    };
    const onFinishFailed = (errorInfo) => {
        console.log(324432);
        console.log('Failed:', errorInfo);
    };



    return (

        <Form
            name="basic"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            style={
                {
                    margin: '50px'
                }
            }
        >
            <Row justify='center'>
                <h1>Register</h1>
            </Row>

            <Row justify={"center"}>

                <Col sm={24} md={6}>
                    <Form.Item
                        label="Full Name"
                        name="fullName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your fullName!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item></Col>
            </Row>
            <Row justify={"center"}>
                <Col sm={24} md={6}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col sm={24} md={6}>
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
            <Row justify={"center"}>
                <Col sm={24} md={6}>
                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                pattern: new RegExp(/\d+/g),
                                message: "Wrong format!"
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Row justify={"center"}>
                <Col md={6}>
                <Form.Item label={null}>
                    
                    <Flex justify="space-between">
                    <Button
                        onClick={() => form.submit()}
                        type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Link to='/login'>Login</Link>
                        </Flex>
                    
                </Form.Item>
                </Col>
            </Row>

        </Form>
    );
}

export default RegisterPage;