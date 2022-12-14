import { useAntdTable, useRequest } from "ahooks";
import { Button, Form, Input, message, Modal, Space, Table } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import AdvancedSearchForm from "../../../components/AdvanceSearchForm";
import { AuditLogDto } from "../../../data/models/AuditLog";
import { useStores } from "../../../hooks/useStore";
import styles from "./index.module.less";
function AuditLog() {
  const { useAuditLogStore } = useStores();
  const [getAuditLogs, getAuditLogById] = useAuditLogStore(state => [state.getAuditLogs, state.getAuditLogById])
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [modalForm] = Form.useForm();
  const { tableProps, search } = useAntdTable(getAuditLogs, {
    defaultPageSize: 10,
    form,
    debounceWait: 500,
  });
  const { runAsync } = useRequest(getAuditLogById, {
    manual: true,
  });

  const showModal = () => {
    setVisible(true);
  };
  const getAuditLog = async (record: AuditLogDto) => {
    try {
      const audit_log = await runAsync(record.id);
      if (audit_log) {
        modalForm.setFieldsValue(audit_log);
        console.log(audit_log);
        setVisible(true);
      }
    } catch (error) { message.error((error as Error).message) }
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
      <div className={styles.table}>
        <Table<AuditLogDto>
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
          <Table.Column<AuditLogDto> title="用户" dataIndex="userName" />
          <Table.Column<AuditLogDto> title="执行时间" dataIndex="executionTime" render={data => { return <div>{dayjs(data).format("L LT")}</div> }} />
          <Table.Column<AuditLogDto> title="持续时间(毫秒)" dataIndex="executionDuration" />
          <Table.Column<AuditLogDto> title="浏览器信息" dataIndex="browserInfo" />
          <Table.Column<AuditLogDto> title="请求地址" dataIndex="url" />
          <Table.Column<AuditLogDto>
            title="操作"
            render={(recode) => {
              return (
                <Space>
                  <Button type="primary" onClick={() => getAuditLog(recode)}>
                    详情
                  </Button>
                </Space>
              );
            }}
          />
        </Table>
      </div>
      <Modal
        open={visible}
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
              setVisible(false);
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
            name="linkUrl"
            label="链接地址"
            rules={[
              {
                required: true,
                message: "请输入链接地址",
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

export default AuditLog;
