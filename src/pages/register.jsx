import { Button, Col, Form, Input, notification, Row } from "antd";
import { registerAPI } from "../services/api.service";
import { useNavigate } from "react-router-dom";
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
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            style={
                {
                    margin: '50px'
                }
            }
        >
            <h1>Register</h1>

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

                <Form.Item label={null}>
                    <Button
                        onClick={() => form.submit()}
                        type="primary" htmlType="submit">
                        Submit
                    </Button>

                </Form.Item>
            </Row>



        </Form>
    );
}

export default RegisterPage;