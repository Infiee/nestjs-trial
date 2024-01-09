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
import { Exclude } from 'class-transformer';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import bcrypt from 'bcrypt';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  username: string;

  @ApiHideProperty()
  @Exclude()
  @Column({ select: false })
  password: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Column({ nullable: true })
  phone?: string;

  @ApiProperty()
  @Column({ type: 'bigint', nullable: false })
  created_at: number;

  @ApiProperty()
  @Column({ type: 'bigint', nullable: true })
  updated_at?: number;

  @ApiProperty()
  // @Column({ type: 'bigint', nullable: true })
  @DeleteDateColumn({ type: 'bigint', nullable: true })
  deleted_at?: number;

  @BeforeUpdate()
  public setUpdatedAt() {
    this.updated_at = dayjs().unix();
    console.log('准备更新数据----------', this);
  }

  @BeforeInsert()
  public async setCreatedAt() {
    this.created_at = dayjs().unix();

    // 密码加密
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    console.log('准备插入数据----------', this);
  }

  @AfterSoftRemove()
  @BeforeRemove()
  public setDeletedAt() {
    this.deleted_at = dayjs().unix();
    console.log('准备软删除了-----', this);
  }
}
