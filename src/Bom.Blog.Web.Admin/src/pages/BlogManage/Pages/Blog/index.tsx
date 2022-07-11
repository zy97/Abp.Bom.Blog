import { DatePicker, Form, Input, Select, Table } from "antd";
import { useEffect, useState } from "react";
import AdvancedSearchForm from "../../../../components/AdvanceSearchForm";
import useStores from "../../../../hooks/useStore";
const { Option } = Select;
function Blog() {
    const { blogStore } = useStores();
    const [data, setData] = useState([])
    useEffect(() => {
        blogStore.getPosts().then(res => {
            console.log(res)
            setData(res.data.items);
        });
    }, []);
    const dataSource = [
        {
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号',
        },
        {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
        },
    ];
    const columns = [
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '作者',
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: '目录',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: '创建事件',
            dataIndex: 'creationTime',
            key: 'creationTime',
        },
        {
            title: '标签',
            dataIndex: 'tags',
            key: 'tags',
        },
    ];
    return (
        <div>
            博客管理
            <AdvancedSearchForm >
                <Form.Item name="title" label="标题" >
                    <Input placeholder="请输入标题" />
                </Form.Item>
                <Form.Item name="author" label="作者" >
                    <Input placeholder="请输入作者" />
                </Form.Item>
                <Form.Item name="category" label="目录" >
                    <Select >
                        <Option value="1">1</Option>
                        <Option value="2">
                            longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglong
                        </Option>
                    </Select>
                </Form.Item>
                <Form.Item name="tag" label="标签" >
                    <Select >
                        <Option value="1">1</Option>
                        <Option value="2">
                            longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglong
                        </Option>
                    </Select>
                </Form.Item>
                <Form.Item name="createTime" label="创建时间">
                    <DatePicker className="w-full" placeholder="请选择时间" />
                </Form.Item>
            </AdvancedSearchForm>
            <div>
                <Table dataSource={data} columns={columns} />;
            </div>
        </div >
    );
}

export default Blog;