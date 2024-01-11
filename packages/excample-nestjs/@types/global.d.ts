// TODO: 代码以模块的方式进行处理
export {};

declare global {
  type ExpandObject<T> = {
    [P in keyof T]: T[P] extends object ? Expand<T[P]> : T[P];
  };
  type Expand<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;
}
