import { useAntdTable, useRequest } from "ahooks";
import { Button, Checkbox, Divider, Form, Input, message, Modal, Row, Switch, Table, Tabs } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { useState } from "react";
import AdvancedSearchForm from "../../../../components/AdvanceSearchForm";
import { PermissionGroup, UpdatePermissionListItemDto, } from "../../../../data/models/system/Permission";
import { RoleDto } from "../../../../data/models/system/Role";
import { AddUpdateUserBaseDto, UserDto } from "../../../../data/models/system/User";
import useStores from "../../../../hooks/useStore";

type CheckState = Record<string, boolean>;
function User() {
  const { userStore, permissionStore } = useStores();
  const [visible, setVisible] = useState(false);
  const [permissionModalVisible, setPermissionModalVisible] = useState(false);
  const [permissionModalForm] = Form.useForm();
  const [isAddUser, setIsAddUser] = useState(true);
  const [form] = Form.useForm();
  const [modalForm] = Form.useForm();
  const [roles, setRoles] = useState<RoleDto[]>([]);
  const [userId, setUserId] = useState("");
  const [permissionGroup, setPermissionGroup] = useState<PermissionGroup>({} as PermissionGroup);
  // const [allCheckStatus, setAllCheckStatus] = useState<CheckState>({});
  const [allCheckStatus, setAllCheckStatus] = useState<{ [key: string]: boolean }>({});
  const [initPermission, setInitPermission] = useState<{ [key: string]: boolean }>({});
  const { tableProps, search } = useAntdTable(userStore.getUsers, {
    defaultPageSize: 10,
    form,
    debounceWait: 500,
  });
  const { runAsync } = useRequest(userStore.getUserById, {
    manual: true,
  });
  const deleteUser = (record: UserDto) => {
    Modal.confirm({
      title: "删除标签",
      content: "确定删除吗？",
      onOk: async () => {
        const success = await userStore.deleteUser(record.id);
        if (success) {
          message.success("删除成功");
          search.submit();
        }
      },
      okText: "确定",
      cancelText: "取消",
    });
  };
  const onPermissionChange = (e: CheckboxChangeEvent) => {
    const name = e.target.name!;
    const value = e.target.checked;
    if (name === "allCheck") {
      //勾选全部点击
      if (value === true) {
        for (const key in allCheckStatus) {
          allCheckStatus[key] = true;
        }
        allCheckStatus[name] = value;
      }
      else {
        for (const key in allCheckStatus) {
          allCheckStatus[key] = false;
        }
        allCheckStatus[name] = value;
      }
    }
    else {
      if (permissionGroup.groups.findIndex(g => g.name === name) !== -1) {
        //是组点击
        if (value === true) {
          for (const key in allCheckStatus) {
            if (key.startsWith(name)) {
              allCheckStatus[key] = true;
            }
          }
          allCheckStatus[name] = value;
        }
        else {
          for (const key in allCheckStatus) {
            if (key.startsWith(name)) {
              allCheckStatus[key] = false;
            }
          }
          allCheckStatus[name] = value;
        }
      }
      else {
        //不是组点击
        if (value === true) {
          allCheckStatus[name] = value;
          if (name.split('.').length === 3) {
            allCheckStatus[name.substring(0, name.lastIndexOf('.'))] = value;
          }
        }
        else {
          allCheckStatus[name] = value;
          if (name.split('.').length === 2) {
            for (const key in allCheckStatus) {
              if (key.startsWith(name)) {
                allCheckStatus[key] = value;
              }
            }
          }
        }
      }
    }
    let array = Array<{ key: string, value: boolean }>();
    for (const key in allCheckStatus) {
      array.push({ key: key, value: allCheckStatus[key] });
    }
    if (name.split('.').length > 1) {
      const groupName = name.substring(0, name.indexOf('.'));
      const group1 = array.filter(i => i.key.startsWith(groupName));
      const group2 = group1.filter(i => i.key !== groupName);
      if (group2.every(i => i.value === true)) {
        allCheckStatus[groupName] = true;
      }
      else {
        allCheckStatus[groupName] = false;
      }
    }
    array = Array<{ key: string, value: boolean }>();
    for (const key in allCheckStatus) {
      array.push({ key: key, value: allCheckStatus[key] });
    }
    const group = array.filter(i => permissionGroup.groups.map(i => i.name).includes(i.key));
    if (group.every(i => i.value === true)) {
      allCheckStatus["allCheck"] = true;
    }
    else {
      allCheckStatus["allCheck"] = false;
    }
    setAllCheckStatus({ ...allCheckStatus });

  };
  const showModal = () => {
    userStore.getAssignableRoles().then((res) => { setRoles(res.items) });
    setVisible(true);
  };
  const showPermissionModal = (id: string) => {
    setUserId(id);
    setPermissionModalVisible(true);
    permissionStore.getPermissionByUser(id).then((res) => {
      const staus: { [key: string]: boolean } = {};
      res.groups.forEach(g => {
        g.permissions.forEach(p => { staus[p.name] = p.isGranted; });
        if (g.permissions.every(p => p.isGranted === true)) {
          staus[g.name] = true;
        }
        else {
          staus[g.name] = false;
        }
      });
      staus.allCheck = true;
      for (const k in staus) {
        if (staus[k] === false) {
          staus.allCheck = false;
        }
      }

      setAllCheckStatus(staus);
      const temp = { ...staus };
      delete temp.allCheck;

      res.groups.forEach(g => {
        delete temp[g.name];
      });
      setInitPermission(temp);
      setPermissionGroup(res);
    });
  };
  const addUser = () => {
    setIsAddUser(true);
    showModal();
  };
  const updateUser = (id: string, user: UserDto) => {
    setIsAddUser(false);
    showModal();
    userStore.getUserRoleById(id).then((res) => {
      modalForm.setFieldsValue({ ...user, roleNames: res.items.map(i => i.name) });
    });
  };
  const getUser = async (record: UserDto) => {
    try {
      const user = await runAsync(record.id);
      if (user) {
        updateUser(record.id, user)
      }
    } catch (error) {
      //
    }

  };
  const addOrUpdateUser = async (id: string, data: AddUpdateUserBaseDto) => {
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
  const checkedCount = (groupName: string) => {
    let count = 0;
    for (const key in allCheckStatus) {
      if (key.startsWith(groupName) && key !== groupName) {
        if (allCheckStatus[key] === true) {
          count += 1;
        }
      }
    }
    return count;
  }
  const createPermissionView = () => {

    return (<>

    </>)
  }
  const getInitPermission = () => {
    return initPermission;
  }
  return (
    <div>
      <AdvancedSearchForm
        form={form}
        {...search}
        extraActions={[
          {
            content: "添加",
            action: addUser,
          },
        ]}
      >
        <Form.Item name="title" label="标题">
          <Input placeholder="请输入标题" />
        </Form.Item>
        <Form.Item name="linkUrl" label="链接地址">
          <Input placeholder="请输入链接地址" />
        </Form.Item>
      </AdvancedSearchForm>
      <div className="mt-4">
        <Table<UserDto> size="small"
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
          <Table.Column<UserDto> title="用户名" dataIndex="userName" />
          <Table.Column<UserDto> title="名" dataIndex="name" />
          <Table.Column<UserDto> title="姓" dataIndex="surname" />
          <Table.Column<UserDto> title="邮箱" dataIndex="email" />
          <Table.Column<UserDto> title="电话" dataIndex="phoneNumber" />
          <Table.Column<UserDto> title="启动锁定" dataIndex="lockoutEnabled" render={(value) => <div>{value === true ? "是" : "否"}</div>} />
          <Table.Column<UserDto> title="已删除" dataIndex="isDeleted" render={(value) => <div>{value === true ? "是" : "否"}</div>} />
          <Table.Column<UserDto> title="邮箱确认" dataIndex="emailConfirmed" render={(value) => <div>{value === true ? "是" : "否"}</div>} />
          <Table.Column<UserDto> title="电话确认" dataIndex="phoneNumberConfirmed" render={(value) => <div>{value === true ? "是" : "否"}</div>} />
          <Table.Column<UserDto> title="是否激活" dataIndex="isActive" render={(value) => <div>{value === true ? "是" : "否"}</div>} />
          <Table.Column<UserDto>
            title="操作"
            render={(recode) => {
              return (
                <div className="space-x-4">
                  <Button type="primary" onClick={() => getUser(recode)}>编辑</Button>
                  <Button type="primary" onClick={() => showPermissionModal(recode.id)}>权限</Button>
                  <Button type="primary" danger onClick={() => deleteUser(recode)} >删除</Button>
                </div>
              );
            }}
          />
        </Table>
      </div>
      <Modal
        visible={visible}
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
              addOrUpdateUser(values.id, values);
            })
            .catch((info) => {
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
      <Modal
        visible={permissionModalVisible}
        title="权限"
        okText="确定"
        cancelText="取消"
        onCancel={() => {
          setPermissionModalVisible(false);
          // modalForm.resetFields();
        }}
        onOk={() => {
          const temp = { ...allCheckStatus };
          delete temp.allCheck;
          permissionGroup.groups.forEach(g => {
            delete temp[g.name];
          });
          const change: UpdatePermissionListItemDto[] = [];
          for (const key in initPermission) {
            if (initPermission[key] !== temp[key]) {
              change.push({ name: key, isGranted: temp[key] });
            }
          }
          console.log(change, userId);
          permissionStore.updatePermissionsByUser(userId, { permissions: change }).then(() => {
            //
            console.log("成功");
            setPermissionModalVisible(false);
          });
        }}
      >
        <Checkbox onChange={onPermissionChange} name="allCheck" checked={allCheckStatus.allCheck}>授予所有权限</Checkbox>
        <Divider />
        <Form form={permissionModalForm} name="form_in_modal" labelCol={{ span: 7 }} wrapperCol={{ span: 17 }} >
          <Tabs defaultActiveKey="1" tabPosition="left">
            {permissionGroup.groups && permissionGroup.groups.map(g => {
              return <Tabs.TabPane tab={`${g.displayName}(${checkedCount(g.name)}/${g.permissions.length})`} key={g.name}>
                {g.displayName}
                <Divider />
                <Checkbox name={g.name} checked={allCheckStatus[g.name]} onChange={onPermissionChange}>全选</Checkbox>
                <Divider />
                {g.permissions.map(p => {
                  return <Row key={p.name}>{p.parentName !== null ? <span>&nbsp;&nbsp;&nbsp;&nbsp;</span> : ""}<Checkbox name={p.name} onChange={onPermissionChange} checked={allCheckStatus[p.name]}>{p.displayName}</Checkbox></Row>
                })}

              </Tabs.TabPane>
            })}

          </Tabs>
        </Form>
        {/* {createPermissionView()} */}
      </Modal>
    </div >
  );
}

export default User;
