import { ApiPropertyOptional } from '@nestjs/swagger';

export class BasePaginationDto {
  @ApiPropertyOptional()
  limit: string = '10';

  @ApiPropertyOptional()
  offset: string = '0';
}
