import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeRemove,
  Unique,
  DeleteDateColumn,
  BeforeSoftRemove,
  AfterSoftRemove,
  AfterInsert,
} from 'typeorm';
import dayjs from 'dayjs';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ select: false })
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ type: 'bigint', nullable: false })
  created_at: number;

  @Column({ type: 'bigint', nullable: true })
  updated_at?: number;

  // @Column({ type: 'bigint', nullable: true })
  @DeleteDateColumn({ type: 'bigint', nullable: true })
  deleted_at?: number;

  @BeforeUpdate()
  public setUpdatedAt() {
    this.updated_at = dayjs().unix();
    console.log('准备更新数据----------', this);
  }

  @BeforeInsert()
  public setCreatedAt() {
    this.created_at = dayjs().unix();
    console.log('准备插入数据----------', this);
  }

  @AfterSoftRemove()
  @BeforeRemove()
  public setDeletedAt() {
    this.deleted_at = dayjs().unix();
    console.log('准备软删除了-----', this);
  }
}
