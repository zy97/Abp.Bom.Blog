import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Button, Col, Form, Row, Space } from "antd";
import { FormInstance } from "antd/es/form/Form";
import { useState } from "react";
import styles from "./index.module.less";
type AdvanceSearchFormProps = {
  form: FormInstance;
  submit: () => void;
  reset: () => void;
  extraActions: Array<extraActionProps | null>;
  children: React.ReactNode[] | React.ReactNode;
};
type extraActionProps = {
  content: string;
  action: () => void;
};
const AdvancedSearchForm = (props: AdvanceSearchFormProps) => {
  const { form, submit, reset, extraActions } = props;
  let totalChildren: React.ReactNode[] = [];
  if (props.children instanceof Array) {
    totalChildren = props.children;
  } else {
    totalChildren.push(props.children);
  }
  const formCount = totalChildren.length;
  const [expand, setExpand] = useState(false);
  const getFields = () => {
    const count = formCount <= 6 ? formCount : expand ? formCount : 6;
    const children = [];
    for (let i = 0; i < count; i++) {
      children.push(
        <Col span={8} key={i}>
          {totalChildren[i]}
        </Col>
      );
    }
    return children;
  };
  return (
    <Form form={form} name="advanced_search" >
      <Row gutter={24}>{getFields()}</Row>
      <Row>
        <Col span={24} className={styles.search}>
          <Space>
            {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              extraActions.filter(i => i !== null).map((i: extraActionProps, key: number) => {
                return (
                  <Button type="primary" key={key} onClick={() => i.action()}>
                    {i.content}
                  </Button>
                );
              })}
            <Button type="primary" htmlType="submit" onClick={submit}>
              搜索
            </Button>
            <Button onClick={reset}>重置</Button>
            {formCount >= 6 && (
              <a
                style={{ fontSize: 12 }}
                onClick={() => {
                  setExpand(!expand);
                }}
              >
                {expand ? <UpOutlined /> : <DownOutlined />} 折叠
              </a>
            )}
          </Space>

        </Col>
      </Row>
    </Form>
  );
};
export default AdvancedSearchForm;
