import { EntityRepository, FindOneOptions, wrap } from '@mikro-orm/core';
import { BasePaginationDto } from 'src/base/BasePagination.dto';
import { BaseEntity } from './BaseEntity';

export class BaseApiService<T extends BaseEntity> {
  constructor(private readonly repository: EntityRepository<T>) {}

  async create(createDto: T): Promise<T> {
    const data = await this.repository.create(createDto);
    await this.repository.getEntityManager().flush();
    return data;
  }

  async findAll(
    query: BasePaginationDto,
  ): Promise<{ items: T[]; total: number }> {
    const [items, total] = await this.repository.findAndCount(
      {},
      { limit: +query.limit, offset: +query.offset },
    );
    return {
      items,
      total,
    };
  }

  findOne(options: FindOneOptions<T>): Promise<T> {
    return this.repository.findOne(options as T);
  }

  findById(id: number): Promise<T> {
    return this.repository.findOne({ id } as T);
  }

  async update(id: number, updateDto: Partial<T>) {
    const data = await this.findById(id);
    const updateUser = wrap(data).assign(updateDto as any);
    await this.repository.getEntityManager().flush();
    return updateUser;
  }

  async remove(id: number) {
    const data = await this.findById(id);
    await this.repository.getEntityManager().remove(data).flush();
    return data;
  }

  async batchRemove(ids: number[]) {
    console.log('ids---', ids);
    const data = await this.repository.find({
      id: { $in: ids },
    } as any);
    this.repository.getEntityManager().remove(data);
    await this.repository.getEntityManager().flush();
    return data;
  }
}
