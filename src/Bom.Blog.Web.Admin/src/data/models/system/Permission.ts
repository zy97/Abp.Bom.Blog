export interface PermissionGroup {
  entityDisplayName: string;
  groups: Group[];
}

interface Group {
  name: string;
  displayName: string;
  permissions: Permission[];
}

interface Permission {
  name: string;
  displayName: string;
  parentName?: (null | string)[];
  isGranted: boolean;
  allowedProviders: any[];
  grantedProviders: any[];
}
export interface UpdatePermissionListItemDto {
  name: string;
  isGranted: boolean;
}
export interface UpdatePermissionListDto {
  permissions: UpdatePermissionListItemDto[];
}
