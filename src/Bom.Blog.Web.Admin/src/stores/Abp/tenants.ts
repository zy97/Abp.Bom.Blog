import { makeAutoObservable } from "mobx";
import { featureApi, tenantsApi } from "../../apis";
import { TenantCreateDto, TenantUpdateDto } from "@abp/ng.tenant-management/proxy";
import { UpdateFeaturesDto } from "@abp/ng.feature-management/proxy";
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
  async getTenantFeatures(id: string) {
    try {
      const result = await featureApi.getFeatures({ providerName: "T", providerKey: id });
      return result.data;
    } catch (error) {
      return;
    }
  }
  async updateTenantFeatures(id: string, features: UpdateFeaturesDto) {
    try {
      const result = await featureApi.updateFeatures({ providerName: "T", providerKey: id }, features);
      return result.data;
    } catch (error) {
      return;
    }
  }
  async getHostFeatures() {
    try {
      const result = await featureApi.getFeatures({ providerName: "T" });
      return result.data;
    } catch (error) {
      return;
    }
  }
  async updateHostFeatures(features: UpdateFeaturesDto) {
    try {
      const result = await featureApi.updateFeatures({ providerName: "T" }, features);
      return result.data;
    } catch (error) {
      return;
    }
  }
}

export default new TenantsStore();
