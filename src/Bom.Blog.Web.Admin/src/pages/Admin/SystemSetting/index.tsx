import { Button, Checkbox, Col, Form, InputNumber, message, Row, Space } from "antd";
import { diff } from "just-diff";
import { useEffect, useState } from "react";
import { upperCaseFirst } from "upper-case-first";
import { useAppConfig, useStores } from "../../../hooks/useStore";
import { transformToZH } from "../../../util/formTransform";

function SystemSetting() {
    const [settingform] = Form.useForm();
    const { applicationConfigurationStore } = useAppConfig();
    const { settingStore } = useStores();
    const [setting, setSetting] = useState<Record<string, string | boolean>>({})
    useEffect(() => {
        settingform.setFieldsValue(setting);
    }, [setting]);
    useEffect(() => {
        applicationConfigurationStore.Get().then((config) => {
            const temp = config.setting.values;
            console.log(temp);
            const kv = temp as Record<string, string | boolean>;
            Object.keys(temp).forEach((key) => {
                console.log(temp[key] + " " + typeof temp[key]);
                const value = upperCaseFirst(temp[key]);
                if (value === "True") {
                    kv[key] = true;
                }
                if (value === "False") {
                    kv[key] = false;
                }
            });
            setSetting(kv);
        });
    }, []);
    const createFormItems = () => {
        const kv = setting;
        delete kv["Abp.Timing.TimeZone"];
        delete kv["Abp.Localization.DefaultLanguage"];
        const items = Object.keys(kv).map((key) => {
            console.log(typeof kv[key]);
            if (typeof kv[key] === "boolean") {
                return (
                    <Col span={12}>
                        <Form.Item name={key} label={transformToZH(key)} valuePropName='checked' key={key}>
                            <Checkbox />
                        </Form.Item>
                    </Col>

                )
            }
            if (!isNaN(+kv[key])) {
                return (
                    <Col span={12}>
                        <Form.Item name={key} label={transformToZH(key)} key={key}>
                            <InputNumber style={{ width: '80%' }} />
                        </Form.Item>
                    </Col>
                )
            }
        });
        return items;
    }
    const updateEmailSetting = async (values: any) => {
        const changes = diff(setting, values);
        if (changes.length === 0) {
            return;
        }
        try {
            changes.forEach(async item => {
                const key = item.path[0] as string;
                const value = upperCaseFirst(item.value.toString());
                await settingStore.changeSetting({ key, value });
                message.success(`${transformToZH(key)}更新成功`);
            });
            setSetting(values);
        }
        catch (e) { }
    }

    return (<div>
        <Form name="form_in_modal" form={settingform} onFinish={updateEmailSetting} labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}>
            <Row gutter={24}> {createFormItems()}</Row>

            <Form.Item wrapperCol={{ offset: 10, span: 16 }} style={{ marginBottom: "0px" }}>
                <Space>
                    <Button type="primary" htmlType="submit">提交</Button>
                    <Button type="primary" >取消</Button>
                </Space>
            </Form.Item>

        </Form>
    </div>);
}

export default SystemSetting;