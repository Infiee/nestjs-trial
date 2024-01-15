import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, wrap } from '@mikro-orm/core';
import { BasePaginationDto } from 'src/base/BasePagination.dto';
import { DictType } from './entities/dict-type.entity';
import { CreateDictTypeDto } from './dto/create-dict-type.dto';
import { UpdateDictTypeDto } from './dto/update-dict-type.dto';

@Injectable()
export class DictTypeService {
  constructor(
    @InjectRepository(DictType)
    private readonly repository: EntityRepository<DictType>,
  ) {}

  async create(createDto: CreateDictTypeDto) {
    const data = await this.repository.create(createDto);
    await this.repository.getEntityManager().flush();
    return data;
  }

  async findAll(query: BasePaginationDto) {
    const [items, total] = await this.repository.findAndCount(
      {},
      { limit: +query.limit, offset: +query.offset },
    );
    return {
      items,
      total,
    };
  }

  findOne(options: Partial<DictType>) {
    return this.repository.findOneOrFail(options);
  }

  async update(id: number, updateDto: UpdateDictTypeDto) {
    const data = await this.repository.findOneOrFail(id);
    const updateUser = wrap(data).assign(updateDto);
    await this.repository.getEntityManager().flush();
    return updateUser;
  }

  async remove(id: number) {
    const data = await this.repository.findOneOrFail(id);
    await this.repository.getEntityManager().remove(data).flush();
    return data;
  }

  async batchRemove(ids: number[]) {
    console.log('ids---', ids);
    const users = await this.repository.find({
      id: { $in: ids },
    });
    this.repository.getEntityManager().remove(users);
    await this.repository.getEntityManager().flush();
    return users;
  }
}
