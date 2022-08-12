export interface PagedList<T> extends List<T> {
  totalCount: number;
}
export interface List<T> {
  items: T[];
}
