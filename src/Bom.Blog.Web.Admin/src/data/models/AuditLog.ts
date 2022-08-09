import BaseEntity from "./BaseEntity";
export type AuditLogBaseDto = BaseEntity<string>;

export interface AuditLogDto extends AuditLogBaseDto {
  userName: string;
  executionTime: string;
  executionDuration: number;
  clientIpAddress: string;
  browserInfo: string;
  url: string;
}
