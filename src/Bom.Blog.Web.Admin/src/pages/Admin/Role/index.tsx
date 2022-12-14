import { IdentityRoleDto } from "@abp/ng.identity/proxy";
import { GetPermissionListResultDto, UpdatePermissionDto } from "@abp/ng.permission-management/proxy";
import { useAntdTable, useRequest } from "ahooks";
import { Button, Checkbox, Form, Input, message, Modal, Space, Table } from "antd";
import { useEffect, useState } from "react";
import AdvancedSearchForm from "../../../components/AdvanceSearchForm";
import { useAppConfig, useStores } from "../../../hooks/useStore";
import Permission from "../../../components/Permission";
import styles from "./index.module.less";
function Role() {
  const { useApplicationConfigurationStore } = useAppConfig();
  const { useRoleStore, usePermissionStore } = useStores();
  const getApplicationConfiguration = useApplicationConfigurationStore(state => state.Get)
  const [getRoles, getRoleById, deleteRoleService, updateRole, addRole] = useRoleStore(state => [state.getRoles, state.getRoleById, state.deleteRole, state.updateRole, state.addRole]);
  const [getPermissionByRole, updatePermissionsByRole] = usePermissionStore(state => [state.getPermissionByRole, state.updatePermissionsByRole]);
  const [modalTitle, setModalTitle] = useState("");
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [modalForm] = Form.useForm();
  const [roleName, setRoleName] = useState("");
  const [permissionModalVisible, setPermissionModalVisible] = useState(false);
  const [permissionGroup, setPermissionGroup] = useState<GetPermissionListResultDto>({} as GetPermissionListResultDto);
  const { tableProps, search } = useAntdTable(getRoles, { defaultPageSize: 10, form, debounceWait: 500, });
  const { runAsync } = useRequest(getRoleById, { manual: true, });
  let changedPermession: UpdatePermissionDto[];
  const [permissions, setpermissions] = useState({} as Record<string, boolean>);
  useEffect(() => {
    getApplicationConfiguration().then(config => {
      setpermissions(config.auth.grantedPolicies);
    });
  }, []);
  const deleteRole = (record: IdentityRoleDto) => {
    Modal.confirm({
      title: "????????????", content: "??????????????????",
      onOk: async () => {
        const success = await deleteRoleService(record.id);
        if (success) {
          message.success("????????????");
          search.submit();
        } else {
          message.error("????????????");
        }
      },
      okText: "??????", cancelText: "??????",
    });
  };
  const showModal = () => {
    setModalTitle("??????Role");
    setVisible(true);
  };
  const getRole = async (record: IdentityRoleDto) => {
    try {
      const role = await runAsync(record.id);
      if (role) {
        setModalTitle("??????Role");
        modalForm.setFieldsValue(role);
        setVisible(true);
      }
    } catch (error) {
      //
    }
  };
  const addOrUpdateRole = async (data: any) => {
    try {
      if (data.id) {
        const role = await updateRole(data.id, data);
        if (role) {
          modalForm.resetFields();
          message.success("????????????");
          setVisible(false);
          search.submit();
        }
      } else {
        const role = await addRole(data);
        if (role) {
          modalForm.resetFields();
          message.success("????????????");
          setVisible(false);
          search.submit();
        }
      }
    } catch (error) {
      //
    }
  };

  const showPermissionModal = (name: string) => {
    setRoleName(name);
    getPermissionByRole(name).then((res) => {
      setPermissionGroup(res);
      setPermissionModalVisible(true);
    });

  }
  const onPermissionChange = (checkedValues: UpdatePermissionDto[]) => {
    changedPermession = checkedValues;
  }
  return (
    <div>
      <AdvancedSearchForm form={form} {...search} extraActions={[permissions["AbpIdentity.Roles.Create"] ? { content: "??????", action: showModal } : null]}>
        <Form.Item name="Filter" label="?????????"><Input placeholder="??????????????????" /></Form.Item>
      </AdvancedSearchForm>
      <div className={styles.table}>
        <Table<IdentityRoleDto>
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
          }}>
          <Table.Column<IdentityRoleDto> title="?????????" dataIndex="name" />
          <Table.Column<IdentityRoleDto> title="??????" dataIndex="isDefault" render={(value) => <div>{value === true ? "???" : "???"}</div>} />
          <Table.Column<IdentityRoleDto> title="??????" dataIndex="isPublic" render={(value) => <div>{value === true ? "???" : "???"}</div>} />

          <Table.Column<IdentityRoleDto>
            title="??????"
            render={(recode) => {
              return (
                <Space>
                  {permissions["AbpIdentity.Roles.Update"] && <Button type="primary" onClick={() => getRole(recode)}>??????</Button>}
                  {permissions["AbpIdentity.Roles.ManagePermissions"] && <Button type="primary" onClick={() => showPermissionModal(recode.name)}>??????</Button>}
                  {permissions["AbpIdentity.Roles.Delete"] && <Button type="primary" danger onClick={() => deleteRole(recode)}>??????</Button>}
                </Space>
              );
            }}
          />
        </Table>
      </div>
      <Modal open={visible} title={modalTitle} okText="??????" cancelText="??????" onCancel={() => {
        setVisible(false);
        modalForm.resetFields();
      }}
        onOk={() => {
          modalForm
            .validateFields()
            .then((values) => {
              addOrUpdateRole(values);
            })
            .catch((info) => {
              message.error("????????????");
            });
        }}>
        <Form form={modalForm} name="form_in_modal" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} >
          <Form.Item name="id" label="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="name" label="?????????" rules={[{ required: true, message: "??????????????????" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="isDefault" label="??????" valuePropName="checked">
            <Checkbox />
          </Form.Item>
          <Form.Item name="isPublic" label="??????" valuePropName="checked">
            <Checkbox />
          </Form.Item>
          <Form.Item name="concurrencyStamp" label="concurrencyStamp" hidden>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal open={permissionModalVisible} title="??????" okText="??????" cancelText="??????" onCancel={() => { setPermissionModalVisible(false); }}
        onOk={() => {
          updatePermissionsByRole(roleName, { permissions: changedPermession }).then(() => {
            setPermissionModalVisible(false);
          });
        }}
      >
        <Permission permissionGroup={permissionGroup} onPermissionChanged={onPermissionChange} />
      </Modal>
    </div>
  );
}
export default Role;
