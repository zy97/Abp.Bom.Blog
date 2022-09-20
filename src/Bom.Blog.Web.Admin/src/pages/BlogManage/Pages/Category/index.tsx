import { useAntdTable, useRequest } from "ahooks";
import { Button, Form, Input, message, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import AdvancedSearchForm from "../../../../components/AdvanceSearchForm";
import { CategoryDto } from "../../../../data/models/Category";
import { useAppConfig, useStores } from "../../../../hooks/useStore";
function Category() {
  const { applicationConfigurationStore } = useAppConfig();
  const { categoryStore } = useStores();
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [modalForm] = Form.useForm();
  const [permissions, setpermissions] = useState({} as Record<string, boolean>);
  useEffect(() => {
    applicationConfigurationStore.Get().then(config => {
      setpermissions(config.auth.grantedPolicies);
    });
  }, []);
  const { tableProps, search } = useAntdTable(categoryStore.getCategories, {
    defaultPageSize: 10,
    form,
    debounceWait: 500,
  });
  const { runAsync } = useRequest(categoryStore.getTagById, {
    manual: true,
  });
  const deleteTag = (record: CategoryDto) => {
    Modal.confirm({
      title: "删除标签",
      content: "确定删除吗？",
      onOk: async () => {
        const success = await categoryStore.deleteTag(record.id);
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
  const getTag = async (record: CategoryDto) => {
    try {
      const tag = await runAsync(record.id);
      if (tag) {
        modalForm.setFieldsValue(tag);
        console.log(tag);
        setVisible(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const addOrUpdateTag = async (data: CategoryDto) => {
    try {
      if (data.id) {
        const tag = await categoryStore.updateTag(data.id, data);
        if (tag) {
          modalForm.resetFields();
          message.success("更新成功");
          setVisible(false);
          search.submit();
        }
      } else {
        const tag = await categoryStore.addTag(data);
        if (tag) {
          modalForm.resetFields();
          message.success("添加成功");
          setVisible(false);
          search.submit();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <AdvancedSearchForm
        form={form}
        {...search}
        extraActions={[permissions["Blog.Admin.Create"] ? { content: "添加", action: showModal } : null]}
      >
        <Form.Item name="categoryName" label="目录名">
          <Input placeholder="请输入目录名" />
        </Form.Item>
        <Form.Item name="displayName" label="展示名">
          <Input placeholder="请输入展示名" />
        </Form.Item>
      </AdvancedSearchForm>
      <div className="mt-4">
        <Table<CategoryDto>
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
          <Table.Column<CategoryDto> title="Id" dataIndex="id" />
          <Table.Column<CategoryDto> title="目录名" dataIndex="categoryName" />
          <Table.Column<CategoryDto> title="展示名" dataIndex="displayName" />
          <Table.Column<CategoryDto>
            title="操作"
            render={(recode) => {
              return (
                <div className="space-x-4">
                  {permissions["Blog.Admin.Update"] && <Button type="primary" onClick={() => getTag(recode)}>编辑</Button>}
                  {permissions["Blog.Admin.Delete"] && <Button type="primary" danger onClick={() => deleteTag(recode)}>删除</Button>}
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
              addOrUpdateTag(values);
            })
            .catch(() => {
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
          <Form.Item
            name="categoryName"
            label="目录名"
            rules={[
              {
                required: true,
                message: "请输入目录名",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="displayName"
            label="展示名"
            rules={[
              {
                required: true,
                message: "请输入展示名",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Category;
