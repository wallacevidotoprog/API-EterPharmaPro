import { z } from 'zod';
import { IBaseDataBase, zBaseDatabase } from './IBaseDataBase';

export interface ICoordinates extends IBaseDataBase {
  lon: string;
  lat: string;
}
export const zCoordinates = zBaseDatabase.extend({
  lon: z.string().optional(),
  lat: z.string().optional(),
});
