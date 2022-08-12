import { useAntdTable, useRequest } from "ahooks";
import { Button, Checkbox, Form, Input, message, Modal, Table } from "antd";
import { useState } from "react";
import AdvancedSearchForm from "../../../../components/AdvanceSearchForm";
import { RoleDto } from "../../../../data/models/system/Role";
import useStores from "../../../../hooks/useStore";

function Role() {
  const { roleStore } = useStores();
  const [modalTitle, setModalTitle] = useState("");
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [modalForm] = Form.useForm();
  const { tableProps, search } = useAntdTable(roleStore.getRoles, {
    defaultPageSize: 10,
    form,
    debounceWait: 500,
  });
  const { runAsync } = useRequest(roleStore.getRoleById, {
    manual: true,
  });
  const deleteRole = (record: RoleDto) => {
    Modal.confirm({
      title: "删除标签",
      content: "确定删除吗？",
      onOk: async () => {
        const success = await roleStore.deleteRole(record.id);
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
    setModalTitle("添加Role");
    setVisible(true);
  };
  const getRole = async (record: RoleDto) => {
    try {
      const role = await runAsync(record.id);
      if (role) {
        setModalTitle("编辑Role");
        modalForm.setFieldsValue(role);
        console.log(role);
        setVisible(true);
      }
    } catch (error) {
      //
    }
  };
  const addOrUpdateRole = async (data: RoleDto) => {
    console.log(data);
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
        <Table<RoleDto>
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
          <Table.Column<RoleDto> title="角色字" dataIndex="name" />
          <Table.Column<RoleDto> title="默认" dataIndex="isDefault" render={(value) => <div>{value === true ? "是" : "否"}</div>} />
          <Table.Column<RoleDto> title="公开" dataIndex="isPublic" render={(value) => <div>{value === true ? "是" : "否"}</div>} />

          <Table.Column<RoleDto>
            title="操作"
            render={(recode) => {
              return (
                <div className="space-x-4">
                  <Button type="primary" onClick={() => getRole(recode)}>
                    编辑
                  </Button>
                  <Button
                    type="primary"
                    danger
                    onClick={() => deleteRole(recode)}
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
        title={modalTitle}
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
              addOrUpdateRole(values);
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
    </div>
  );
}

export default Role;
