import { Kysely, sql } from 'kysely';
import { Database } from 'src/@types/interface/sample';

export async function up(database: Kysely<Database>): Promise<void> {
  await database.schema
    .alterTable('person')
    .addColumn('update_at', 'datetime', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .execute();
}

export async function down(database: Kysely<Database>): Promise<void> {
  await database.schema.dropTable('person').execute();
}
