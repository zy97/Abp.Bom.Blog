import { useAntdTable } from 'ahooks';
import { Button, Form, Input, message, Modal, Select, Table } from 'antd';
import AdvancedSearchForm from '../../../../components/AdvanceSearchForm';
import Tag from '../../../../data/models/Tag';
import useStores from '../../../../hooks/useStore';
function Tags() {
    const { tagStore } = useStores();
    const [form] = Form.useForm();
    const { tableProps, search } = useAntdTable(tagStore.getTags, {
        defaultPageSize: 5,
        form,
        debounceWait: 500,
    });
    const deleteTag = (record: Tag) => {
        console.log('deleteTag', record);
        Modal.confirm({
            title: '删除标签',
            content: '确定删除吗？',
            onOk: async () => {
                const success = await tagStore.deleteTag(record.id);
                if (success) message.success('删除成功');
                else message.error('删除失败');
            },
            okText: '确定',
            cancelText: '取消',
        });
    };
    return (
        <div>
            <AdvancedSearchForm form={form} {...search}>
                <Form.Item name="tagName" label="标签名">
                    <Input placeholder="请输入标签名" />
                </Form.Item>
                <Form.Item name="displayName" label="展示名">
                    <Input placeholder="请输入展示名" />
                </Form.Item>
            </AdvancedSearchForm>
            <div>
                <Table<Tag> rowKey="Id" {...tableProps}>
                    <Table.Column<Tag> title="Id" dataIndex="id" key="id" />
                    <Table.Column<Tag>
                        title="标签名"
                        dataIndex="tagName"
                        key="tagName"
                    />
                    <Table.Column<Tag>
                        title="展示名"
                        dataIndex="displayName"
                        key="displayName"
                    />
                    <Table.Column<Tag>
                        title="操作"
                        render={(recode) => {
                            return (
                                <div className="space-x-4">
                                    <Button type="primary">编辑</Button>
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
        </div>
    );
}
export default Tags;
