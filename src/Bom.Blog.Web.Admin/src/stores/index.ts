import React from "react";
import blogStore from "./post";
import tagStore from "./tag";
import categoryStore from "./category";
import friendLinkStore from "./friendLink";
import postStore from "./post";
import audit_logStore from "./AuditLog";
import userStore from "./User";
import permissionStore from "./Permission";
import accountStore from "./Account";
import roleStore from './Role';
import tenantStore from './Abp/tenants'

export const storesContext = React.createContext({
  blogStore,
  tagStore,
  categoryStore,
  friendLinkStore,
  postStore,
  audit_logStore,
  userStore,
  permissionStore,
  roleStore,
  accountStore,
  tenantStore,
});
