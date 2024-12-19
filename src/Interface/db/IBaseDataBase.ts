import { z } from "zod";

export interface IBaseDataBase {
  id?: number;
  createAt?: Date;
  updateAt?: Date; 
}

export const zBaseDatabase = z.object({
  // id: z.string().refine(val => !isNaN(Number(val)), {
  //   message: "Expected a number for id",
  // }).transform(val => Number(val)).optional(),
  id: z
  .union([
    z.string().refine((val) => !isNaN(Number(val)), {
      message: "Expected a number for id",
    }).transform((val) => Number(val)),
    z.array(
      z.string().refine((val) => !isNaN(Number(val)), {
        message: "Expected a number for id",
      }).transform((val) => Number(val))
    ),
  ]).optional(),
  createAt: z.date().optional(),
  updateAt: z.date().optional(),
})