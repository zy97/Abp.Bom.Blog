import React from "react";
import { useAccountStore } from "./Abp/Account";
import { useApplicationConfigurationStore } from "./Abp/ApplicationConfiguration";
import { useEmailSettingStore } from "./Abp/EmailSetting";
import { usePermissionStore } from "./Abp/Permission";
import { useRoleStore } from "./Abp/Role";
import { useSettingStore } from "./Abp/Setting";
import { useTenantsStore } from "./Abp/Tenants";
import { useUserStore } from "./Abp/User";
import { useAuditLogStore } from './AuditLog'
export const storesContext = React.createContext({
  useAuditLogStore,
  useAccountStore,
  usePermissionStore,
  useRoleStore,
  useSettingStore,
  useTenantsStore,
  useUserStore,
  useEmailSettingStore
});
export const abpApplicationConfigurationContext = React.createContext({
  useApplicationConfigurationStore,
});
