import { Button, Form, Input, message, Space, Switch, Tabs } from "antd";
import { toJS } from "mobx";
import { useEffect, useState } from "react";
import Editor from "../../../components/Editor";
import { TestEmailDto, UpdateEmailSetttingDto } from "../../../data/models/Abp/Email";
import { useAppConfig, useStores } from "../../../hooks/useStore";
import { getEmailValidationRule, getPhoneValidationRule, getRequiredRule } from "../../../util/formValid";

function EmailSetting() {
    const [emailSettingform] = Form.useForm();
    const [sendEmailform] = Form.useForm();
    const { applicationConfigurationStore, emailSettingStore } = useAppConfig();
    const [email, setEmail] = useState("");
    const [permissions, setPermissions] = useState({} as Record<string, boolean>)
    useEffect(() => {
        applicationConfigurationStore.Get().then(config => {
            const permission = toJS(config.auth.grantedPolicies);
            setPermissions(permission);
        });
        emailSettingStore.getEmailSetting().then(setting => {
            emailSettingform.setFieldsValue(setting);
            setEmail(setting.defaultFromAddress);
        });
    }, []);
    const sendTestEmail = async (values: TestEmailDto) => {
        await emailSettingStore.sendTestEmail({ ...values, senderEmailAddress: email });
        message.success("发送成功");
    }
    const updateEmailSetting = async (values: UpdateEmailSetttingDto) => {
        await emailSettingStore.updateEmailSetting(values);
        setEmail(values.defaultFromAddress);
        message.success("更新成功");
    }

    return (
        <div>
            <Tabs defaultActiveKey="1" tabPosition="top" >
                <Tabs.TabPane tab="邮件设置" key="1">
                    <Form name="form_in_modal" form={emailSettingform} labelCol={{ span: 2 }} wrapperCol={{ span: 10 }} onFinish={updateEmailSetting} >
                        <Form.Item name="smtpHost" label="smtp主机" >
                            <Input />
                        </Form.Item>
                        <Form.Item name="smtpPort" label="smtp端口" >
                            <Input />
                        </Form.Item>
                        <Form.Item name="smtpUserName" label="smtp用户名" >
                            <Input />
                        </Form.Item>
                        <Form.Item name="smtpPassword" label="smtp密码" >
                            <Input />
                        </Form.Item>
                        <Form.Item name="smtpDomain" label="smtp域">
                            <Input />
                        </Form.Item>
                        <Form.Item name="defaultFromAddress" label="默认发送地址" rules={[getEmailValidationRule()]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="defaultFromDisplayName" label="默认发送地址展示名">
                            <Input />
                        </Form.Item>
                        <Form.Item name="smtpEnableSsl" label="启用Ssl" >
                            <Switch />
                        </Form.Item>
                        <Form.Item name="smtpUseDefaultCredentials" label="使用默认凭证" >
                            <Switch />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 10, span: 16 }} style={{ marginBottom: "0px" }}>
                            <Space>
                                <Button type="primary" htmlType="submit">提交</Button>
                                <Button type="primary" >取消</Button>
                            </Space>
                        </Form.Item>

                    </Form>
                </Tabs.TabPane>
                {permissions["SettingManagement.Emailing.Test"] &&
                    <Tabs.TabPane tab="发送测试邮件" key="2">
                        <Form name="form_in_modal" form={sendEmailform} labelCol={{ span: 2 }} wrapperCol={{ span: 20 }} onFinish={sendTestEmail}>
                            <Form.Item name="targetEmailAddress" label="接收者邮箱" rules={[getRequiredRule("接收者邮箱"), getEmailValidationRule()]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="subject" label="主题" rules={[getRequiredRule("主题")]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="body" label="内容" rules={[getRequiredRule("内容")]} >
                                <Editor placeholder="请输入一些内容" />
                            </Form.Item>
                            <Form.Item wrapperCol={{ offset: 10, span: 16 }} style={{ marginBottom: "100px" }}>
                                <Space>
                                    <Button type="primary" htmlType="submit">提交</Button>
                                    <Button type="primary" >取消</Button>
                                </Space>
                            </Form.Item>
                        </Form>
                    </Tabs.TabPane>
                }

            </Tabs>
        </div >
    );
}

export default EmailSetting;