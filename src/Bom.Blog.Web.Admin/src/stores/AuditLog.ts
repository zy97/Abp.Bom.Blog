import { makeAutoObservable } from "mobx";
import { audit_logApi } from "../apis";
import { } from "../data/models/AuditLog";
class AuditLogStore {
  constructor() {
    makeAutoObservable(this);
  }
  getAuditLogs = async (data: any, form: any) => {
    try {
      const result = await audit_logApi.getAuditLogs({
        skipCount: data.pageSize * (data.current - 1),
        maxResultCount: data.pageSize,
        ...form,
      });
      return {
        total: result.data.totalCount ?? 0,
        list: result.data.items ?? [],
      };
    } catch (error) {
      return { total: 0, list: [] };
    }
  };
  async getAuditLogById(id: string) {
    try {
      const audit_log = await audit_logApi.getAuditLogById(id);
      return audit_log.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new AuditLogStore();
