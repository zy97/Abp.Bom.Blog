import { Form, Checkbox as AntdCheckbox } from "antd";
type CheckboxProps = {
    name: string
    label: string
}
function Checkbox(props: CheckboxProps) {
    const { name, label } = props;
    return (
        <Form.Item name={name} label={label} valuePropName="checked" >
            <AntdCheckbox />
        </Form.Item>
    );
}

export default Checkbox;