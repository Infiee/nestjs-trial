import { Injectable } from '@nestjs/common';
import { InjectKysely } from 'nestjs-kysely';
import { DB } from 'src/@types';
import { NewPerson, PersonUpdate } from 'src/@types/interface/sample';

@Injectable()
export class UserService {
  constructor(@InjectKysely() private readonly db: DB) {}

  async create(person: NewPerson) {
    const { insertId } = await this.db
      .insertInto('person')
      .values(person)
      .executeTakeFirst();
    if (insertId) {
      return this.findOne(Number(insertId));
    }
  }

  findAll() {
    return this.db.selectFrom('person').selectAll().execute();
  }

  findOne(id: number) {
    return (
      this.db
        .selectFrom('person')
        .where('id', '=', id)
        .selectAll()
        // .select(['first_name'])
        .executeTakeFirst()
    );
  }

  async update(id: number, updateWith: PersonUpdate) {
    await this.db
      .updateTable('person')
      .set(updateWith)
      .where('id', '=', id)
      .executeTakeFirst();
    return this.findOne(id);
  }

  async remove(id: number) {
    const person = await this.findOne(id);
    await this.db.deleteFrom('person').where('id', '=', id).executeTakeFirst();
    return person;
  }
}
