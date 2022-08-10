import { Button, Dropdown, Menu, Space } from "antd";
import { useState } from "react";
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { useAuth } from "react-oidc-context";


function Login() {
    const auth = useAuth();
    const login = () => {
        console.log('login')
        auth.signinRedirect();

    }
    const logout = () => {
        console.log('logout')
        auth.removeUser();
        auth.revokeTokens();
        auth.clearStaleState();
    }
    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <a onClick={() => { console.log(auth.user) }}>我的信息</a>
                    ),
                },
                {
                    key: '2',
                    label: (
                        <a onClick={logout} >退出登录</a>
                    ),
                },
            ]}
        />
    );
    return (
        <div>
            {auth.isAuthenticated ? <Dropdown overlay={menu}>
                <a onClick={e => e.preventDefault()}>
                    <Space>
                        {
                            auth.user?.profile.preferred_username}
                        <DownOutlined />
                    </Space>
                </a>
            </Dropdown> : <Button type="link" onClick={login}>登录</Button>}

        </div>
    );
}

export default Login;