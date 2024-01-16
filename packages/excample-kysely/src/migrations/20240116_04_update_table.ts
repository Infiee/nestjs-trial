import { Kysely } from 'kysely';
import { Database } from 'src/@types/interface/sample';

export async function up(database: Kysely<Database>): Promise<void> {
  await database.schema
    .alterTable('person')
    .renameColumn('first_name_change', 'first_name')
    .addColumn('age', 'text', (col) => col.notNull())
    .execute();
}

export async function down(database: Kysely<Database>): Promise<void> {
  await database.schema.dropTable('person').execute();
}
