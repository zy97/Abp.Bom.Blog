import { makeAutoObservable } from "mobx";
import { tenantsApi } from "../../apis";
import { TenantCreateDto, TenantUpdateDto } from "@abp/ng.tenant-management/proxy";
class TenantsStore {
  constructor() {
    makeAutoObservable(this);
  }
  getTenants = async (data: { current: number; pageSize: number }, form: any) => {
    try {
      const result = await tenantsApi.getTenants({ skipCount: data.pageSize * (data.current - 1), maxResultCount: data.pageSize, ...form, });
      return { total: result.data.totalCount ?? 0, list: result.data.items ?? [], };
    } catch (error) {
      return { total: 0, list: [] };
    }
  };
  async deleteTenant(id: string) {
    try {
      await tenantsApi.deleteTenant(id);
      return true;
    } catch (error) {
      return false;
    }
  }
  async addTenant(tenant: TenantCreateDto) {
    try {
      const data = await tenantsApi.addTenant(tenant);
      return data.data;
    } catch (error) {
      return;
    }
  }
  async getTenantById(id: string) {
    try {
      const tenant = await tenantsApi.getTenantById(id);
      return tenant.data;
    } catch (error) {
      return;
    }
  }
  async updateTenant(id: string, tenant: TenantUpdateDto) {
    try {
      const result = await tenantsApi.updateTenant(id, tenant);
      return result.data;
    } catch (error) {
      return;
    }
  }
}

export default new TenantsStore();
