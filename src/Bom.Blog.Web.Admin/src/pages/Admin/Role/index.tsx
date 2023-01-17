import { IdentityRoleDto } from "@abp/ng.identity/proxy";
import { GetPermissionListResultDto, UpdatePermissionDto } from "@abp/ng.permission-management/proxy";
import { useAntdTable, useAsyncEffect } from "ahooks";
import { Button, Form, message, Modal, Space } from "antd";
import { useState } from "react";
import { produce } from 'immer';
import AdvancedSearchForm from "../../../components/AdvanceSearchForm";
import { useAppConfig, useStores } from "../../../hooks/useStore";
import Permission from "../../../components/Permission";
import styles from "./index.module.less";
import Input from "../../../components/Form/Input";
import { booleanRenderToString } from "../../../util/utilities";
import { getRequiredRule } from "../../../util/formValid";
import ConcurrencyStamp from "../../../components/Form/ConcurrencyStamp";
import Checkbox from "../../../components/Form/Checkbox";
import { ColumnsType } from "antd/es/table";
import Table from "../../../components/Table/Table";
type RoleState = {
  roleModalVisible: boolean
  roleModalTitle: string,
  permissionModalVisible: boolean
  roleName: string
  grantedPermissions: GetPermissionListResultDto
  permissions: Record<string, boolean>
}

function Role() {
  const [state, setState] = useState<RoleState>({
    roleModalVisible: false,
    roleModalTitle: "",
    permissionModalVisible: false,
    roleName: "",
    grantedPermissions: {} as GetPermissionListResultDto,
    permissions: {}
  })
  const tableColumns: ColumnsType<IdentityRoleDto> = [
    { title: '角色字', dataIndex: 'name', },
    { title: '默认', dataIndex: 'isDefault', render: booleanRenderToString },
    { title: '公开', dataIndex: 'isPublic', render: booleanRenderToString },
    {
      title: '操作', render: (record) => (
        <Space>
          {state.permissions["AbpIdentity.Roles.Update"] && <Button type="primary" onClick={() => editRole(record)}>编辑</Button>}
          {state.permissions["AbpIdentity.Roles.ManagePermissions"] && <Button type="primary" onClick={() => showPermissionModal(record.name)}>权限</Button>}
          {state.permissions["AbpIdentity.Roles.Delete"] && <Button type="primary" danger onClick={() => deleteRole(record)}>删除</Button>}
        </Space>
      )
    },
  ]
  const { useApplicationConfigurationStore } = useAppConfig();
  const { useRoleStore, usePermissionStore } = useStores();
  const getAppConfig = useApplicationConfigurationStore(state => state.Get)
  const [getRoles, getRoleById, deleteRoleService, updateRole, addRoleSvc] = useRoleStore(state => [state.getRoles, state.getRoleById, state.deleteRole, state.updateRole, state.addRole]);
  const [getPermissionByRole, updatePermissionsByRole] = usePermissionStore(state => [state.getPermissionByRole, state.updatePermissionsByRole]);
  const [searchForm] = Form.useForm();
  const [roleModalForm] = Form.useForm();
  const { tableProps, search } = useAntdTable(getRoles, { defaultPageSize: 10, form: searchForm, debounceWait: 500, });
  let changedPermession: UpdatePermissionDto[];
  useAsyncEffect(async () => {
    const config = await getAppConfig()
    setState(produce(draft => { draft.permissions = config.auth.grantedPolicies }))
  }, []);
  const deleteRole = (record: IdentityRoleDto) => {
    Modal.confirm({
      title: "删除", content: "确定删除吗？",
      onOk: async () => {
        const success = await deleteRoleService(record.id);
        if (success) {
          message.success("删除成功");
          search.submit();
        }
      },
      okText: "确定", cancelText: "取消",
    });
  };
  const showRoleModal = (roleModelTitle: string) => {
    setState(produce(draft => {
      draft.roleModalVisible = true
      draft.roleModalTitle = roleModelTitle
    }))
  };
  const addRole = () => {
    showRoleModal("添加")
  }
  const editRole = async (record: IdentityRoleDto) => {
    const role = await getRoleById(record.id);
    if (role) {
      roleModalForm.setFieldsValue(role);
      showRoleModal("编辑")
    }
  };
  const addOrUpdateRole = async (data: any) => {
    if (data.id) {
      const role = await updateRole(data.id, data);
      if (role)
        message.success("更新成功");
    } else {
      const role = await addRoleSvc(data);
      if (role)
        message.success("添加成功");
    }
    roleModalForm.resetFields();
    setState(produce(draft => { draft.roleModalVisible = false }))
    search.submit();
  };

  const showPermissionModal = async (name: string) => {
    const permission = await getPermissionByRole(name)
    setState(produce(draft => {
      draft.roleName = name
      draft.permissionModalVisible = true
      draft.grantedPermissions = permission
    }))
  }
  const onPermissionChange = (checkedValues: UpdatePermissionDto[]) => {
    console.log(checkedValues)
    changedPermession = checkedValues;
  }
  return (
    <div>
      <AdvancedSearchForm form={searchForm} {...search} extraActions={[state.permissions["AbpIdentity.Roles.Create"] ? { content: "添加", action: addRole } : null]}>
        <Input placeholder="请输入查找值" name="Filter" label="查找值" />
      </AdvancedSearchForm>
      <div className={styles.table}>
        <Table<IdentityRoleDto> columns={tableColumns} {...tableProps} />
      </div>
      <Modal open={state.roleModalVisible} title={state.roleModalTitle} okText="确定" cancelText="取消" onCancel={() => {
        setState(produce(draft => { draft.roleModalVisible = false }))
        roleModalForm.resetFields()
      }}
        onOk={() => {
          roleModalForm
            .validateFields()
            .then((values) => {
              addOrUpdateRole(values);
            })
            .catch((info) => {
              message.error("添加失败");
            });
        }}>
        <Form form={roleModalForm} name="form_in_modal" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} >
          <Input name="id" label="id" hidden />
          <Input name="name" label="角色名" rules={[getRequiredRule("角色名")]} placeholder={true} />
          <Checkbox name="isDefault" label="默认" />
          <Checkbox name="isPublic" label="公开" />
          <ConcurrencyStamp />
        </Form>
      </Modal>
      <Modal open={state.permissionModalVisible} title={`${state.grantedPermissions.entityDisplayName} - 权限`} okText="确定" cancelText="取消" onCancel={() => { setState(produce(draft => { draft.permissionModalVisible = false })) }}
        onOk={() => {
          updatePermissionsByRole(state.roleName, { permissions: changedPermession }).then(() => {
            setState(produce(draft => { draft.permissionModalVisible = false }))
          });
        }}
      >
        <Permission permissions={state.grantedPermissions} onPermissionChanged={onPermissionChange} />
      </Modal>
    </div>
  );
}
export default Role;
