import { useRequest } from "ahooks";
import { Button, Form, Input, Select } from "antd";
import { useParams } from "react-router-dom";
import Editor from "../../../../../components/Editor";
import useStores from "../../../../../hooks/useStore";

function AddOrEditPost() {
  const { postid } = useParams();
  const { tagStore } = useStores();
  const { data } = useRequest(tagStore.getAllTags, { debounceWait: 500 });
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      {postid ? postid : "null"}
      <Form
        name="basic"
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 6 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
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
          name="category"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="标签"
          name="tags"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Select
            options={
              data &&
              data.map((tag) => {
                return { label: tag.displayName, value: tag.id };
              })
            }
          />
        </Form.Item>

        <Form.Item
          label="内容"
          name="markdown"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Editor
            value="123"
            placeholder="sadfasdf"
            onChange={(e) => console.log(e)}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddOrEditPost;
