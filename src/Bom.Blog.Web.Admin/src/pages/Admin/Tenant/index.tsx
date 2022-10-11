import { FeatureDto } from "@abp/ng.feature-management/proxy";
import {
    TenantDto,
} from "@abp/ng.tenant-management/proxy/lib";
import { useAntdTable, useBoolean, useDynamicList, useRequest } from "ahooks";
import { Button, Checkbox, Form, Input, message, Modal, Space, Table } from "antd";
import { useEffect, useState } from "react";
import AdvancedSearchForm from "../../../components/AdvanceSearchForm";
import { useAppConfig, useStores } from "../../../hooks/useStore";
import { transformToArray } from "../../../util/formTransform";
import {
    getEmailValidationRule,
    getRequiredRule,
} from "../../../util/formValid";
import styles from "./index.module.less";
function Tenant() {
    const { applicationConfigurationStore } = useAppConfig();
    const { tenantStore } = useStores();
    const [visible, setVisible] = useState(false);
    const [tenantId, setTenantId] = useState<string | null>();
    const [featureModalState, { setTrue: openFeatureModal, setFalse: closeFeatureModal }] = useBoolean(false);
    const [form] = Form.useForm();
    const [featuresForm] = Form.useForm();
    const { list, resetList, merge, getKey } = useDynamicList<FeatureDto>([]);
    const [modalForm] = Form.useForm();
    const [permissions, setpermissions] = useState({} as Record<string, boolean>);
    useEffect(() => {
        applicationConfigurationStore.Get().then((config) => {
            setpermissions(config.auth.grantedPolicies);
        });
    }, []);
    const { tableProps, search } = useAntdTable(tenantStore.getTenants, {
        defaultPageSize: 10,
        form,
        debounceWait: 500,
    });
    const { runAsync } = useRequest(tenantStore.getTenantById, {
        manual: true,
    });
    const deleteTenant = (record: TenantDto) => {
        Modal.confirm({
            title: "删除标签",
            content: "确定删除吗？",
            onOk: async () => {
                const success = await tenantStore.deleteTenant(record.id);
                if (success) {
                    message.success("删除成功");
                    search.submit();
                } else {
                    message.error("删除失败");
                }
            },
            okText: "确定",
            cancelText: "取消",
        });
    };
    const showModal = () => {
        setVisible(true);
    };
    const showFeatureModal = async (id?: string) => {
        openFeatureModal();
        resetList([]);
        let featureList;
        if (id) {
            featureList = await tenantStore.getTenantFeatures(id);
            setTenantId(id);
        }
        else {
            featureList = await tenantStore.getHostFeatures();
        }
        const features = featureList?.groups.flatMap(i => i.features)
        if (features) {
            merge(0, features);
        }
    };
    const getTenant = async (record: TenantDto) => {
        try {
            const tenant = await runAsync(record.id);
            if (tenant) {
                modalForm.setFieldsValue(tenant);
                setVisible(true);
            }
        } catch (error) { }
    };
    const addOrUpdateTag = async (data: any) => {
        console.log("data", data);
        try {
            if (data.id) {
                const tag = await tenantStore.updateTenant(data.id, data);
                if (tag) {
                    modalForm.resetFields();
                    message.success("更新成功");
                    setVisible(false);
                    search.submit();
                }
            } else {
                const tenant = await tenantStore.addTenant(data);
                if (tenant) {
                    modalForm.resetFields();
                    message.success("添加成功");
                    setVisible(false);
                    search.submit();
                }
            }
        } catch (error) { }
    };
    const updateFeatures = async (data: any) => {
        if (tenantId) {
            await tenantStore.updateTenantFeatures(tenantId, { features: transformToArray(data) });
            setTenantId(null);
        }
        else {
            await tenantStore.updateHostFeatures({ features: transformToArray(data) });
        }
        closeFeatureModal();
    }
    return (
        <div>
            <AdvancedSearchForm
                form={form}
                {...search}
                extraActions={
                    [
                        permissions["AbpTenantManagement.Tenants.Create"]
                            ? { content: "添加", action: showModal }
                            : null,
                        permissions["FeatureManagement.ManageHostFeatures"]
                            ? { content: "管理宿主功能", action: showFeatureModal }
                            : null,
                    ]}
            >
                <Form.Item name="Filter" label="租户名">
                    <Input placeholder="请输入租户名" />
                </Form.Item>
            </AdvancedSearchForm>
            <div className={styles.table}>
                <Table<TenantDto>
                    rowKey="id"
                    {...{
                        ...tableProps,
                        pagination: {
                            ...tableProps.pagination,
                            showTotal: (total) => {
                                return <div>总共：{total} 项</div>;
                            },
                            showSizeChanger: true,
                        },
                    }}
                >
                    <Table.Column<TenantDto> title="租户名" dataIndex="name" />
                    <Table.Column<TenantDto>
                        title="操作"
                        render={(recode) => {
                            return (
                                <Space>
                                    {permissions["AbpTenantManagement.Tenants.Update"] && (
                                        <Button type="primary" onClick={() => getTenant(recode)}>
                                            编辑
                                        </Button>
                                    )}
                                    {permissions["AbpTenantManagement.Tenants.Update"] && (
                                        <Button type="primary" onClick={() => showFeatureModal(recode.id)}>
                                            功能
                                        </Button>
                                    )}
                                    {permissions["AbpTenantManagement.Tenants.ManageFeatures"] && (
                                        <Button
                                            type="primary"
                                            danger
                                            onClick={() => deleteTenant(recode)}
                                        >
                                            删除
                                        </Button>
                                    )}
                                </Space>
                            );
                        }}
                    />
                </Table>
            </div>
            <Modal
                open={visible}
                title="添加一个新标签"
                okText="确定"
                cancelText="取消"
                onCancel={() => {
                    setVisible(false);
                    modalForm.resetFields();
                }}
                onOk={() => {
                    modalForm
                        .validateFields()
                        .then((values) => {
                            addOrUpdateTag(values);
                        })
                        .catch((info) => {
                            message.error("添加失败");
                        });
                }}
            >
                <Form
                    form={modalForm}
                    name="form_in_modal"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                >
                    <Form.Item name="id" label="id" hidden>
                        <Input />
                    </Form.Item>
                    <Form.Item name="name" label="租户名" rules={[getRequiredRule("名字")]}>
                        <Input />
                    </Form.Item>
                    {!modalForm.getFieldValue("id") && (
                        <>
                            <Form.Item
                                name="adminEmailAddress"
                                label="管理员邮件地址"
                                rules={[
                                    getRequiredRule("管理员邮件地址"),
                                    getEmailValidationRule(),
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="adminPassword"
                                label="管理员密码"
                                rules={[getRequiredRule("管理员密码")]}
                            >
                                <Input.Password />
                            </Form.Item>
                        </>
                    )}
                </Form>
            </Modal>
            <Modal
                open={featureModalState}
                title="设置管理"
                okText="确定"
                cancelText="取消"
                onCancel={() => {
                    closeFeatureModal();
                }}
                onOk={() => {
                    featuresForm
                        .validateFields()
                        .then((values) => {
                            updateFeatures(values);
                        })
                        .catch(() => {
                            message.error("添加失败");
                        });
                }}
            >
                <Form form={featuresForm}>
                    {list.map((i, index) => {
                        return <Form.Item name={[i.name!, getKey(index)]} key={i.name} label={i.displayName} valuePropName="checked" initialValue={i.value === "true" ? true : false
                        }>
                            <Checkbox />
                        </Form.Item>
                    })}
                </Form>
            </Modal>
        </div>
    );
}

export default Tenant;
