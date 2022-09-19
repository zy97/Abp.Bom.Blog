import { Button, Dropdown, Menu, Space } from "antd";
import { DownOutlined } from '@ant-design/icons';
import { useAuth } from "react-oidc-context";
import { accountApi } from "../../../apis";
import { useDebounceEffect } from "ahooks";
import { useAppConfig } from "../../../hooks/useStore";


function Login() {
    const auth = useAuth();
    const { applicationConfigurationStore } = useAppConfig();
    useDebounceEffect(() => {
        if (!auth.isAuthenticated) {
            // auth.signinRedirect();
        }
        else {
            applicationConfigurationStore.Get().then(config => {
                console.log(config);
            }).catch(console.log);
        }
        // console.log("登录状态", auth.isAuthenticated);
        // console.log("user", auth.user);
    }, [auth.isAuthenticated], { wait: 500 })
    const login = () => {
        auth.signinRedirect();
    }
    const logout = () => {
        accountApi.logout().then(() => {
            auth.removeUser();
        }).catch(err => { console.log(err) });
    }
    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: <a onClick={() => { console.log(auth.user) }}>我的信息</a>
                },
                {
                    key: '2',
                    label: <a onClick={logout} >退出登录</a>
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