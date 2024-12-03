import { Button, Checkbox, Form, Input, Typography } from "antd";

const RegisterPage = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
      const [form] = Form.useForm();
    return (
        
        <Form
            name="basic" 
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            style={
                {
                    margin:'50px'
                }
            }
        >
            <h1>Register</h1>
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
            </Form.Item>
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

            <Form.Item
                label="Phone"
                name="phone"
                rules={[
                    {
                        required: true,
                        message: 'Please input your phone!',
                    },
                ]}
            >
                <Input />
            </Form.Item>


            <Form.Item label={null}>
                <Button 
                onClick={() => form.submit()}
                type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>

    );
}

export default RegisterPage;