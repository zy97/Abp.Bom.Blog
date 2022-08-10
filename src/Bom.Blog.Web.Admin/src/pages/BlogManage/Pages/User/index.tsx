import { useAntdTable, useRequest } from "ahooks";
import { Button, Form, Input, message, Modal, Table } from "antd";
import { useState } from "react";
import AdvancedSearchForm from "../../../../components/AdvanceSearchForm";
import { UserDto } from "../../../../data/models/system/User";
import useStores from "../../../../hooks/useStore";

function User() {
  const { userStore } = useStores();
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [modalForm] = Form.useForm();
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
  const showModal = () => {
    setVisible(true);
  };
  const getUser = async (record: UserDto) => {
    try {
      const user = await runAsync(record.id);
      if (user) {
        modalForm.setFieldsValue(user);
        console.log(user);
        setVisible(true);
      }
    } catch (error) { }
  };
  const addOrUpdateUser = async (data: UserDto) => {
    try {
      if (data.id) {
        const user = await userStore.updateUser(data.id, data);
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
    } catch (error) { }
  };
  return (
    <div>
      <AdvancedSearchForm
        form={form}
        {...search}
        extraActions={[
          {
            content: "添加",
            action: showModal,
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
          <Table.Column<UserDto> title="姓名" dataIndex="name" />
          <Table.Column<UserDto> title="绰号" dataIndex="surname" />
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
                  <Button type="primary" onClick={() => getUser(recode)}>
                    编辑
                  </Button>
                  <Button
                    type="primary"
                    danger
                    onClick={() => deleteUser(recode)}
                  >
                    删除
                  </Button>
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
              addOrUpdateUser(values);
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
          <Form.Item name="userName" label="userName" rules={[{ required: true, message: "请输入userName" }]} >
            <Input />
          </Form.Item>
          <Form.Item name="name" label="name" rules={[{ required: true, message: "请输入name" }]} >
            <Input />
          </Form.Item>
          <Form.Item name="surname" label="surname" rules={[{ required: true, message: "请输入surname" }]} >
            <Input />
          </Form.Item>
          <Form.Item name="email" label="email" rules={[{ required: true, message: "请输入email" }]} >
            <Input />
          </Form.Item>
          <Form.Item name="phoneNumber" label="phoneNumber" rules={[{ required: true, message: "请输入phoneNumber" }]} >
            <Input />
          </Form.Item>
          <Form.Item name="isActive" label="isActive" rules={[{ required: true, message: "请输入isActive" }]} >
            <Input />
          </Form.Item>
          <Form.Item name="lockoutEnabled" label="lockoutEnabled" rules={[{ required: true, message: "请输入lockoutEnabled" }]} >
            <Input />
          </Form.Item>
          <Form.Item name="password" label="password" rules={[{ required: true, message: "请输入password" }]} >
            <Input />
          </Form.Item>
          <Form.Item name="concurrencyStamp" label="concurrencyStamp" rules={[{ required: true, message: "请输入concurrencyStamp" }]} hidden>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default User;
