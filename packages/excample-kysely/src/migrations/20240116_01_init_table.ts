import { Kysely, sql } from 'kysely';
import { Database } from 'src/@types/interface/sample';

export async function up(database: Kysely<Database>): Promise<void> {
  await database.schema
    .createTable('person')
    .addColumn('id', 'serial', (column) => column.primaryKey())
    .addColumn('first_name', 'text', (column) => column.notNull())
    .addColumn('last_name', 'text', (column) => column.notNull())
    .addColumn('gender', sql`enum('male','female','other')`)
    .addColumn('created_at', 'datetime', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .execute();
}

export async function down(database: Kysely<Database>): Promise<void> {
  await database.schema.dropTable('person').execute();
}
