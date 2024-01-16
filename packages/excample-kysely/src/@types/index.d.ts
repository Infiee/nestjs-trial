import { Database } from './interface/sample';
import { Kysely } from 'kysely';

export type DB = Kysely<Database>;

// TODO: 修复bigint错误
declare global {
  interface BigInt {
    toJSON(): string;
  }
}
