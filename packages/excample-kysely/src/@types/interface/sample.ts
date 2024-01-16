import {
  ColumnType,
  Generated,
  Insertable,
  // JSONColumnType,
  Selectable,
  Updateable,
} from 'kysely';

interface PersonTable {
  id: Generated<number>;
  first_name: string;
  last_name: string;
  gender: 'male' | 'female' | 'other';
  created_at: ColumnType<Date>;

  // metadata: JSONColumnType<{
  //   login_at: string;
  //   ip: string | null;
  //   agent: string | null;
  //   plan: 'free' | 'premium';
  // }>;
}
export type Person = Selectable<PersonTable>;
export type NewPerson = Insertable<PersonTable>;
export type PersonUpdate = Updateable<PersonTable>;

interface PetTable {
  id: Generated<number>;
  name: string;
  owner_id: number;
  species: 'dog' | 'cat';
}
export type Pet = Selectable<PetTable>;
export type NewPet = Insertable<PetTable>;
export type PetUpdate = Updateable<PetTable>;

export interface Database {
  person: PersonTable;
  pet: PetTable;
}
