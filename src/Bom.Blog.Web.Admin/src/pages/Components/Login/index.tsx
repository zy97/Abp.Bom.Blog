import { Button, Dropdown, Menu, Space } from "antd";
import { useEffect } from "react";
import { DownOutlined } from '@ant-design/icons';
import { useAuth } from "react-oidc-context";
import axios from "axios";
import { accountApi } from "../../../apis";


function Login() {
    const auth = useAuth();
    useEffect(() => {
        return auth.events.addUserSignedIn(() => {
            console.log('login success')
        });
    }, [auth.events, auth.signinSilent])
    useEffect(() => {
        if (auth.isAuthenticated) {
            axios.get('/api/abp/application-configuration').then(res => { console.log(res); });
        }
    }, [auth.isAuthenticated])

    const login = () => {
        console.log('login')

        auth.signinRedirect();
    }
    const logout = () => {
        console.log('logout')
        auth.removeUser();
        // auth.revokeTokens();
        // auth.clearStaleState();
        accountApi.logout();
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