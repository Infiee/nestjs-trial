import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, wrap } from '@mikro-orm/core';
import { BasePaginationDto } from 'src/base/BasePagination.dto';
import { DictData } from './entities/dict-data.entity';
import { CreateDictDataDto } from './dto/create-dict-data.dto';
import { UpdateDictDataDto } from './dto/update-dict-data.dto';
import { DictTypeService } from '../dict-type/dict-type.service';

@Injectable()
export class DictDataService {
  constructor(
    @InjectRepository(DictData)
    private readonly repository: EntityRepository<DictData>,
    private readonly dictTypeService: DictTypeService,
  ) {}

  async create(createDto: CreateDictDataDto) {
    try {
      await this.dictTypeService.findOne({
        id: +createDto.dictType,
      });
    } catch (error) {
      throw new HttpException('字典类型不存在', HttpStatus.BAD_REQUEST);
    }
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

  findOne(id: number) {
    return this.repository.findOneOrFail(id);
  }

  async update(id: number, updateDto: UpdateDictDataDto) {
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
