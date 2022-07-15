import { Button, Form, Input, message, Modal, Select, Table, Tag } from "antd";
import { useState } from "react";
import { useAntdTable, useRequest } from "ahooks";
import { useNavigate } from "react-router-dom";
import useStores from "../../../../../hooks/useStore";
import { PostDto } from "../../../../../data/models/post";
import AdvancedSearchForm from "../../../../../components/AdvanceSearchForm";
import { CategoryDto } from "../../../../../data/models/Category";
import { TagDto } from "../../../../../data/models/Tag";
function ListView() {
  const navigate = useNavigate();
  const { postStore } = useStores();
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [modalForm] = Form.useForm();
  const { tableProps, search } = useAntdTable(postStore.getPosts, {
    defaultPageSize: 10,
    form,
    debounceWait: 500,
  });
  const { runAsync } = useRequest(postStore.getPostById, {
    manual: true,
  });
  const deletePost = (record: PostDto) => {
    Modal.confirm({
      title: "删除标签",
      content: "确定删除吗？",
      onOk: async () => {
        const success = await postStore.deletePost(record.id);
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
  const navigateToNewPage = () => {
    navigate("/blogmanage/post/add");
    // setVisible(true);
  };
  const navigateToEditPost = async (record: PostDto) => {
    try {
      navigate(`/blogmanage/post/${record.id}`);
      // const tag = await runAsync(record.id);
      // if (tag) {
      //     modalForm.setFieldsValue(tag);
      //     console.log(tag);
      //     setVisible(true);
      // }
    } catch (error) {
      console.log(error);
    }
  };
  const addOrUpdatePost = async (data: PostDto) => {
    try {
      if (data.id) {
        const tag = await postStore.updatePost(data.id, {
          ...data,
          categoryId: "",
          tagIds: [],
        });
        if (tag) {
          modalForm.resetFields();
          message.success("更新成功");
          setVisible(false);
          search.submit();
        }
      } else {
        const tag = await postStore.addPost({
          ...data,
          categoryId: "",
          tagIds: [],
        });
        if (tag) {
          modalForm.resetFields();
          message.success("添加成功");
          setVisible(false);
          search.submit();
        }
      }
    } catch (error) {}
  };
  return (
    <div>
      <AdvancedSearchForm
        form={form}
        {...search}
        extraActions={[
          {
            content: "添加",
            action: navigateToNewPage,
          },
        ]}
      >
        <Form.Item name="tagName" label="标签名">
          <Input placeholder="请输入标签名" />
        </Form.Item>
        <Form.Item name="displayName" label="展示名">
          <Input placeholder="请输入展示名" />
        </Form.Item>
      </AdvancedSearchForm>
      <div className="mt-4">
        <Table<PostDto>
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
          <Table.Column<PostDto> title="Id" dataIndex="id" />
          <Table.Column<PostDto> title="作者" dataIndex="author" />
          <Table.Column<PostDto>
            title="目录"
            dataIndex="category"
            render={(e: CategoryDto) => {
              return <div>{e.displayName}</div>;
            }}
          />
          <Table.Column<PostDto> title="标题" dataIndex="title" />
          <Table.Column<PostDto>
            title="标签"
            dataIndex="tags"
            render={(e: TagDto[]) => {
              return e.map((item, index) => {
                return (
                  <Tag color="green" key={index}>
                    {item.displayName}
                  </Tag>
                );
              });
            }}
          />
          <Table.Column<PostDto>
            title="操作"
            render={(recode) => {
              return (
                <div className="space-x-4">
                  <Button
                    type="primary"
                    onClick={() => navigateToEditPost(recode)}
                  >
                    编辑
                  </Button>
                  <Button
                    type="primary"
                    danger
                    onClick={() => deletePost(recode)}
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
              addOrUpdatePost(values);
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
          <Form.Item
            name="author"
            label="作者"
            rules={[
              {
                required: true,
                message: "请输入作者",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="title"
            label="标题"
            rules={[
              {
                required: true,
                message: "请输入标题",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="url"
            label="地址"
            rules={[
              {
                required: true,
                message: "请输入地址",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="目录"
            rules={[
              {
                required: true,
                message: "请输入地址",
              },
            ]}
          >
            <Select></Select>
          </Form.Item>
          <Form.Item
            name="tags"
            label="标签"
            rules={[
              {
                required: true,
                message: "请输入地址",
              },
            ]}
          >
            <Select></Select>
          </Form.Item>
          <Form.Item
            name="tags"
            label="标签"
            rules={[
              {
                required: true,
                message: "请输入地址",
              },
            ]}
          ></Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ListView;
