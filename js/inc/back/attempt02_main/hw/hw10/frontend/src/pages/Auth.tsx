import { Button, Checkbox, Flex, Form, Input } from "antd";
import type { FormProps } from "antd";

type FieldType = {
  login?: string;
  password?: string;
  remember?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const boxStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
};

const Auth = () => {
  return (
    <Flex style={boxStyle} justify={"center"} align={"center"}>
      <Form
        name="auth"
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 9 }}
        style={{ flex: '1 0 auto' }}  
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
      >
        <Form.Item<FieldType>
          label="Логин"
          name="login"
          rules={[{ required: true, message: "Введите логин" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Пароль"
          name="password"
          rules={[{ required: true, message: "Введите пароль" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          label={null}
        >
          <Checkbox>Запомнить меня</Checkbox>
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default Auth;
