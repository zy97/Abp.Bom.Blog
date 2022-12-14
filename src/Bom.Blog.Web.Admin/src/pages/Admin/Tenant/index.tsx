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
    const { useApplicationConfigurationStore } = useAppConfig();
    const getAppConfig = useApplicationConfigurationStore(state => state.Get)
    const { useTenantsStore } = useStores();
    const [getTenants, getTenantById, deleteTenantSvc, getHostFeatures, getTenantFeatures, updateTenant, updateHostFeatures, updateTenantFeatures, addTenant] = useTenantsStore(state => [state.getTenants, state.getTenantById, state.deleteTenant, state.getHostFeatures, state.getTenantFeatures, state.updateTenant, state.updateHostFeatures, state.updateTenantFeatures, state.addTenant])
    const [visible, setVisible] = useState(false);
    const [tenantId, setTenantId] = useState<string | null>();
    const [featureModalState, { setTrue: openFeatureModal, setFalse: closeFeatureModal }] = useBoolean(false);
    const [form] = Form.useForm();
    const [featuresForm] = Form.useForm();
    const { list, resetList, merge, getKey } = useDynamicList<FeatureDto>([]);
    const [modalForm] = Form.useForm();
    const [permissions, setpermissions] = useState({} as Record<string, boolean>);
    useEffect(() => {
        getAppConfig().then((config) => {
            setpermissions(config.auth.grantedPolicies);
        });
    }, []);
    const { tableProps, search } = useAntdTable(getTenants, {
        defaultPageSize: 10,
        form,
        debounceWait: 500,
    });
    const { runAsync } = useRequest(getTenantById, {
        manual: true,
    });
    const deleteTenant = (record: TenantDto) => {
        Modal.confirm({
            title: "????????????",
            content: "??????????????????",
            onOk: async () => {
                const success = await deleteTenantSvc(record.id);
                if (success) {
                    message.success("????????????");
                    search.submit();
                } else {
                    message.error("????????????");
                }
            },
            okText: "??????",
            cancelText: "??????",
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
            featureList = await getTenantFeatures(id);
            setTenantId(id);
        }
        else {
            featureList = await getHostFeatures();
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
        } catch (error) { message.error((error as Error).message) }
    };
    const addOrUpdateTag = async (data: any) => {
        console.log("data", data);
        try {
            if (data.id) {
                const tag = await updateTenant(data.id, data);
                if (tag) {
                    modalForm.resetFields();
                    message.success("????????????");
                    setVisible(false);
                    search.submit();
                }
            } else {
                const tenant = await addTenant(data);
                if (tenant) {
                    modalForm.resetFields();
                    message.success("????????????");
                    setVisible(false);
                    search.submit();
                }
            }
        } catch (error) { message.error((error as Error).message) }
    };
    const updateFeatures = async (data: any) => {
        if (tenantId) {
            await updateTenantFeatures(tenantId, { features: transformToArray(data) });
            setTenantId(null);
        }
        else {
            await updateHostFeatures({ features: transformToArray(data) });
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
                            ? { content: "??????", action: showModal }
                            : null,
                        permissions["FeatureManagement.ManageHostFeatures"]
                            ? { content: "??????????????????", action: showFeatureModal }
                            : null,
                    ]}
            >
                <Form.Item name="Filter" label="?????????">
                    <Input placeholder="??????????????????" />
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
                                return <div>?????????{total} ???</div>;
                            },
                            showSizeChanger: true,
                        },
                    }}
                >
                    <Table.Column<TenantDto> title="?????????" dataIndex="name" />
                    <Table.Column<TenantDto>
                        title="??????"
                        render={(recode) => {
                            return (
                                <Space>
                                    {permissions["AbpTenantManagement.Tenants.Update"] && (
                                        <Button type="primary" onClick={() => getTenant(recode)}>
                                            ??????
                                        </Button>
                                    )}
                                    {permissions["AbpTenantManagement.Tenants.Update"] && (
                                        <Button type="primary" onClick={() => showFeatureModal(recode.id)}>
                                            ??????
                                        </Button>
                                    )}
                                    {permissions["AbpTenantManagement.Tenants.ManageFeatures"] && (
                                        <Button
                                            type="primary"
                                            danger
                                            onClick={() => deleteTenant(recode)}
                                        >
                                            ??????
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
                title="?????????????????????"
                okText="??????"
                cancelText="??????"
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
                            message.error("????????????");
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
                    <Form.Item name="name" label="?????????" rules={[getRequiredRule("??????")]}>
                        <Input />
                    </Form.Item>
                    {!modalForm.getFieldValue("id") && (
                        <>
                            <Form.Item
                                name="adminEmailAddress"
                                label="?????????????????????"
                                rules={[
                                    getRequiredRule("?????????????????????"),
                                    getEmailValidationRule(),
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="adminPassword"
                                label="???????????????"
                                rules={[getRequiredRule("???????????????")]}
                            >
                                <Input.Password />
                            </Form.Item>
                        </>
                    )}
                </Form>
            </Modal>
            <Modal
                open={featureModalState}
                title="????????????"
                okText="??????"
                cancelText="??????"
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
                            message.error("????????????");
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
