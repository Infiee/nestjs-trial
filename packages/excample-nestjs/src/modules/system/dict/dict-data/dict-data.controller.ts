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
import { DictDataService } from './dict-data.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DictData } from './entities/dict-data.entity';
import { CreateDictDataDto } from './dto/create-dict-data.dto';
import { BasePaginationDto } from 'src/base/BasePagination.dto';
import { UpdateDictDataDto } from './dto/update-dict-data.dto';

@ApiTags('字典管理')
@Controller('dict/data')
export class DictDataController {
  constructor(private readonly servive: DictDataService) {}

  @ApiOperation({ summary: '创建字典数据' })
  @ApiResponse({ type: DictData })
  @Post()
  create(@Body() createDto: CreateDictDataDto) {
    return this.servive.create(createDto);
  }

  @ApiOperation({ summary: '查找字典数据' })
  @ApiResponse({ type: DictData, isArray: true })
  @Get()
  findAll(@Query() query: BasePaginationDto) {
    return this.servive.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servive.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateDictDataDto) {
    return this.servive.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servive.remove(+id);
  }
}
