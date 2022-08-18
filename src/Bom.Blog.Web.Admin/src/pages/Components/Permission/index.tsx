import { Checkbox, Divider, Form, Row, Tabs } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { useEffect, useState } from "react";
import { PermissionGroup, UpdatePermissionListItemDto } from "../../../data/models/system/Permission";

type PermissionProp = {
    permissionGroup: PermissionGroup,
    onPermissionChanged: (checkedValues: UpdatePermissionListItemDto[]) => void,
}

function Permission(props: PermissionProp) {

    const [permissionModalForm] = Form.useForm();
    const { permissionGroup, onPermissionChanged } = props;
    const [allCheckStatus, setAllCheckStatus] = useState<{ [key: string]: boolean }>({});
    const [initPermission, setInitPermission] = useState<{ [key: string]: boolean }>({});
    const init = (permissionGroup: PermissionGroup) => {
        const staus: { [key: string]: boolean } = {};
        permissionGroup.groups.forEach(g => {
            g.permissions.forEach(p => { staus[p.name] = p.isGranted; });
            if (g.permissions.every(p => p.isGranted === true)) {
                staus[g.name] = true;
            }
            else {
                staus[g.name] = false;
            }
        });
        staus.allCheck = true;
        for (const k in staus) {
            if (staus[k] === false) {
                staus.allCheck = false;
            }
        }
        setAllCheckStatus(staus);
        const temp = { ...staus };
        delete temp.allCheck;

        permissionGroup.groups.forEach(g => {
            delete temp[g.name];
        });
        setInitPermission(temp);
    };
    useEffect(() => {
        init(permissionGroup);
    }, [permissionGroup])


    const checkedCount = (groupName: string) => {
        let count = 0;
        for (const key in allCheckStatus) {
            if (key.startsWith(groupName) && key !== groupName) {
                if (allCheckStatus[key] === true) {
                    count += 1;
                }
            }
        }
        return count;
    }
    const onPermissionChange = (e: CheckboxChangeEvent) => {
        const name = e.target.name!;
        const value = e.target.checked;
        if (name === "allCheck") {
            //勾选全部点击
            if (value === true) {
                for (const key in allCheckStatus) {
                    allCheckStatus[key] = true;
                }
                allCheckStatus[name] = value;
            }
            else {
                for (const key in allCheckStatus) {
                    allCheckStatus[key] = false;
                }
                allCheckStatus[name] = value;
            }
        }
        else {
            if (permissionGroup.groups.findIndex(g => g.name === name) !== -1) {
                //是组点击
                if (value === true) {
                    for (const key in allCheckStatus) {
                        if (key.startsWith(name)) {
                            allCheckStatus[key] = true;
                        }
                    }
                    allCheckStatus[name] = value;
                }
                else {
                    for (const key in allCheckStatus) {
                        if (key.startsWith(name)) {
                            allCheckStatus[key] = false;
                        }
                    }
                    allCheckStatus[name] = value;
                }
            }
            else {
                //不是组点击
                if (value === true) {
                    allCheckStatus[name] = value;
                    if (name.split('.').length === 3) {
                        allCheckStatus[name.substring(0, name.lastIndexOf('.'))] = value;
                    }
                }
                else {
                    allCheckStatus[name] = value;
                    if (name.split('.').length === 2) {
                        for (const key in allCheckStatus) {
                            if (key.startsWith(name)) {
                                allCheckStatus[key] = value;
                            }
                        }
                    }
                }
            }
        }
        let array = Array<{ key: string, value: boolean }>();
        for (const key in allCheckStatus) {
            array.push({ key: key, value: allCheckStatus[key] });
        }
        if (name.split('.').length > 1) {
            const groupName = name.substring(0, name.indexOf('.'));
            const group1 = array.filter(i => i.key.startsWith(groupName));
            const group2 = group1.filter(i => i.key !== groupName);
            if (group2.every(i => i.value === true)) {
                allCheckStatus[groupName] = true;
            }
            else {
                allCheckStatus[groupName] = false;
            }
        }
        array = Array<{ key: string, value: boolean }>();
        for (const key in allCheckStatus) {
            array.push({ key: key, value: allCheckStatus[key] });
        }
        const group = array.filter(i => permissionGroup.groups.map(i => i.name).includes(i.key));
        if (group.every(i => i.value === true)) {
            allCheckStatus["allCheck"] = true;
        }
        else {
            allCheckStatus["allCheck"] = false;
        }
        setAllCheckStatus({ ...allCheckStatus });

        const temp = { ...allCheckStatus };
        delete temp.allCheck;
        permissionGroup.groups.forEach(g => {
            delete temp[g.name];
        });
        const change: UpdatePermissionListItemDto[] = [];
        for (const key in initPermission) {
            if (initPermission[key] !== temp[key]) {
                change.push({ name: key, isGranted: temp[key] });
            }
        }
        onPermissionChanged(change);
    };

    return (
        <>
            <Checkbox onChange={onPermissionChange} name="allCheck" checked={allCheckStatus.allCheck}>授予所有权限</Checkbox>
            <Divider />
            <Form form={permissionModalForm} name="form_in_modal" labelCol={{ span: 7 }} wrapperCol={{ span: 17 }} >
                <Tabs defaultActiveKey="1" tabPosition="left">
                    {permissionGroup.groups && permissionGroup.groups.map(g => {
                        return <Tabs.TabPane tab={`${g.displayName}(${checkedCount(g.name)}/${g.permissions.length})`} key={g.name}>
                            {g.displayName}
                            <Divider />
                            <Checkbox name={g.name} checked={allCheckStatus[g.name]} onChange={onPermissionChange}>全选</Checkbox>
                            <Divider />
                            {g.permissions.map(p => {
                                return <Row key={p.name}>{p.parentName !== null ? <span>&nbsp;&nbsp;&nbsp;&nbsp;</span> : ""}<Checkbox name={p.name} onChange={onPermissionChange} checked={allCheckStatus[p.name]}>{p.displayName}</Checkbox></Row>
                            })}

                        </Tabs.TabPane>
                    })}
                </Tabs>
            </Form>
        </>
    );
}

export default Permission;