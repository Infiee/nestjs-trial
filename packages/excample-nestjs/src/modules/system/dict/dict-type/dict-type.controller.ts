import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { DictTypeService } from './dict-type.service';
import { CreateDictTypeDto } from './dto/create-dict-type.dto';
import { UpdateDictTypeDto } from './dto/update-dict-type.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DictType } from './entities/dict-type.entity';
import { BasePaginationDto } from 'src/base/BasePagination.dto';

@ApiTags('字典管理')
@Controller('dict/type')
export class DictTypeController {
  constructor(private readonly service: DictTypeService) {}

  @ApiOperation({ summary: '创建字典Type' })
  @ApiResponse({ type: DictType })
  @Post()
  create(@Body() createDto: CreateDictTypeDto) {
    return this.service.create(createDto);
  }

  @ApiOperation({ summary: '查找字典Type' })
  @ApiResponse({ type: DictType })
  @Get()
  findAll(@Query() query: BasePaginationDto) {
    return this.service.findAll(query);
  }

  @ApiOperation({ summary: '查找某一个字典Type' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne({ id: +id });
  }

  @ApiOperation({ summary: '查找某一个字典Type' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateDictTypeDto) {
    return this.service.update(+id, updateDto);
  }

  @ApiOperation({ summary: '删除某一个字典Type' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
