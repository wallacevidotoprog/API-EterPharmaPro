import "express";

declare module "express" {
  export interface Request {
    auth?: any;
  }
}

export function omitFields<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const newObj = { ...obj };
  keys.forEach((key) => {
    delete newObj[key];
  });
  return newObj;
}

export function getBrasiliaTime(): string {
  const currentDate = new Date();
  const utcDate = new Date(currentDate.getTime() - currentDate.getTimezoneOffset() * 60000);
  return utcDate.toISOString();
}
