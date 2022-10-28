import { Button, Checkbox, Col, Form, InputNumber, message, Row, Space } from "antd";
import { diff } from "just-diff";
import { keys, set } from "mobx";
import { useEffect, useState } from "react";
import { upperCaseFirst } from "upper-case-first";
import { SettingDto } from "../../../data/models/abp/settingDto";
import { useAppConfig, useStores } from "../../../hooks/useStore";
import { transformToZH } from "../../../util/formTransform";

function SystemSetting() {
    const [settingform] = Form.useForm();
    const { applicationConfigurationStore } = useAppConfig();
    const { settingStore } = useStores();
    const [setting, setSetting] = useState<Record<string, string>>({})
    useEffect(() => {
        settingform.setFieldsValue(setting);
    }, [setting]);
    useEffect(() => {
        applicationConfigurationStore.Get().then((config) => {
            setSetting(config.setting.values);
        });
    }, []);
    const createFormItems = () => {
        const kv = setting;
        delete kv["Abp.Timing.TimeZone"];
        delete kv["Abp.Localization.DefaultLanguage"];
        const items = Object.keys(kv).map((key) => {
            if (kv[key] === "True" || kv[key] === "False") {
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
        for (const key of Object.keys(values)) {
            values[key] = upperCaseFirst(values[key].toString());
        }
        const sd = diff(setting, values);
        console.log(sd);
        sd.forEach(async item => {
            const key = item.path[0] as string;
            const value = item.value;
            await settingStore.changeSetting({ key, value });
        });
        message.success("更新成功");
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