import { useRequest } from "ahooks";
import { Button, Form, Input, message, Select } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "../../../../../components/Editor";
import { useStores } from "../../../../../hooks/useStore";

function AddOrEditPost() {
  const { postid } = useParams();

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { tagStore, categoryStore, postStore } = useStores();
  useEffect(() => {
    if (postid) {
      postStore
        .getPostById(postid)
        .then((post) => {
          if (post === undefined) {
            message.error("文章不存在");
            return;
          }
          form.setFieldsValue({ ...post, });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  const { data: tagData } = useRequest(tagStore.getAllTags, {
    debounceWait: 500,
  });
  const { data: categoryData } = useRequest(categoryStore.getAllCategories, {
    debounceWait: 500,
  });
  const onFinish = async (values: any) => {
    console.log(values);
    try {
      if (postid === undefined) {
        await postStore.addPost(values);
      }
      else {
        await postStore.updatePost(postid, values);
      }
      cancel();
    } catch (error) {
      console.log(error);
    }
  };
  const cancel = () => {
    navigate("/blogmanage/post", { replace: true });
  };
  const reset = () => {
    form.resetFields();
  };
  return (
    <div className="h-full">
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 6 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          label="标题"
          name="title"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="作者"
          name="author"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="目录"
          name="categoryId"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Select
            options={
              categoryData &&
              categoryData.map((category) => {
                return { label: category.displayName, value: category.id };
              })
            }
          />
        </Form.Item>

        <Form.Item
          label="标签"
          name="tags"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Select
            mode="multiple"
            options={
              tagData &&
              tagData.map((tag) => {
                return { label: tag.displayName, value: tag.id };
              })
            }
          />
        </Form.Item>

        <Form.Item
          style={{ height: "420px" }}
          label="内容"
          wrapperCol={{ span: 24 }}
          name="markdown"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Editor placeholder="请输入一些内容" />
        </Form.Item>

        <Form.Item
          wrapperCol={{ offset: 10, span: 16 }}
          style={{ marginBottom: "0px" }}
        >
          <div className="space-x-6">
            <Button type="primary" htmlType="submit">提交</Button>
            {!postid && <Button type="primary" onClick={reset}>重置</Button>}
            <Button type="primary" onClick={cancel}>取消</Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddOrEditPost;
