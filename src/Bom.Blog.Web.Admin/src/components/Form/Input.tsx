import { Form, Input as AntdInput } from "antd";
import { Rule } from "antd/es/form";
import { NamePath } from "antd/es/form/interface";
type InputProps = {
    name: string
    label: string
    rules?: Rule[]
    dependencies?: NamePath[]
    isPassword?: boolean
}
function Input(props: InputProps) {
    const { name, label, rules, dependencies, isPassword } = props;
    return (
        <>
            <Form.Item name={name} label={label} rules={rules} dependencies={dependencies}>
                {isPassword === true ? <AntdInput.Password /> : <AntdInput />}
            </Form.Item>
        </>

    );
}

export default Input;