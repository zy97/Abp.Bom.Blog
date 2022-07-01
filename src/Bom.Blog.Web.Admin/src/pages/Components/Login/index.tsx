import { Button, Dropdown, Menu, Space } from "antd";
import { useState } from "react";
import { DownOutlined, SmileOutlined } from '@ant-design/icons';

const menu = (
    <Menu
        items={[
            {
                key: '1',
                label: (
                    <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                        我的信息
                    </a>
                ),
            },
            {
                key: '1',
                label: (
                    <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                        退出登录
                    </a>
                ),
            },
        ]}
    />
);
function Login() {
    const [isLogin, setIsLogin] = useState(true)
    const login = () => {
        console.log('login')
    }
    return (
        <div>
            {isLogin ? <Dropdown overlay={menu}>
                <a onClick={e => e.preventDefault()}>
                    <Space>
                        Hover me
                        <DownOutlined />
                    </Space>
                </a>
            </Dropdown> : <Button type="link" onClick={login}>登录</Button>}

        </div>
    );
}

export default Login;