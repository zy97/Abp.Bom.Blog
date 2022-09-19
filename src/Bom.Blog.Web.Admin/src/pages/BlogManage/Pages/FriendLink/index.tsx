import { useAntdTable, useRequest } from 'ahooks';
import { Button, Form, Input, message, Modal, Table } from 'antd';
import { useState } from 'react';
import AdvancedSearchForm from '../../../../components/AdvanceSearchForm';
import { FriendLinkDto } from '../../../../data/models/FriendLink';
import { useStores } from '../../../../hooks/useStore';

function FriendLink() {
    const { friendLinkStore } = useStores();
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const [modalForm] = Form.useForm();
    const { tableProps, search } = useAntdTable(
        friendLinkStore.getFriendLinks,
        {
            defaultPageSize: 10,
            form,
            debounceWait: 500,
        }
    );
    const { runAsync } = useRequest(friendLinkStore.getFriendLinkById, {
        manual: true,
    });
    const deleteTag = (record: FriendLinkDto) => {
        Modal.confirm({
            title: '删除标签',
            content: '确定删除吗？',
            onOk: async () => {
                const success = await friendLinkStore.deleteFriendLink(
                    record.id
                );
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
    const getTag = async (record: FriendLinkDto) => {
        try {
            const tag = await runAsync(record.id);
            if (tag) {
                modalForm.setFieldsValue(tag);
                console.log(tag);
                setVisible(true);
            }
        } catch (error) { }
    };
    const addOrUpdateTag = async (data: FriendLinkDto) => {
        try {
            if (data.id) {
                const tag = await friendLinkStore.updateFriendLink(
                    data.id,
                    data
                );
                if (tag) {
                    modalForm.resetFields();
                    message.success('更新成功');
                    setVisible(false);
                    search.submit();
                }
            } else {
                const tag = await friendLinkStore.addFriendLink(data);
                if (tag) {
                    modalForm.resetFields();
                    message.success('添加成功');
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
                        content: '添加',
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
                <Table<FriendLinkDto>
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
                    <Table.Column<FriendLinkDto> title="Id" dataIndex="id" />
                    <Table.Column<FriendLinkDto>
                        title="标题"
                        dataIndex="title"
                    />
                    <Table.Column<FriendLinkDto>
                        title="链接地址"
                        dataIndex="linkUrl"
                    />
                    <Table.Column<FriendLinkDto>
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
                        name="title"
                        label="标题"
                        rules={[
                            {
                                required: true,
                                message: '请输入标题',
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
                                message: '请输入链接地址',
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

export default FriendLink;
