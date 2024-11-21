export interface IResponseBase<T> {
  message?: string;
  actionResult: boolean;
  data?: T;
}
