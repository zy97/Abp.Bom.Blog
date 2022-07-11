import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { FormProvider } from 'rc-field-form';
import React, { useState } from 'react';

const { Option } = Select;

const AdvancedSearchForm = (props: any) => {
    const { defaultMaxShowCount, children, form, submit, reset, extraActions } =
        props;
    const formCount = props.children.length;
    const [expand, setExpand] = useState(false);

    const getFields = () => {
        const count = formCount <= 6 ? formCount : expand ? formCount : 6;
        const children = [];
        for (let i = 0; i < count; i++) {
            children.push(
                <Col span={8} key={i}>
                    {/* <Form.Item
                        name={`field-${i}`}
                        label={`Field ${i}`}
                        rules={[
                            {
                                required: true,
                                message: 'Input something!',
                            },
                        ]}
                    >
                        {i % 3 !== 1 ? (
                            <Input placeholder="placeholder" />
                        ) : (
                            <Select defaultValue="2">
                                <Option value="1">1</Option>
                                <Option value="2">
                                    longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglong
                                </Option>
                            </Select>
                        )}
                    </Form.Item> */}
                    {props.children[i]}
                </Col>
            );
        }
        return children;
    };

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    return (
        <Form form={form} name="advanced_search" onFinish={onFinish}>
            <Row gutter={24}>{getFields()}</Row>
            <Row>
                <Col span={24} className="space-x-4 text-right">
                    {extraActions.map((i: any) => {
                        return (
                            <Button type="primary" onClick={i.action}>
                                {i.content}
                            </Button>
                        );
                    })}
                    <Button type="primary" htmlType="submit" onClick={submit}>
                        搜索
                    </Button>
                    <Button onClick={reset}>重置</Button>
                    {formCount >= 6 && (
                        <a
                            style={{ fontSize: 12 }}
                            onClick={() => {
                                setExpand(!expand);
                            }}
                        >
                            {expand ? <UpOutlined /> : <DownOutlined />} 折叠
                        </a>
                    )}
                </Col>
            </Row>
        </Form>
    );
};
export default AdvancedSearchForm;
