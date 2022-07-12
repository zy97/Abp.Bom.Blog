import { useAntdTable, useRequest } from 'ahooks';
import { Button, Form, Input, message, Modal, Table } from 'antd';
import { useState } from 'react';
import AdvancedSearchForm from '../../../../components/AdvanceSearchForm';
import Tag from '../../../../data/models/Tag';
import useStores from '../../../../hooks/useStore';
function Tags() {
    const { tagStore } = useStores();
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const [modalForm] = Form.useForm();
    const { tableProps, search, params } = useAntdTable(tagStore.getTags, {
        defaultPageSize: 10,
        form,
        debounceWait: 500,
    });
    console.log(tableProps);
    const { runAsync } = useRequest(tagStore.getTagById, {
        manual: true,
    });
    const deleteTag = (record: Tag) => {
        Modal.confirm({
            title: '删除标签',
            content: '确定删除吗？',
            onOk: async () => {
                const success = await tagStore.deleteTag(record.id);
                if (success) {
                    message.success('删除成功');
                    search.submit();
                } else {
                    message.error('删除失败');
                }
            },
            okText: '确定',
            cancelText: '取消',
        });
    };
    const showModal = () => {
        setVisible(true);
    };
    const getTag = async (record: Tag) => {
        try {
            console.log('editTag', record);
            const tag = await runAsync(record.id);
            if (tag) {
                modalForm.setFieldsValue(tag);
                console.log(tag);
                setVisible(true);
            }
        } catch (error) {}
    };
    const addOrUpdateTag = async (data: Tag) => {
        try {
            if (data.id) {
                const tag = await tagStore.updateTag(data.id, data);
                if (tag) {
                    modalForm.resetFields();
                    message.success('更新成功');
                    setVisible(false);
                    search.submit();
                }
            } else {
                const tag = await tagStore.addTag(data);
                if (tag) {
                    modalForm.resetFields();
                    message.success('添加成功');
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
                        content: '添加',
                        action: showModal,
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
            <div>
                <Table<Tag>
                    rowKey="id"
                    {...{
                        ...tableProps,
                        pagination: {
                            showTotal: (total, range) => {
                                return <div>总共：{total} 项</div>;
                            },
                            showSizeChanger: true,
                        },
                    }}
                >
                    <Table.Column<Tag> title="Id" dataIndex="id" />
                    <Table.Column<Tag> title="标签名" dataIndex="tagName" />
                    <Table.Column<Tag> title="展示名" dataIndex="displayName" />
                    <Table.Column<Tag>
                        title="操作"
                        render={(recode) => {
                            return (
                                <div className="space-x-4">
                                    <Button
                                        type="primary"
                                        onClick={() => getTag(recode)}
                                    >
                                        编辑
                                    </Button>
                                    <Button
                                        type="primary"
                                        danger
                                        onClick={() => deleteTag(recode)}
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
                            addOrUpdateTag(values);
                        })
                        .catch((info) => {
                            console.log('Validate Failed:', info);
                            message.error('添加失败');
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
                        name="tagName"
                        label="标签名"
                        rules={[
                            {
                                required: true,
                                message: '请输入标签名',
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
                                message: '请输入展示名',
                            },
                        ]}
                    >
                        <Input type="textarea" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
export default Tags;
