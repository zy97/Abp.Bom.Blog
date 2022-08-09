import axios from "axios";
import PagedList from "../data/models/PagedList";
import PageRequest from "../data/models/PageRequest";
import { AuditLogDto } from "../data/models/AuditLog";

// 获取列表
export const getAuditLogs = (params: PageRequest) =>
  axios.get<PagedList<AuditLogDto>>(`/api/app/audit-log`, { params });

// 获取指定项
export const getAuditLogById = (id: string) =>
  axios.get<AuditLogDto>(`/api/app/audit-log/${id}`, {});
