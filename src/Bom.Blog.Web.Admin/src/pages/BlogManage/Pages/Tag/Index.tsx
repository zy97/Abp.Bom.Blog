import { useAntdTable } from "ahooks";
import { Form, Input, Select, Table } from "antd";
import AdvancedSearchForm from "../../../../components/AdvanceSearchForm";
import * as TagModel from "../../../../data/models/Tag";
import useStores from "../../../../hooks/useStore";
function Tag() {
    const { tagStore } = useStores();
    const [form] = Form.useForm();
    const { tableProps, search } = useAntdTable(tagStore.getTags, { defaultPageSize: 5, form, debounceWait: 500 });
    return (
        <div>
            <AdvancedSearchForm form={form} {...search}>
                <Form.Item name="tagName" label="标签名" >
                    <Input placeholder="请输入标签名" />
                </Form.Item>
                <Form.Item name="displayName" label="展示名" >
                    <Input placeholder="请输入展示名" />
                </Form.Item>
            </AdvancedSearchForm>
            <div>
                <Table<TagModel> rowKey="Id"  {...tableProps} >
                    <Table.Column<TagModel> title="Id" dataIndex="id" key="id" />
                    <Table.Column<TagModel> title="标签名" dataIndex="tagName" key="tagName" />
                    <Table.Column<TagModel> title="展示名" dataIndex="displayName" key="displayName" />
                </Table>
            </div>
        </div >
    );
}
export default Tag;