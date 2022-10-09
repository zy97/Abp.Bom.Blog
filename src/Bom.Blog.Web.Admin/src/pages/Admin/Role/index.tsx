import { IdentityRoleDto } from "@abp/ng.identity/proxy";
import { useAntdTable, useRequest } from "ahooks";
import { Button, Checkbox, Form, Input, message, Modal, Space, Table } from "antd";
import { useEffect, useState } from "react";
import AdvancedSearchForm from "../../../components/AdvanceSearchForm";
import { PermissionGroup, UpdatePermissionListItemDto } from "../../../data/models/system/Permission";
import { useAppConfig, useStores } from "../../../hooks/useStore";
import Permission from "../../Components/Permission";
import styles from "./index.module.less";
function Role() {
  const { applicationConfigurationStore } = useAppConfig();
  const { roleStore, permissionStore } = useStores();
  const [modalTitle, setModalTitle] = useState("");
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [modalForm] = Form.useForm();
  const [roleName, setRoleName] = useState("");
  const [permissionModalVisible, setPermissionModalVisible] = useState(false);
  const [permissionGroup, setPermissionGroup] = useState<PermissionGroup>({} as PermissionGroup);
  const { tableProps, search } = useAntdTable(roleStore.getRoles, { defaultPageSize: 10, form, debounceWait: 500, });
  const { runAsync } = useRequest(roleStore.getRoleById, { manual: true, });
  let changedPermession: UpdatePermissionListItemDto[];
  const [permissions, setpermissions] = useState({} as Record<string, boolean>);
  useEffect(() => {
    applicationConfigurationStore.Get().then(config => {
      setpermissions(config.auth.grantedPolicies);
    });
  }, []);
  const deleteRole = (record: IdentityRoleDto) => {
    Modal.confirm({
      title: "删除标签", content: "确定删除吗？",
      onOk: async () => {
        const success = await roleStore.deleteRole(record.id);
        if (success) {
          message.success("删除成功");
          search.submit();
        } else {
          message.error("删除失败");
        }
      },
      okText: "确定", cancelText: "取消",
    });
  };
  const showModal = () => {
    setModalTitle("添加Role");
    setVisible(true);
  };
  const getRole = async (record: IdentityRoleDto) => {
    try {
      const role = await runAsync(record.id);
      if (role) {
        setModalTitle("编辑Role");
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
        const role = await roleStore.updateRole(data.id, data);
        if (role) {
          modalForm.resetFields();
          message.success("更新成功");
          setVisible(false);
          search.submit();
        }
      } else {
        const role = await roleStore.addRole(data);
        if (role) {
          modalForm.resetFields();
          message.success("添加成功");
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
    permissionStore.getPermissionByRole(name).then((res) => {
      setPermissionGroup(res);
      setPermissionModalVisible(true);
    });

  }
  const onPermissionChange = (checkedValues: UpdatePermissionListItemDto[]) => {
    changedPermession = checkedValues;
  }
  return (
    <div>
      <AdvancedSearchForm form={form} {...search} extraActions={[permissions["AbpIdentity.Roles.Create"] ? { content: "添加", action: showModal } : null]}>
        <Form.Item name="Filter" label="查找值"><Input placeholder="请输入查找值" /></Form.Item>
      </AdvancedSearchForm>
      <div className={styles.table}>
        <Table<IdentityRoleDto>
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
          }}>
          <Table.Column<IdentityRoleDto> title="角色字" dataIndex="name" />
          <Table.Column<IdentityRoleDto> title="默认" dataIndex="isDefault" render={(value) => <div>{value === true ? "是" : "否"}</div>} />
          <Table.Column<IdentityRoleDto> title="公开" dataIndex="isPublic" render={(value) => <div>{value === true ? "是" : "否"}</div>} />

          <Table.Column<IdentityRoleDto>
            title="操作"
            render={(recode) => {
              return (
                <Space>
                  {permissions["AbpIdentity.Roles.Update"] && <Button type="primary" onClick={() => getRole(recode)}>编辑</Button>}
                  {permissions["AbpIdentity.Roles.ManagePermissions"] && <Button type="primary" onClick={() => showPermissionModal(recode.name)}>权限</Button>}
                  {permissions["AbpIdentity.Roles.Delete"] && <Button type="primary" danger onClick={() => deleteRole(recode)}>删除</Button>}
                </Space>
              );
            }}
          />
        </Table>
      </div>
      <Modal visible={visible} title={modalTitle} okText="确定" cancelText="取消" onCancel={() => {
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
              message.error("添加失败");
            });
        }}>
        <Form form={modalForm} name="form_in_modal" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} >
          <Form.Item name="id" label="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="name" label="角色名" rules={[{ required: true, message: "请输入角色名" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="isDefault" label="默认" valuePropName="checked">
            <Checkbox />
          </Form.Item>
          <Form.Item name="isPublic" label="公开" valuePropName="checked">
            <Checkbox />
          </Form.Item>
          <Form.Item name="concurrencyStamp" label="concurrencyStamp" hidden>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal visible={permissionModalVisible} title="权限" okText="确定" cancelText="取消" onCancel={() => { setPermissionModalVisible(false); }}
        onOk={() => {
          permissionStore.updatePermissionsByRole(roleName, { permissions: changedPermession }).then(() => {
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
