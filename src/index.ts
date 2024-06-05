import { drizzle } from 'drizzle-orm/node-postgres';
import db from './drizzle/db';

import {TIAddress,TSAddress} from "./drizzle/schema"



//get users
const getAddresses = async (): promise <TSAdress[] | null> => {
  return await db.query.adress.findMany();
};