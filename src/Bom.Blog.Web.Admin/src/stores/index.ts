import React from "react";
import audit_logStore from "./AuditLog";
import userStore from "./Abp/User";
import permissionStore from "./Abp/Permission";
import accountStore from "./Abp/Account";
import roleStore from './Abp/Role';
import tenantStore from './Abp/tenants'
import settingStore from './Abp/setting'
export const storesContext = React.createContext({
  audit_logStore,
  userStore,
  permissionStore,
  roleStore,
  accountStore,
  tenantStore,
  settingStore
});
