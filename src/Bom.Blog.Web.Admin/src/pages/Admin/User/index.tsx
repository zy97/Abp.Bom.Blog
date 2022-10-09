import { IdentityUserDto } from "@abp/ng.account.core/proxy";
import { IdentityRoleDto } from "@abp/ng.identity/proxy";
import { useAntdTable, useRequest } from "ahooks";
import { Button, Checkbox, Form, Input, message, Modal, Row, Space, Switch, Table, Tabs } from "antd";
import { useEffect, useState } from "react";
import AdvancedSearchForm from "../../../components/AdvanceSearchForm";
import { PermissionGroup, UpdatePermissionListItemDto, } from "../../../data/models/system/Permission";
import { useAppConfig, useStores } from "../../../hooks/useStore";
import Permission from "../../Components/Permission";
import styles from "./index.module.less";
function User() {
  const { applicationConfigurationStore } = useAppConfig();
  const { userStore, permissionStore } = useStores();
  const [visible, setVisible] = useState(false);
  const [permissionModalVisible, setPermissionModalVisible] = useState(false);
  const [isAddUser, setIsAddUser] = useState(true);
  const [form] = Form.useForm();
  const [modalForm] = Form.useForm();
  const [roles, setRoles] = useState<IdentityRoleDto[]>([]);
  const [userId, setUserId] = useState("");
  const [permissionGroup, setPermissionGroup] = useState<PermissionGroup>({} as PermissionGroup);
  let changedPermession: UpdatePermissionListItemDto[];
  const { tableProps, search } = useAntdTable(userStore.getUsers, { defaultPageSize: 10, form, debounceWait: 500, });
  const { runAsync } = useRequest(userStore.getUserById, { manual: true, });
  const [permissions, setpermissions] = useState({} as Record<string, boolean>);
  useEffect(() => {
    applicationConfigurationStore.Get().then(config => {
      setpermissions(config.auth.grantedPolicies);
    });
  }, []);
  const deleteUser = (record: IdentityUserDto) => {
    Modal.confirm({
      title: "删除标签", content: "确定删除吗？",
      onOk: async () => {
        const success = await userStore.deleteUser(record.id);
        if (success) {
          message.success("删除成功");
          search.submit();
        }
      },
      okText: "确定", cancelText: "取消",
    });
  };
  const showModal = () => {
    userStore.getAssignableRoles().then((res) => { setRoles(res.items!) });
    setVisible(true);
  };
  const showPermissionModal = (id: string) => {
    setUserId(id);
    permissionStore.getPermissionByUser(id).then((res) => {
      setPermissionGroup(res);
      setPermissionModalVisible(true);
    });
  };
  const addUser = () => {
    setIsAddUser(true);
    showModal();
  };
  const updateUser = (id: string, user: IdentityUserDto) => {
    setIsAddUser(false);
    showModal();
    userStore.getUserRoleById(id).then((res) => {
      modalForm.setFieldsValue({ ...user, roleNames: res.items!.map(i => i.name) });
    });
  };
  const getUser = async (record: IdentityUserDto) => {
    try {
      const user = await runAsync(record.id);
      if (user) {
        updateUser(record.id, user)
      }
    } catch (error) {
      //
    }

  };
  const addOrUpdateUser = async (id: string, data: any) => {
    try {
      if (id) {
        const user = await userStore.updateUser(id, data);
        if (user) {
          modalForm.resetFields();
          message.success("更新成功");
          setVisible(false);
          search.submit();
        }
      } else {
        const user = await userStore.addUser(data);
        if (user) {
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
  const onPermissionChange = (checkedValues: UpdatePermissionListItemDto[]) => {
    changedPermession = checkedValues;
  }
  return (
    <div>
      <AdvancedSearchForm form={form} {...search} extraActions={[permissions["AbpIdentity.Users.Create"] ? { content: "添加", action: addUser } : null]}>
        <Form.Item name="Filter" label="查找值">
          <Input placeholder="请输入查找值" />
        </Form.Item>
      </AdvancedSearchForm>
      <div className={styles.table}>
        <Table<IdentityUserDto> size="small"
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
          <Table.Column<IdentityUserDto> title="用户名" dataIndex="userName" />
          <Table.Column<IdentityUserDto> title="名" dataIndex="name" />
          <Table.Column<IdentityUserDto> title="姓" dataIndex="surname" />
          <Table.Column<IdentityUserDto> title="邮箱" dataIndex="email" />
          <Table.Column<IdentityUserDto> title="电话" dataIndex="phoneNumber" />
          <Table.Column<IdentityUserDto> title="启动锁定" dataIndex="lockoutEnabled" render={(value) => <div>{value === true ? "是" : "否"}</div>} />
          <Table.Column<IdentityUserDto> title="已删除" dataIndex="isDeleted" render={(value) => <div>{value === true ? "是" : "否"}</div>} />
          <Table.Column<IdentityUserDto> title="邮箱确认" dataIndex="emailConfirmed" render={(value) => <div>{value === true ? "是" : "否"}</div>} />
          <Table.Column<IdentityUserDto> title="电话确认" dataIndex="phoneNumberConfirmed" render={(value) => <div>{value === true ? "是" : "否"}</div>} />
          <Table.Column<IdentityUserDto> title="是否激活" dataIndex="isActive" render={(value) => <div>{value === true ? "是" : "否"}</div>} />
          <Table.Column<IdentityUserDto>
            title="操作"
            render={(recode) => {
              return (
                <Space>
                  {permissions["AbpIdentity.Users.Update"] && <Button type="primary" onClick={() => getUser(recode)}>编辑</Button>}
                  {permissions["AbpIdentity.Users.ManagePermissions"] && <Button type="primary" onClick={() => showPermissionModal(recode.id)}>权限</Button>}
                  {permissions["AbpIdentity.Users.Delete"] && <Button type="primary" danger onClick={() => deleteUser(recode)} >删除</Button>}
                </Space>
              );
            }}
          />
        </Table>
      </div>
      <Modal visible={visible} title="添加一个新标签" okText="确定" cancelText="取消"
        onCancel={() => {
          setVisible(false);
          modalForm.resetFields();
        }}
        onOk={() => {
          modalForm
            .validateFields()
            .then((values) => {
              addOrUpdateUser(values.id, values);
            })
            .catch(() => {
              message.error("添加失败");
            });
        }}
      >
        <Form form={modalForm} name="form_in_modal" labelCol={{ span: 7 }} wrapperCol={{ span: 17 }} >
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="用户信息" key="1">
              <Form.Item name="id" label="id" hidden>
                <Input />
              </Form.Item>
              <Form.Item name="userName" label="用户名" rules={[{ required: true, message: "请输入用户名" }]} >
                <Input />
              </Form.Item>
              <Form.Item name="name" label="名" rules={[{ required: true, message: "请输入名" }]} >
                <Input />
              </Form.Item>
              <Form.Item name="surname" label="姓" rules={[{ required: true, message: "请输入姓" }]} >
                <Input />
              </Form.Item>
              {isAddUser && <Form.Item name="password" label="密码" rules={[{ required: true, message: "请输入密码" }]} >
                <Input />
              </Form.Item>}
              <Form.Item name="email" label="邮箱" rules={[{ required: true, message: "请输入邮箱" }]} >
                <Input />
              </Form.Item>
              <Form.Item name="phoneNumber" label="电话" rules={[{ required: true, message: "请输入电话" }]} >
                <Input />
              </Form.Item>
              <Form.Item name="isActive" label="启用" valuePropName="checked">
                <Switch />
              </Form.Item>
              <Form.Item name="lockoutEnabled" label="登陆失败，账号锁定" valuePropName="checked" >
                <Switch />
              </Form.Item>
              <Form.Item name="concurrencyStamp" label="concurrencyStamp" hidden>
                <Input />
              </Form.Item>

            </Tabs.TabPane>
            <Tabs.TabPane tab="角色" key="2">
              <Form.Item name="roleNames" label="">
                <Checkbox.Group style={{ width: '100%' }}>
                  {roles.map((item) => { return <Row key={item.name}><Checkbox value={item.name}>{item.name}</Checkbox></Row> })}
                </Checkbox.Group>
              </Form.Item>
            </Tabs.TabPane>
          </Tabs>
        </Form>
      </Modal>
      <Modal visible={permissionModalVisible} title="权限" okText="确定" cancelText="取消"
        onCancel={() => {
          setPermissionModalVisible(false);
          // modalForm.resetFields();
        }}
        onOk={() => {
          permissionStore.updatePermissionsByUser(userId, { permissions: changedPermession }).then(() => {
            setPermissionModalVisible(false);
          });
        }}
      >
        <Permission permissionGroup={permissionGroup} onPermissionChanged={onPermissionChange} />
      </Modal>
    </div >
  );
}

export default User;
